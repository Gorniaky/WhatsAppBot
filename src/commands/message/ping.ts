import { Message } from "whatsapp-web.js";
import { Command } from "../../structures";

export default class Ping extends Command {
  constructor() {
    super({
      name: "ping",
      description: "Replies with Pong!",
      aliases: ["p"],
    });
  }

  async execute(message: Message) {
    return message.reply("Pong!");
  }
}
