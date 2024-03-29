import { Events } from "whatsapp-web.js";
import { client } from "../client";
import commandHandler from "../commands";
import { Command } from "../structures";

client.on(Events.MESSAGE_CREATE, async (message) => {
  const matched = message.body.match(/^(?:\/)([\w\W]+)$/);
  if (!matched) return;

  message.args = matched[1].trim().split(/\s+/g);
  const commandName = message.commandName = message.args.shift()?.toLowerCase();
  if (!commandName) return;

  const command = commandHandler.data.message.get(commandName) as Command;
  if (!command || command.data.private) return;

  try {
    await command.execute(message);
  } catch (error) {
    console.error(error);
  }
});
