import { Message } from 'whatsapp-web.js';
import Client from './Client';

export default class Command {
  client!: Client;
  data!: CommandData;

  constructor(client: Client, data: CommandData) {
    if (!this.regexCommandName(data.name)) {
      console.error(`Command ${data.name} cannot be loaded.`);

      return;
    }

    this.data = data;

    Object.defineProperties(this, { client: { value: client } });
  }

  regexCommandName(name: string) {
    return /^[\w-]{1,32}$/.test(name);
  }

  async execute(message: Message) { }
}

export interface CommandData {
  aliases?: string[]
  description: string
  name: string
  private?: boolean
}