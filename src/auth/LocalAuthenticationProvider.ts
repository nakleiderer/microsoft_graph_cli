import * as path from "https://deno.land/std@0.79.0/path/mod.ts";
import { getFreePort } from "https://deno.land/x/free_port@v1.2.0/mod.ts";
import { Application, Router } from "https://deno.land/x/oak@v6.3.0/mod.ts";
import { OAuth2Client } from "https://deno.land/x/oauth2_client@v0.2.0/mod.ts";
import { open } from "https://deno.land/x/opener@v1.0.1/mod.ts";
import { ITokenPersistenceStrategy } from "./persistence/ITokenPersistenceStrategy.ts";
import { Token } from "./Token.ts";

interface LocalAuthenticationProviderOptions {
  oauth2Client: OAuth2Client;
  persistanceProvider: ITokenPersistenceStrategy;
}

export class LocalAuthenticationProvider {
  #tokenPersistence: ITokenPersistenceStrategy;
  #oauth2Client: OAuth2Client;

  constructor(options: LocalAuthenticationProviderOptions) {
    this.#oauth2Client = options.oauth2Client;
    this.#tokenPersistence = options.persistanceProvider;
  }

  async getAccessToken() {
    let token = await this.#tokenPersistence.load();
    if (!token.isValid) {
      await this.retrieveAccessTokenSilently();
    }

    token = await this.#tokenPersistence.load();
    if (!token.isValid) {
      await this.retrieveAccessTokenInteractively();
    }

    token = await this.#tokenPersistence.load();
    return token.accessToken;
  }

  private async retrieveAccessTokenSilently() {
    const token = await this.#tokenPersistence.load();
    if (!token.refreshToken) return;

    const oauthToken = await this.#oauth2Client.refreshToken.refresh(
      token.refreshToken,
      {
        requestOptions: {
          body: { client_id: this.#oauth2Client.config.clientId },
        },
      },
    );

    await this.#tokenPersistence.save(Token.newFromOauthToken(oauthToken));
  }

  private async retrieveAccessTokenInteractively() {
    const app = new Application();
    const router = new Router();

    const controller = new AbortController();
    const { signal } = controller;

    router.get("/login", (ctx) => {
      ctx.response.redirect(this.#oauth2Client.code.getAuthorizationUri());
    });

    router.get("/oauth2/callback", async (ctx, next) => {
      const oauthToken = await this.#oauth2Client.code.getToken(
        ctx.request.url,
        { requestOptions: {} },
      );
      await this.#tokenPersistence.save(Token.newFromOauthToken(oauthToken));
      const token = await this.#tokenPersistence.load();
      if (!token.isValid) return ctx.response.redirect("/failed");
      ctx.response.redirect("/success");
    });

    router.get("/success", async (ctx, next) => {
      ctx.response.type = "html";
      const successFilePath = path.join(
        path.dirname(path.fromFileUrl(import.meta.url)),
        "www",
        "success.html",
      );
      ctx.response.body = await Deno.readTextFile(successFilePath);
      controller.abort();
    });

    router.get("/failed", async (ctx, next) => {
      ctx.response.type = "html";
      const failedFilePath = path.join(
        path.dirname(path.fromFileUrl(import.meta.url)),
        "www",
        "failed.html",
      );
      ctx.response.body = await Deno.readTextFile(failedFilePath);
    });

    app.addEventListener("listen", async ({ hostname, port, secure }) => {
      const host = `${secure ? "https://" : "http://"}${hostname ??
        "localhost"}:${port}`;

      const redirectUri = `${host}/oauth2/callback`;
      this.#oauth2Client = new OAuth2Client(
        { ...this.#oauth2Client.config, redirectUri },
      );

      const loginUrl = `${host}/login`;
      console.log(`Login to Microsoft using your browser: ${loginUrl}`);
      try {
        await open(loginUrl);
      } catch {
        // No need to catch any error here, this feature is a nice-to-have
      }
    });

    app.use(router.allowedMethods(), router.routes());
    const port = await getFreePort(8000);
    await app.listen({ port, signal });
  }
}
