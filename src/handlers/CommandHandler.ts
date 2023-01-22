import { readdirSync } from "node:fs";
import { join } from "node:path";
import { Commandtypes } from "../@types";
import { Command } from "../structures";
import BaseHandler from "./BaseHandler";

const ext = __filename.split(".").pop()!;
const regexp = RegExp(`(?=index\\.js$)|(\\.${ext}$)`);

export class CommandHandler extends BaseHandler {
  data = <Record<`${Commandtypes}`, Map<string, any>>>{};

  constructor(path: string) {
    super(path);
    this.read();
    this.load();
  }

  protected read(path = this.path) {
    const readed = readdirSync(path, { withFileTypes: true });

    for (const fileOrDir of readed) {
      if (fileOrDir.isDirectory()) {
        this.data[<`${Commandtypes}`>fileOrDir.name] = new Map();
        this.read(join(path, fileOrDir.name));
      } else if (fileOrDir.isFile()) {
        if (regexp.test(fileOrDir.name))
          this.found.push(join(path, fileOrDir.name));
      }
    }

    return this;
  }

  protected async load(files = this.found) {
    for (let i = 0; i < files.length; i++) {
      const file = files[i];

      let importedFile;
      try {
        importedFile = await import(`${file}`);
      } catch {
        console.error("Error on loading command:", `${file}`.split(/\\|\//g).at(-1));
        files.splice(i, 1);
        i--;
        continue;
      }

      let data: Command;
      try {
        data = new (importedFile.default || importedFile)();
      } catch {
        data = importedFile.default || importedFile;
      }

      if (!data.data || !data.execute) continue;

      const filePath = <`${Commandtypes}`>`${file}`.split(/\\|\//g).at(-2);

      this.data[filePath].set(data.data.name, data);
      data.data.aliases?.forEach(alias => this.data[filePath].set(alias, data));
    }

    console.log("Loaded", files.length, "commands.");

    return this;
  }
}

export default CommandHandler;
