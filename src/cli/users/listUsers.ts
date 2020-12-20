import { ensureFile } from "https://deno.land/std@0.79.0/fs/ensure_file.ts";
import { Table } from "https://deno.land/x/cliffy@v0.15.0/table/table.ts";
import { Command, csv, ITypeInfo } from "../../../deps.ts";
import { ValidationError } from "../../errors/ValidationError.ts";
import {
  userProperties,
  UserProperty,
  UsersRepo,
} from "../../repositories/main.ts";
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
  format: Format;
  out?: string;
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

  const safeFirstUser = users?.[0] ?? {};

  let result: string;
  switch (opts.format) {
    case "csv":
      result = await csv.stringify(
        users as Record<string, unknown>[],
        Object.keys(safeFirstUser),
      );
      break;
    case "json":
      result = JSON.stringify(users);
      break;
    case "table":
      result = new Table()
        .header(Object.keys(safeFirstUser))
        .body(users.map((u) => Object.values(u)))
        .border(true)
        .toString();
      break;
  }

  if (opts.out) {
    await ensureFile(opts.out);
    return Deno.writeTextFile(
      opts.out,
      result,
    );
  } else {
    Deno.stdout.writeSync(new TextEncoder().encode(result + "\n"));
  }
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

const formats = ["json", "csv", "table"] as const;
type Format = typeof formats[number];

function formatType({ value }: ITypeInfo) {
  const isValid = formats.includes(value as Format);

  if (!isValid) {
    throw new ValidationError(`"${value}" is not a valid format`);
  }

  return value;
}

export const listUsers = new Command()
  .description("Retrieve a list of users")
  .type("userProperty", userPropertyType)
  .complete("userProperty", () => Array.from(userProperties))
  .type("format", formatType)
  .complete("format", () => Array.from(formats))
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
  .option(
    "-f --format <format:format:format>",
    "The format to output the users",
    { default: "table" },
  )
  .option(
    "-o --out <out:string>",
    "The location to save the result",
  )
  .action(handleListUsers);
