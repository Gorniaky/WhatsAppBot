import { Events, Message } from 'whatsapp-web.js';
import { Client, Event } from '../structures';

export default class MessageCreate extends Event {
  constructor(client: Client) {
    super(client, {
      name: Events.MESSAGE_CREATE,
    });
  }

  async execute(message: Message & { [x: string]: any }) {
    const { body } = message;

    const matched = body.match(RegExp('^(?:\\/)([\\w\\W]+)$'));

    if (!matched) return;

    message.args = matched[1].trim().split(/\s+/g);

    const commandName = message.commandName = message.args.shift()?.toLowerCase();

    const command = this.client.commands?.get(commandName);

    if (!command || command.data.private) return;

    try {
      await command.execute(message);
    } catch (error) {
      console.error(error);
    }
  }
}