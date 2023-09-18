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
      .filter((file: string) => file.endsWith(".ts"));

    // events/:eventSubFolders/:eachEvent.ts
    switch (subFolder) {
      case "client":
        for (const file of eventFiles) {
          const filePath = path.join(subFolderPath, file);
          const event = await import(filePath);
          if (event.default) {
            if (event.default.once) {
              client.once(event.default.name, (...args: any[]) =>
                event.default.execute(...args)
              );
            } else {
              client.on(event.default.name, (...args: any[]) =>
                event.default.execute(...args, client)
              );
            }
            console.log("[SUCCESS]", file, "event file loaded.");
          } else {
            console.log("[ERROR]", file, "event file is not loaded.");
            continue;
          }
        }
        break;

      default:
        break;
    }
  }
  console.log("[SUCCESS] eventHandler.ts loaded.");
};
