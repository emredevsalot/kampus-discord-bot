module.exports = {
  data: { name: "example-menu" },
  async execute(interaction: any) {
    await interaction.reply({
      content: `You select: ${interaction.values[0]}`,
      ephemeral: true,
    });
  },
};
