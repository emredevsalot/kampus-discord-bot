import { Client } from "discord.js";

const fs = require("node:fs");
const path = require("node:path");

//
export default async (client: Client) => {
  // components
  const componentsPath = path.join(__dirname, "../components");
  const componentSubFolders = fs.readdirSync(componentsPath);
  // components/:componentSubFolders
  for (const subFolder of componentSubFolders) {
    const subFolderPath = path.join(componentsPath, subFolder);
    const componentFiles = fs
      .readdirSync(subFolderPath)
      .filter((file: any) => file.endsWith(".ts"));

    const { buttons } = client;
    // components/:componentSubFolders/:eachComponent.ts
    switch (subFolder) {
      case "buttons":
        for (const file of componentFiles) {
          const filePath = path.join(subFolderPath, file);
          const button = require(filePath);
          buttons.set(button.data.name, button);
        }
        break;

      default:
        break;
    }
  }
  console.log("componentHandler.ts: Done");
};
