import qrcode from "qrcode-terminal";
import { Events } from "whatsapp-web.js";
import { client } from "../client";

client.on(Events.QR_RECEIVED, (qr) => {
  qrcode.generate(qr, { small: true });
});
