import { Client } from "discord.js";

const fs = require("node:fs");
const path = require("node:path");

// Dynamically retrieve and execute event files
export default async (client: Client) => {
  // events
  const eventsPath = path.join(__dirname, "../events");
  const eventSubFolders = fs.readdirSync(eventsPath);
  // events/:eventSubFolders
  for (const subFolder of eventSubFolders) {
    const subFolderPath = path.join(eventsPath, subFolder);
    const eventFiles = fs
      .readdirSync(subFolderPath)
      .filter((file: any) => file.endsWith(".ts"));

    // events/:eventSubFolders/:eachEvent.ts
    switch (subFolder) {
      case "client":
        for (const file of eventFiles) {
          const filePath = path.join(subFolderPath, file);
          const event = require(filePath);
          if (event.once) {
            client.once(event.name, (...args: any[]) => event.execute(...args));
          } else {
            client.on(event.name, (...args: any[]) => event.execute(...args));
          }
        }
        break;

      default:
        break;
    }
  }
  console.log("eventHandler.ts: Done");
};
