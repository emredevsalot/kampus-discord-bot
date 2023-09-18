const {
  SlashCommandBuilder,
  ActionRowBuilder,
  ModalBuilder,
  TextInputStyle,
  TextInputBuilder,
} = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("modal")
    .setDescription("Returns a modal!"),
  async execute(interaction: any) {
    const modal = new ModalBuilder()
      .setCustomId("example-modal")
      .setTitle("My Example Modal");

    const textInput1 = new TextInputBuilder()
      .setCustomId("modalInput1")
      .setLabel("My Text Input 1")
      .setRequired(true)
      .setStyle(TextInputStyle.Short);

    const textInput2 = new TextInputBuilder()
      .setCustomId("modalInput2")
      .setLabel("My Text Input 2")
      .setRequired(true)
      .setStyle(TextInputStyle.Short);

    modal.addComponents(
      new ActionRowBuilder().addComponents(textInput1),
      new ActionRowBuilder().addComponents(textInput2)
    );

    await interaction.showModal(modal);
  },
};
