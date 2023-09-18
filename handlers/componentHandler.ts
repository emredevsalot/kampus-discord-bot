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

    const { buttons, selectMenus, modals } = client;
    // components/:componentSubFolders/:eachComponent.ts
    switch (subFolder) {
      case "buttons":
        for (const file of componentFiles) {
          const filePath = path.join(subFolderPath, file);
          const button = require(filePath);
          buttons.set(button.data.name, button);
        }
        break;

      case "selectMenus":
        for (const file of componentFiles) {
          const filePath = path.join(subFolderPath, file);
          const menu = require(filePath);
          selectMenus.set(menu.data.name, menu);
        }
        break;

      case "modals":
        for (const file of componentFiles) {
          const filePath = path.join(subFolderPath, file);
          const modal = require(filePath);
          modals.set(modal.data.name, modal);
        }
        break;

      default:
        break;
    }
  }
  console.log("componentHandler.ts: Done");
};
