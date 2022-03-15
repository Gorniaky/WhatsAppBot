import qrcode from 'qrcode-terminal';
import { Events } from 'whatsapp-web.js';
import { Client, Event } from '../structures';

export default class Qr extends Event {
  constructor(client: Client) {
    super(client, {
      name: Events.QR_RECEIVED,
    });
  }

  async execute(qr: string) {
    this.generate(qr);
  }

  generate(qr: string): void {
    try {
      return qrcode.generate(qr, { small: true });
    } catch (error) {
      console.error(error);

      return this.generate(qr);
    }
  }
}