import { Events } from "whatsapp-web.js";
import { client } from "../client";

client.on(Events.READY, async () => {
  console.log("Ready!");
});
