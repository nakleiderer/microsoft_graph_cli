import { Command } from "../../../deps.ts";
import { createChat } from "./createChat.ts";
import { sendMessage } from "./sendMessage.ts";

export const chats = new Command()
  .description(
    "A chat is a collection of chatMessages between one or more participants. Participants can be users or apps.",
  )
  .command("create", createChat)
  .command("send", sendMessage);
