import { Command, User } from "../../../deps.ts";
import {
  microsoftGraphAuthTokenPersistanceProvider,
  microsoftGraphClient,
} from "../context.ts";

interface Options {
  printAccess?: true;
  printRefresh?: true;
}

async function handleLogin(options: Options) {
  const me: User = await microsoftGraphClient.api("/me").get(null);
  console.log(`Signed in as ${me.displayName} (${me.userPrincipalName})`);

  const token = await microsoftGraphAuthTokenPersistanceProvider.load();

  if (options.printAccess) {
    console.log(`Access Token: ${token.accessToken}`);
  }

  if (options.printRefresh) {
    console.log(`Refresh Token: ${token.refreshToken}`);
  }
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
