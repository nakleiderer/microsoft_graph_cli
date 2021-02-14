import { Command } from "../../../deps.ts";
import { listUsers } from "./listUsers.ts";

export const users = new Command()
  .description("Represents an Azure AD user account")
  .command("list", listUsers);
