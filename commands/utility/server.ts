import { SlashCommandBuilder, CommandInteraction } from "discord.js";

export default {
  data: new SlashCommandBuilder()
    .setName("server")
    .setDescription("Display info about this server."),

  async execute(interaction: CommandInteraction) {
    if (!interaction.guild) return;

    await interaction.reply(
      `Server name: ${interaction.guild.name}\nTotal members: ${interaction.guild.memberCount}`
    );
  },
};
