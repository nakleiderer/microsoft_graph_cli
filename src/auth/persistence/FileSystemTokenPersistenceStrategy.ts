import { ensureFile } from "../../../deps.ts";
import { Token } from "../Token.ts";
import { ITokenPersistenceStrategy } from "./ITokenPersistenceStrategy.ts";

interface FileSystemPersistenceStrategyOptions {
  path?: string;
}

export class FileSystemPersistenceStrategy
  implements ITokenPersistenceStrategy {
  tokenFilePath = "token.json";
  #token: Token = new Token();

  constructor(options: FileSystemPersistenceStrategyOptions = {}) {
    this.tokenFilePath = options.path ?? this.tokenFilePath;
  }

  async load() {
    if (this.#token.isValid) return this.#token;

    await ensureFile(this.tokenFilePath);
    const tokenFile = await Deno.readTextFile(this.tokenFilePath);
    const tokenObj = JSON.parse(tokenFile || "{}");
    return new Token({
      accessToken: tokenObj.accessToken,
      tokenType: tokenObj.tokenType,
      refreshToken: tokenObj.refreshToken,
      expiresAt: tokenObj.expiresAt,
      scope: tokenObj.scope,
    });
  }

  async save(token: Token) {
    this.#token = token;
    await ensureFile(this.tokenFilePath);
    return Deno.writeTextFile(
      this.tokenFilePath,
      JSON.stringify({
        accessToken: token.accessToken,
        tokenType: token.tokenType,
        refreshToken: token.refreshToken,
        expiresAt: token.expiresAt,
        scope: token.scope,
      }),
    );
  }
}
