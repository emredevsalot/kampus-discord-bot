module.exports = {
  data: { name: "twitch" },
  async execute(interaction: any) {
    await interaction.reply({
      content: "https://www.twitch.com/usirin",
      ephemeral: true,
    });
  },
};
