import { generate } from "qrcode-terminal";
import WAWebJS, { Client, Message } from "whatsapp-web.js";

const client = new WAWebJS.Client({ authStrategy: new WAWebJS.LocalAuth() });

client.on('qr', (qr) => {
  generate(qr, { small: true });
});

client.on('ready', () => console.log('Ready!'));

client.on('authenticated', (session) => console.log('Authenticated'));

client.on('auth_failure', (message) => console.log('Auth failure:', message));

client.on('message_create', (message: Message) => {
  message.client // types does not exist
});

