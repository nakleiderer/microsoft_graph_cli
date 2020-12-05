import {
  cacheDir,
  Client,
  MicrosoftGraph,
  OAuth2Client,
  path,
} from "./deps.ts";
import {
  FileSystemPersistenceStrategy,
  LocalAuthenticationProvider,
} from "./mod.ts";

if (import.meta.main) {
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
}
