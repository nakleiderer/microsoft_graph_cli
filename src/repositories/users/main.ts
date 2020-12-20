import { User } from "https://raw.githubusercontent.com/microsoftgraph/msgraph-typescript-typings/1.27.0/microsoft-graph.d.ts";
import { Client, PageIterator } from "../../../deps.ts";
import { omit } from "../../utils/omit.ts";
import { userProperties } from "./userProperties.ts";
import { UserProperty } from "./UserProperty.ts";

export { userProperties };
export type { UserProperty };

interface ListUsersSearch {
  displayNames?: string[];
}

interface ListUsersOptions {
  search?: ListUsersSearch;
  select?: UserProperty[];
  top?: number;
}

export class UsersRepo {
  #client: Client;

  constructor(client: Client) {
    this.#client = client;
  }

  async listUsers(opts: ListUsersOptions = {}) {
    let req = this.#client.api("/users").version("v1.0");

    if (opts.search?.displayNames?.length) {
      const search = opts
        .search
        .displayNames
        .map((n) => `"displayName:${n}"`)
        .join(" OR ");

      req = req
        .search(search)
        .header(
          "ConsistencyLevel",
          "eventual",
        );
    }

    if (opts.select?.length) {
      req = req
        .select(opts.select);
    }

    if (opts.top && opts.top !== Infinity) {
      req = req.top(opts.top);
    }

    const result = await req.get(null);
    const users: User[] = [];

    const callback = (data: User) => {
      users.push(data);
      return (opts.top ?? Infinity) >= (users.length + 1);
    };
    const pageIterator = new PageIterator(this.#client, result, callback, null);
    await pageIterator.iterate();

    return users.map((u) =>
      omit("@odata.id", u as Record<string, unknown>)
    ) as User[];
  }
}
