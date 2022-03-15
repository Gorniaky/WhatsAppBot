import { Events } from 'whatsapp-web.js';
import { Client, Event } from '../structures';

export default class Ready extends Event {
  constructor(client: Client) {
    super(client, {
      name: Events.READY,
      listener: 'once'
    });
  }

  async execute() {
    console.log('Ready!');
  }
}