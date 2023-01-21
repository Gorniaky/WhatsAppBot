import BaseHandler from "./BaseHandler";

export class EventHandler extends BaseHandler {
  constructor(path: string) {
    super(path);
    this.read();
    this.load();
  }

  protected async load(files = this.found) {
    for (let i = 0; i < files.length; i++) {
      const file = files[i];

      try {
        await import(`${file}`);
      } catch {
        console.error("Error on loading event:", `${file}`.split(/\\|\//g).at(-1));
        files.splice(i, 1);
        i--;
      }
    }

    console.log("Loaded", files.length, "events.");

    return this;
  }
}

export default EventHandler;
