import { join } from "node:path";
import { CommandHandler } from "../handlers";

const commandHandler = new CommandHandler(join(__dirname));

export default commandHandler;
