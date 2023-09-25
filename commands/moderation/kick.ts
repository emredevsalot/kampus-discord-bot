import { SlashCommandBuilder, ChatInputCommandInteraction } from "discord.js";

export default {
  data: new SlashCommandBuilder()
    .setName("kick")
    .setDescription("Kicks the chosen member")
    .addUserOption((option) =>
      option
        .setName("target")
        .setDescription("The member you'd like to kick")
        .setRequired(true)
    )
    .addStringOption((option) =>
      option
        .setName("reason")
        .setDescription("Why do you want to kick this member?")
    ),

  async execute(interaction: ChatInputCommandInteraction) {
    const user = interaction.options.getUser("target");
    let reason = interaction.options.getString("reason");

    if (!user) return;

    const member = await interaction.guild?.members
      .fetch(user.id)
      .catch(console.error);

    if (!reason) reason = "No reason provided.";

    await user
      ?.send({
        content: `You have been kicked from ${interaction.guild?.name}.\nReason: ${reason}`,
      })
      .catch(console.error);

    await member?.kick(reason).catch(console.error);

    await interaction.reply({ content: `${member} got kicked.` });
  },
};
