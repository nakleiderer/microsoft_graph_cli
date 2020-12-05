import { Token } from "../Token.ts";
import { ITokenPersistenceStrategy } from "./ITokenPersistenceStrategy.ts";

export class InMemoryTokenPersistenceStrategy
  implements ITokenPersistenceStrategy {
  #token?: Token;

  load() {
    return Promise.resolve(this.#token ?? new Token());
  }

  save(token: Token) {
    this.#token = token;
    return Promise.resolve();
  }
}
