import { Message, MessageMedia } from "whatsapp-web.js";
import { Command } from "../../structures";
import { openai } from "../../util";

export default class ChatGPT extends Command {
  constructor() {
    super({
      name: "gpt",
      description: "Use ChatGPT.",
      aliases: ["ai", "img"],
    });
  }

  async execute(message: Message) {
    switch (message.commandName) {
      case "img": {
        const response = await this.getDalleResponse(message.args.join(" "));

        if (typeof response === "string")
          return message.reply(response);

        return message.reply(new MessageMedia("image/png", `${response.b64_json}`));
      }
      case "gpt":
      case "ai":
      default:
        return message.reply(`${await this.getDavinciResponse(message.args.join(" "))}`);
    }
  }

  async getDavinciResponse(prompt: string) {
    try {
      const response = await openai.createCompletion({
        max_tokens: 4000,
        model: "text-davinci-003",
        prompt,
        temperature: 1,
      });

      let botResponse = "";
      for (const choice of response.data.choices) {
        botResponse += choice.text;
      }

      return "Chat GPT 🤖:\n" + botResponse;
    } catch (error: any) {
      return `❌ OpenAI Response Error: ${error.response.data.error.message}`;
    }
  }

  async getDalleResponse(prompt: string) {
    try {
      const response = await openai.createImage({
        n: 1,
        prompt,
        size: "1024x1024",
        response_format: "b64_json",
      });

      return response.data.data[0];
    } catch (error: any) {
      return `❌ OpenAI Response Error: ${error.response.data.error.message}`;
    }
  }
}
