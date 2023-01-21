import { Events } from "whatsapp-web.js";
import { client } from "../client";

client.on(Events.AUTHENTICATION_FAILURE, (message) => {
  console.log({ message });
});
