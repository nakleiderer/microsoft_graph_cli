import { Command, CompletionsCommand } from "./deps.ts";
import { login } from "./src/cli/commands/login.ts";
import { logout } from "./src/cli/commands/logout.ts";
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
    .parse(Deno.args);
}
