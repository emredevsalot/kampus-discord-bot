import { Client, Collection } from "discord.js";

declare module "discord.js" {
  interface Client {
    // We attached a "commands" property to the client instance
    // so that we can access commands in other files.
    commands: Collection<string, any>;
    buttons: Collection<string, any>;
  }
}
