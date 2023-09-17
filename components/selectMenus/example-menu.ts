import { StringSelectMenuInteraction } from "discord.js";

module.exports = {
  data: { name: "example-menu" },
  async execute(interaction: StringSelectMenuInteraction) {
    await interaction.reply({
      content: `You select: ${interaction.values[0]}`,
      ephemeral: true,
    });
  },
};
