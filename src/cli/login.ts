import {
  cacheDir,
  Client,
  Command,
  OAuth2Client,
  path,
  User,
} from "../../deps.ts";
import {
  FileSystemPersistenceStrategy,
  LocalAuthenticationProvider,
} from "../../mod.ts";

interface Options {
  printAccess?: true;
  printRefresh?: true;
}

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

async function handleLogin(options: Options) {
  const me: User = await client.api("/me").get(null);
  console.log(`Signed in as ${me.displayName} (${me.userPrincipalName})`);

  const token = await persistanceProvider.load();

  if (options.printAccess) {
    console.log(`Access Token: ${token.accessToken}`);
  }

  if (options.printRefresh) {
    console.log(`Refresh Token: ${token.refreshToken}`);
  }
}

async function handleLogout() {
  await Deno.remove(persistanceProvider.tokenFilePath);
}

export const login = new Command()
  .description("Log in to the Microsoft Graph")
  .option(
    "--print-access [printAccess:boolean]",
    "Print the current Access Token, useful for manually making requests via cURL or Postman.",
  )
  .option(
    "--print-refresh [printRefresh:boolean]",
    "Print the current Refresh Token, useful for configuring headless installations.",
  )
  .action(handleLogin);

export const logout = new Command()
  .description("Log out of the Microsoft Graph")
  .action(handleLogout);
