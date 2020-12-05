import { Token } from "../Token.ts";

export interface ITokenPersistenceStrategy {
  load: () => Promise<Token>;
  save: (token: Token) => Promise<void>;
}
