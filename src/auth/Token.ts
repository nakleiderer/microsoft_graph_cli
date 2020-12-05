import { Tokens as Oauth2Token } from "https://deno.land/x/oauth2_client@v0.2.0/src/types.ts";

interface PartialToken {
  accessToken?: string;
  tokenType?: string;
  refreshToken?: string;
  expiresAt?: Date;
  scope?: string[];
}

interface NewFromOauthOptions {
  issuedAt?: Date;
  defaultExpiresIn?: number;
}

export class Token {
  accessToken?: string;
  tokenType?: string;
  refreshToken?: string;
  expiresAt?: Date;
  scope?: string[];

  constructor(token?: PartialToken) {
    if (token) {
      this.accessToken = token.accessToken;
      this.tokenType = token.tokenType;
      this.refreshToken = token.refreshToken;
      this.expiresAt = token.expiresAt;
      this.scope = token.scope;
    }
  }

  get isValid(): boolean {
    const expiresAt = this.expiresAt ?? new Date();
    return !!this.accessToken && expiresAt >= new Date();
  }

  static newFromOauthToken(
    oauthToken: Oauth2Token,
    options: NewFromOauthOptions = {},
  ) {
    const issuedAt = options.issuedAt ?? new Date();
    const expiresIn = oauthToken.expiresIn ?? options.defaultExpiresIn ?? 3600;
    const expiresAt = new Date(issuedAt.getTime());
    expiresAt.setSeconds(issuedAt.getSeconds() + expiresIn);

    return new Token({
      accessToken: oauthToken.accessToken,
      tokenType: oauthToken.tokenType,
      refreshToken: oauthToken.refreshToken,
      expiresAt,
      scope: oauthToken.scope,
    });
  }
}
