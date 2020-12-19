import { Command } from "../../../deps.ts";
import { microsoftGraphAuthTokenPersistanceProvider } from "../context.ts";

async function handleLogout() {
  await Deno.remove(microsoftGraphAuthTokenPersistanceProvider.tokenFilePath);
}

export const logout = new Command()
  .description("Log out of the Microsoft Graph")
  .action(handleLogout);
