import { Command, ITypeInfo } from "../../../deps.ts";
import { ValidationError } from "../../errors/ValidationError.ts";
import {
  userProperties,
  UserProperty,
  UsersRepo,
} from "../../repositories/main.ts";
import {
  formattableCommand,
  handleFormatting,
} from "../../utils/formatableCommand.ts";
import {
  handleOutput,
  outputableCommand,
} from "../../utils/outputableCommand.ts";
import {
  microsoftGraphAuthenticationProvider,
  microsoftGraphClient,
} from "../context.ts";

const usersRepo = new UsersRepo(
  microsoftGraphClient,
);

interface HandleListUsersOptions {
  names?: string[];
  select?: UserProperty[];
  top?: number;
}

async function handleListUsers(opts: HandleListUsersOptions) {
  await microsoftGraphAuthenticationProvider.ensureLoggedIn();

  const users = await usersRepo.listUsers(
    {
      search: { displayNames: opts.names },
      select: opts.select,
      top: opts.top ?? 5,
    },
  );

  return users as Record<string, unknown>[];
}

const lowerCaseUserProperties = userProperties.map((v) =>
  v.toLocaleLowerCase()
);

function userPropertyType({ value }: ITypeInfo) {
  const lowerCaseValue = value.toLocaleLowerCase();
  const idx = lowerCaseUserProperties.findIndex((v) => v === lowerCaseValue);
  const isNotValid = idx === -1;

  if (isNotValid) {
    throw new ValidationError(`"${value}" is not a valid user property`);
  }

  return userProperties[idx];
}

export const listUsers = outputableCommand(formattableCommand(
  new Command()
    .description("Retrieve a list of users")
    .type("userProperty", userPropertyType)
    .complete("userProperty", () => Array.from(userProperties))
    .option(
      "-n, --names <names:string[]>",
      "Search for users with any of the specified names.",
      { collect: true },
    )
    .option(
      "-s, --select <select:userProperty[]:userProperty>",
      "The properties of the user to return.",
      { collect: true },
    )
    .option(
      "-t, --top <top:number>",
      "The maximum number of results to return. Default is 5. Set to 'Infinity' to return all users.",
    )
    .action(handleOutput(handleFormatting(handleListUsers))),
));
