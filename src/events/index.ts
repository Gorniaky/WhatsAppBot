import { GlobSync } from 'glob';
import { join } from 'path';
import { Client, Event } from '../structures';

export default class Events {
  client!: Client;
  eventFiles!: string[];

  constructor(client: Client) {
    Object.defineProperties(this, { client: { value: client } });

    this.eventFiles = this.getEventFiles();
  }

  getEventFiles(): string[] {
    return new GlobSync(join(__dirname, '*.@(j|t)s'), { ignore: ['**/index.@(j|t)s'] }).found;
  }

  async loadEvents(client = this.client) {
    for (let i = 0; i < this.eventFiles.length; i++) {
      const eventFile = await import(this.eventFiles[i]);

      const event = new (eventFile.default || eventFile)(client) as Event;

      client[event.data.listener || 'on'](event.data.name, (...args: any[]) => event.execute(...args, client));
    }

    return client;
  }

  static async loadEvents(client: Client) {
    return await new Events(client).loadEvents();
  }
}