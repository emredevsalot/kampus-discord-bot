const fs = require("node:fs");
const path = require("node:path");
// Require the necessary discord.js classes
import { Client, Collection, GatewayIntentBits } from "discord.js";

// Create an instance of Client
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.GuildMessageReactions,
    GatewayIntentBits.MessageContent,
  ],
});

client.commands = new Collection();
client.buttons = new Collection();
client.selectMenus = new Collection();
client.modals = new Collection();

// Dynamically retrieve command files
// TODO: We can move this part to a file called "commandsHandler.ts" with the deployment from "deploy-commands.ts"
// But for quick testing purposes, let's keep it this way for now. We can run "deploy-commands.ts" whenever needed.
const foldersPath = path.join(__dirname, "commands");
const commandFolders = fs.readdirSync(foldersPath);

for (const folder of commandFolders) {
  const commandsPath = path.join(foldersPath, folder);
  const commandFiles = fs
    .readdirSync(commandsPath)
    .filter((file: string) => file.endsWith(".ts"));
  for (const file of commandFiles) {
    const filePath = path.join(commandsPath, file);
    const command = await import(filePath);
    // Set a new item in the Collection with the key as the command name and the value as the exported module
    if ("data" in command.default && "execute" in command.default) {
      client.commands.set(command.default.data.name, command.default);
    } else {
      console.log(
        `[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`
      );
    }
  }
}

// Handlers
const handlersPath = path.join(__dirname, "handlers");
const handlerFiles = fs
  .readdirSync(handlersPath)
  .filter((file: string) => file.endsWith("Handler.ts"));
handlerFiles.forEach((handlerFile: string) => {
  const filePath = path.join(handlersPath, handlerFile);
  import(filePath).then((handler) => handler.default(client));
});

// login with the token from .env.local
client.login(process.env.DISCORD_TOKEN);
