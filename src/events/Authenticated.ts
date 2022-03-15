import { ClientSession, Events } from 'whatsapp-web.js';
import { Client, Event } from '../structures';

export default class Authenticated extends Event {
  constructor(client: Client) {
    super(client, {
      name: Events.AUTHENTICATED,
    });
  }

  async execute(session: ClientSession) {
    console.log('Logged in.');
  }
}