import WAWebJS, { ClientOptions, LocalAuth } from 'whatsapp-web.js';
import Commands from '../commands';
import Events from '../events';
import Command from './Command';

export default class Client extends WAWebJS.Client {
  commands!: Map<string, Command>;

  constructor(options: ClientOptions) {
    super(options);
  }

  async initialize() {
    this.commands = await new Commands(this).loadCommands();

    await new Events(this).loadEvents();

    await super.initialize();
  }

  static async initialize() {
    const client = new Client({ authStrategy: new LocalAuth() });

    return await client.initialize();
  }
}