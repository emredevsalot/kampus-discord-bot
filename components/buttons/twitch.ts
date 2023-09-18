import { ButtonInteraction } from "discord.js";

export default {
  data: { name: "twitch" },
  async execute(interaction: ButtonInteraction) {
    await interaction.reply({
      content: "https://www.twitch.com/usirin",
      ephemeral: true,
    });
  },
};
