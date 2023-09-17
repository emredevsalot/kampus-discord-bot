import { ButtonInteraction } from "discord.js";

module.exports = {
  data: { name: "monorepo" },
  async execute(interaction: ButtonInteraction) {
    await interaction.reply({
      content: "https://github.com/kamp-us/monorepo",
      ephemeral: true,
    });
  },
};
