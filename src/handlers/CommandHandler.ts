import { Command } from "../structures";
import BaseHandler from "./BaseHandler";

export class CommandHandler extends BaseHandler<Command> {
  constructor(path: string) {
    super(path);
    this.load();
  }

  async load(files = this.found) {
    for (const file of files) {
      const importedFile = await import(`${file}`);

      let data: Command;
      try {
        data = new (importedFile.default || importedFile)();
      } catch {
        data = importedFile.default || importedFile;
      }

      if (!data.data || !data.execute) continue;

      this.data.set(data.data.name, data);
      data.data.aliases?.forEach(alias => this.data.set(alias, data));
    }

    console.log("Loaded " + this.data.size + " commands.");

    return this;
  }
}

export default CommandHandler;
