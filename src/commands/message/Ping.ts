import { Message } from 'whatsapp-web.js';
import { Client, Command } from '../../structures';

export default class Ping extends Command {
  constructor(client: Client) {
    super(client, {
      name: 'ping',
      description: 'Replies with Pong!',
      aliases: ['p']
    });
  }

  async execute(message: Message) {
    await message.reply('Pong!');
  }
}