import { Command } from "../../../deps.ts";
import { ChatsRepo } from "../../repositories/main.ts";
import { microsoftGraphClient } from "../context.ts";

const chatsRepo = new ChatsRepo(
  microsoftGraphClient,
);

async function handleSendMessage(
  _opt: Record<string, unknown>,
  id: string,
  message: string,
) {
  const result = await chatsRepo.sendMessage(
    { id, message: { body: { content: message } } },
  );
  console.dir(result);
}

export const sendMessage = new Command()
  .description("send a message to a chat")
  .arguments("<id:string> <message:string>")
  .action(handleSendMessage);
