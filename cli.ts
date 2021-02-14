import { Command, CompletionsCommand } from "./deps.ts";
import { chats } from "./src/cli/chats/main.ts";
import { login } from "./src/cli/login.ts";
import { logout } from "./src/cli/logout.ts";
import { users } from "./src/cli/users/main.ts";
import { version } from "./version.ts";

if (import.meta.main) {
  await new Command()
    .name("mgraph")
    .version(version)
    .description(
      "An unofficial command line utility for accessing the Microsoft Graph",
    )
    .command("completions", new CompletionsCommand())
    .command("login", login)
    .command("logout", logout)
    .command("users", users)
    .command("chats", chats)
    .parse(Deno.args);
}
