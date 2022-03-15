import { GlobSync } from 'glob';
import { join } from 'path';
import { Client, Command } from '../structures';

export default class Commands {
  client!: Client;

  constructor(client: Client) {
    Object.defineProperties(this, { client: { value: client } });
  }

  async loadCommands(client = this.client, commands = new Map<string, Command>()) {
    const { found } = new GlobSync(join(__dirname, '*', '*.@(j|t)s'), { ignore: ['**/index.@(j|t)s'] });

    for (let i = 0; i < found.length; i++) {
      const commandFile = await import(found[i]);

      const command = new (commandFile.default || commandFile)(client) as Command;

      if (!command.data || !command.execute) continue;

      commands.set(command.data.name, command);

      command.data.aliases?.forEach(alias => commands.set(alias, command));
    }

    return commands;
  }
}