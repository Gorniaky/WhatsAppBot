import { Message } from "whatsapp-web.js";
import { CommandData } from "../@types";

export abstract class Command {
  data!: CommandData;

  constructor(data: CommandData) {
    if (!this.#regexCommandName(data.name)) {
      console.error(`Command ${data.name} cannot be loaded.`);

      return;
    }

    this.data = data;
  }

  #regexCommandName(name: string) {
    return /^[-_\p{L}\p{N}\p{sc=Deva}\p{sc=Thai}]{1,32}$/iu.test(name);
  }

  abstract execute(message: Message): Promise<any>
}

export default Command;
