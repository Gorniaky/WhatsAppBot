import { PathLike, readdirSync } from "node:fs";
import { join } from "node:path";

const ext = __filename.split(".").pop()!;
const regexp = RegExp(`(?=index\\.js$)|(\\.${ext}$)`);

export class BaseHandler<T = any> {
  data = new Map<string, T>();
  found: PathLike[] = [];

  constructor(public path: string) {
    this.path = this.#normalizePathlike(path);
    this.#read();
  }

  #normalizePathlike(path = this.path) {
    return path.replace(/\\/g, "/").replace(/\/$/, "");
  }

  #read(path = this.path) {
    const readed = readdirSync(path, { withFileTypes: true });

    for (const fileOrDir of readed) {
      if (fileOrDir.isDirectory()) {
        this.#read(join(path, fileOrDir.name));
      } else if (fileOrDir.isFile()) {
        if (regexp.test(fileOrDir.name))
          this.found.push(join(path, fileOrDir.name));
      }
    }

    return this;
  }

  async load(files = this.found) {
    for (const file of files) {
      const importedFile = await import(`${file}`);

      let data;
      try {
        data = new (importedFile.default || importedFile)();
      } catch {
        data = importedFile.default || importedFile;
      }

      this.data.set(data.data.name, data);
    }

    return this;
  }
}

export default BaseHandler;
