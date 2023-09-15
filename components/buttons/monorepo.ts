module.exports = {
  data: { name: "monorepo" },
  async execute(interaction: any) {
    await interaction.reply({
      content: "https://github.com/kamp-us/monorepo",
      ephemeral: true,
    });
  },
};
