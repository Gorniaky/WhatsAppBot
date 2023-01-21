import { Events } from "whatsapp-web.js";
import { client } from "../client";

client.on(Events.AUTHENTICATED, (session) => {
  console.log({ session });
});
