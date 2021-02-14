import { cacheDir, Client, OAuth2Client, path } from "../../deps.ts";
import {
  FileSystemPersistenceStrategy,
  LocalAuthenticationProvider,
} from "../../mod.ts";

const oauth2Client = new OAuth2Client({
  clientId: "b67efab6-c389-41fc-a595-dc882a936046",
  authorizationEndpointUri:
    "https://login.microsoftonline.com/common/oauth2/v2.0/authorize",
  tokenUri: "https://login.microsoftonline.com/common/oauth2/v2.0/token",
  defaults: {
    scope: [
      "offline_access",
      "user.read",
      "Chat.ReadWrite",
      "User.ReadBasic.All",
    ].join(" "),
  },
});

export const microsoftGraphAuthTokenPersistanceProvider =
  new FileSystemPersistenceStrategy(
    {
      path: path.join(
        cacheDir() ?? "",
        "com.kleiderer.microsoft_graph_cli",
        "token.json",
      ),
    },
  );

export const microsoftGraphAuthenticationProvider =
  new LocalAuthenticationProvider({
    oauth2Client,
    persistanceProvider: microsoftGraphAuthTokenPersistanceProvider,
  });

export const microsoftGraphClient = Client.initWithMiddleware(
  {
    authProvider: microsoftGraphAuthenticationProvider,
  },
);
