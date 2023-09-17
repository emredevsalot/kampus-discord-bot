import { ButtonInteraction } from "discord.js";

module.exports = {
  data: { name: "twitch" },
  async execute(interaction: ButtonInteraction) {
    await interaction.reply({
      content: "https://www.twitch.com/usirin",
      ephemeral: true,
    });
  },
};
