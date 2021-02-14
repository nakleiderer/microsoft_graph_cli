import { Chat, ChatMessage, Client } from "../../../deps.ts";

export const chatTypes = ["group", "oneOnOne"] as const;
export type ChatType = typeof chatTypes[number];

export interface ConversationMember {
  roles: string[];
  id: string;
}

interface ChatCreateOptionsGroup {
  chatType: typeof chatTypes[0];
  topic?: string;
  members: ConversationMember[];
}

interface ChatCreateOptionsOneOnOne {
  chatType: typeof chatTypes[1];
  members: [ConversationMember, ConversationMember];
}

type ChatCreateOptions = ChatCreateOptionsGroup | ChatCreateOptionsOneOnOne;

interface SendMessageOptions {
  id: string;
  message: ChatMessage;
}

export class ChatsRepo {
  #client: Client;

  constructor(client: Client) {
    this.#client = client;
  }

  async create(opts: ChatCreateOptions) {
    const { id } = await this.#client.api("/me").get(null);
    opts.members.unshift({ id, roles: ["owner"] });

    const memberCount = opts.chatType === "group" ? undefined : 2;
    const members = opts.members.slice(0, memberCount).map(({ id, roles }) => ({
      "@odata.type": "#microsoft.graph.aadUserConversationMember",
      roles,
      "user@odata.bind": `https://graph.microsoft.com/beta/users('${id}')`,
    }));

    const result: Chat = await this.#client.api("/chats").version("beta").post(
      { ...opts, members },
      null,
    );

    return result;
  }

  async sendMessage(opts: SendMessageOptions) {
    const result: ChatMessage = await this.#client.api(
      `/chats/${opts.id}/messages`,
    ).version("beta").post(
      opts.message,
      null,
    );
    return result;
  }
}
