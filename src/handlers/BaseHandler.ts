import { PathLike, readdirSync } from "node:fs";
import { join } from "node:path";

const ext = __filename.split(".").pop()!;
const regexp = RegExp(`(?=index\\.js$)|(\\.${ext}$)`);

export class BaseHandler {
  found: PathLike[] = [];

  constructor(public path: string) {
    this.path = this.#normalizePathlike(path);
  }

  #normalizePathlike(path = this.path) {
    return path.replace(/\\/g, "/").replace(/\/$/, "");
  }

  protected read(path = this.path) {
    const readed = readdirSync(path, { withFileTypes: true });

    for (const fileOrDir of readed) {
      if (fileOrDir.isDirectory()) {
        this.read(join(path, fileOrDir.name));
      } else if (fileOrDir.isFile()) {
        if (regexp.test(fileOrDir.name))
          this.found.push(join(path, fileOrDir.name));
      }
    }

    return this;
  }
}

export default BaseHandler;
