import "whatsapp-web.js";

declare module "whatsapp-web.js" {
  interface Message {
    args: string[]
    commandName?: string
  }
}
