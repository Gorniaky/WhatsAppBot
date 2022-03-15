import { Events } from 'whatsapp-web.js';
import Client from './Client';

export default class Event {
  client!: Client;

  constructor(client: Client, public data: EventData) {
    if (!data.listener) data.listener = 'on';

    Object.defineProperties(this, { client: { value: client } });
  }

  public async execute(...args: any[]) {
    throw new Error('Method not implemented.');
  }
}

export interface EventData {
  name: Events
  listener?: ListenerString
}

export type ListenerString = 'on' | 'once'
