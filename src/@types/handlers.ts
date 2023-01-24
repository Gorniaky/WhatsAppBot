import { CommandTypes } from ".";
import { Command } from "../structures";

export type CommandHandlerData = Record<
  | CommandTypes.message, Map<string, Command>
>