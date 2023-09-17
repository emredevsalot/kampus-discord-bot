import { ButtonInteraction } from "discord.js";

module.exports = {
  data: { name: "odin" },
  async execute(interaction: ButtonInteraction) {
    await interaction.reply({
      content: "https://github.com/kamp-us/turkce-odin-project",
      ephemeral: true,
    });
  },
};
