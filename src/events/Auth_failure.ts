import { Events } from 'whatsapp-web.js';
import { Client, Event } from '../structures';

export default class AuthFailure extends Event {
  constructor(client: Client) {
    super(client, {
      name: Events.AUTHENTICATION_FAILURE,
    });
  }

  async execute(message: string) {
    console.log(message);
  }
}