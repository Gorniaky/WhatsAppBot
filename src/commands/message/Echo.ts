import { Message } from 'whatsapp-web.js';
import { Client, Command } from '../../structures';

export default class Echo extends Command {
  constructor(client: Client) {
    super(client, {
      name: 'echo',
      description: 'Echo',
      aliases: ['e'],
      private: true
    });
  }

  async execute(message: Message & { args: string[] }) {
    const { args } = message;

    await message.reply(args.join(' '));
  }
}