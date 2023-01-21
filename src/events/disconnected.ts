import { Events } from "whatsapp-web.js";
import { client } from "../client";

client.on(Events.DISCONNECTED, (reason) => {
  console.log({ reason });
});
