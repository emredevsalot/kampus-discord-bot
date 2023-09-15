module.exports = {
  data: { name: "odin" },
  async execute(interaction: any) {
    await interaction.reply({
      content: "https://github.com/kamp-us/turkce-odin-project",
      ephemeral: true,
    });
  },
};
