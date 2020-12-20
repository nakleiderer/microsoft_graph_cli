import { ensureFile } from "https://deno.land/std@0.79.0/fs/ensure_file.ts";
import { Table } from "https://deno.land/x/cliffy@v0.15.0/table/table.ts";
import { Command, csv, ITypeInfo } from "../../../deps.ts";
import {
  ChatsRepo,
  ChatType,
  chatTypes,
  ConversationMember,
  userProperties,
  UserProperty,
} from "../../repositories/main.ts";
import { ValidationError } from "../../errors/ValidationError.ts";
import {
  microsoftGraphAuthenticationProvider,
  microsoftGraphClient,
} from "../context.ts";

const chatsRepo = new ChatsRepo(
  microsoftGraphClient,
);

interface HandleCreateChatOptions {
  members: string[];
  chatType: ChatType;
  topic?: string;
  format: Format;
  out?: string;
}

async function handleCreateChat(opts: HandleCreateChatOptions) {
  await microsoftGraphAuthenticationProvider.ensureLoggedIn();

  const members = opts.members.map((m) => ({
    id: m,
    roles: [
      "owner",
    ],
  }));

  const chat = opts.chatType === "group"
    ? await chatsRepo.create(
      { chatType: opts.chatType, members, topic: opts.topic },
    )
    : await chatsRepo.create(
      {
        chatType: opts.chatType,
        members: members as [ConversationMember, ConversationMember],
      },
    );

  const safeChat = [chat ?? {}];

  let result: string;
  switch (opts.format) {
    case "csv":
      result = await csv.stringify(
        safeChat as Record<string, unknown>[],
        Object.keys(safeChat[0]),
      );
      break;
    case "json":
      result = JSON.stringify(safeChat);
      break;
    case "table":
      result = new Table()
        .header(Object.keys(safeChat[0]))
        .body(safeChat.map((u) => Object.values(u)))
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

const lowerCaseUserProperties = userProperties.map((v: UserProperty) =>
  v.toLocaleLowerCase()
);

function userPropertyType({ value }: ITypeInfo) {
  const lowerCaseValue = value.toLocaleLowerCase();
  const idx = lowerCaseUserProperties.findIndex((v: string) =>
    v === lowerCaseValue
  );
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

function chatType({ value }: ITypeInfo) {
  const isValid = chatTypes.includes(value as ChatType);

  if (!isValid) {
    throw new ValidationError(`"${value}" is not a valid chat type`);
  }

  return value;
}

export const createChat = new Command()
  .description("Create a new chat object.")
  .type("format", formatType)
  .complete("format", () => Array.from(formats))
  .type("chatType", chatType)
  .complete("chatType", () => Array.from(chatTypes))
  .option(
    "-m --members <members:string[]>",
    "The ids of the members to include in the chat",
    { required: true, collect: true },
  )
  .option(
    "-c --chat-type <chatType:chatType:chatType>",
    "The format to output the users",
    { default: chatTypes[1] },
  )
  .option(
    "-t --topic <topic:string>",
    "The topic of the chat",
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
  .action(handleCreateChat);
