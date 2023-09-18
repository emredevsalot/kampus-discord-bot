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
          const button = await import(filePath);
          buttons.set(button.default.data.name, button.default);
        }
        break;

      case "selectMenus":
        for (const file of componentFiles) {
          const filePath = path.join(subFolderPath, file);
          const menu = await import(filePath);
          selectMenus.set(menu.default.data.name, menu.default);
        }
        break;

      case "modals":
        for (const file of componentFiles) {
          const filePath = path.join(subFolderPath, file);
          const modal = await import(filePath);
          modals.set(modal.default.data.name, modal.default);
        }
        break;

      default:
        break;
    }
  }
  console.log("[SUCCESS] componentHandler.ts loaded.");
};
