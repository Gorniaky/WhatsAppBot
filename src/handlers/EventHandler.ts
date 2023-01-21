import BaseHandler from "./BaseHandler";

export class EventHandler extends BaseHandler<never> {
  constructor(path: string) {
    super(path);
    this.load();
  }

  async load(files = this.found) {
    for (const file of files) {
      await import(`${file}`);
    }

    return this;
  }
}

export default EventHandler;
