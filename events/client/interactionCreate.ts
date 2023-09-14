const { Events } = require("discord.js");
import type { CacheType, Interaction } from "discord.js";

// Command interactions listener
module.exports = {
  name: Events.InteractionCreate,
  async execute(interaction: Interaction<CacheType>) {
    if (!interaction.isChatInputCommand()) return;

    const command = interaction.client.commands.get(interaction.commandName);

    if (!command) {
      console.error(
        `No command matching ${interaction.commandName} was found.`
      );
      return;
    }

    try {
      await command.execute(interaction);
    } catch (error) {
      console.error(`Error executing ${interaction.commandName}`);
      console.error(error);
    }
  },
};