import { SlashCommandBuilder, ChatInputCommandInteraction } from "discord.js";

export default {
  data: new SlashCommandBuilder()
    .setName("timeout")
    .setDescription("Timeouts the chosen member")
    .addUserOption((option) =>
      option
        .setName("target")
        .setDescription("The member you'd like to timeout")
        .setRequired(true)
    )
    .addIntegerOption((option) =>
      option
        .setName("time")
        .setDescription("Amount of minutes to timeout a member for")
    )
    .addStringOption((option) =>
      option
        .setName("reason")
        .setDescription("Why do you want to timeout this member?")
    ),

  async execute(interaction: ChatInputCommandInteraction) {
    const user = interaction.options.getUser("target");
    let time = interaction.options.getInteger("time");
    let reason = interaction.options.getString("reason");

    if (!user) return;

    const member = await interaction.guild?.members
      .fetch(user.id)
      .catch(console.error);

    if (!reason) reason = "No reason provided.";
    //TODO: Is this necesarry? When time field is empty, does it get "null" automatically?
    if (!time) time = null;

    await user
      ?.send({
        content: `You have been timed out in ${interaction.guild?.name} for ${time} minutes.\nReason: ${reason}`,
      })
      .catch(console.error);

    await member
      ?.timeout(time == null ? null : time * 60 * 1000, reason)
      .catch(console.error);

    // TODO: fix "got timed out for null minutes." to "timeout revoked" or something like that.
    await interaction.reply({
      content: `${member} got timed out for ${time} minutes.`,
    });
  },
};
