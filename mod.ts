import { Client } from "https://cdn.skypack.dev/@microsoft/microsoft-graph-client";
import * as path from "https://deno.land/std@0.79.0/path/mod.ts";
import cacheDir from "https://deno.land/x/cache_dir/mod.ts";
import { OAuth2Client } from "https://deno.land/x/oauth2_client@v0.2.0/src/oauth2_client.ts";
import * as MicrosoftGraph from "https://raw.githubusercontent.com/microsoftgraph/msgraph-typescript-typings/master/microsoft-graph.d.ts";
import { LocalAuthenticationProvider } from "./src/auth/LocalAuthenticationProvider.ts";
import { FileSystemPersistenceStrategy } from "./src/auth/persistence/FileSystemTokenPersistenceStrategy.ts";

const oauth2Client = new OAuth2Client({
  clientId: "b67efab6-c389-41fc-a595-dc882a936046",
  authorizationEndpointUri:
    "https://login.microsoftonline.com/common/oauth2/v2.0/authorize",
  tokenUri: "https://login.microsoftonline.com/common/oauth2/v2.0/token",
  defaults: {
    scope: ["offline_access", "user.read"].join(" "),
  },
});

const persistanceProvider = new FileSystemPersistenceStrategy(
  {
    path: path.join(
      cacheDir() ?? "",
      "com.kleiderer.microsoft-graph-cli",
      "token.json",
    ),
  },
);

const client = Client.initWithMiddleware(
  {
    authProvider: new LocalAuthenticationProvider({
      oauth2Client,
      persistanceProvider,
    }),
  },
);

const me: MicrosoftGraph.User = await client.api("/me").get(null);
console.log(`Signed in as ${me.displayName} (${me.userPrincipalName})`);
