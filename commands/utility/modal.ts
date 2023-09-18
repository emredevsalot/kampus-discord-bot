import {
  SlashCommandBuilder,
  ActionRowBuilder,
  ModalBuilder,
  TextInputStyle,
  TextInputBuilder,
  ModalActionRowComponentBuilder,
  CommandInteraction,
} from "discord.js";

export default {
  data: new SlashCommandBuilder()
    .setName("modal")
    .setDescription("Returns a modal!"),

  async execute(interaction: CommandInteraction) {
    const modalCustomId = "example-modal";

    const modal = new ModalBuilder()
      .setCustomId(modalCustomId)
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
      .setStyle(TextInputStyle.Paragraph);

    modal.addComponents(
      new ActionRowBuilder<ModalActionRowComponentBuilder>().addComponents(
        textInput1
      ),
      new ActionRowBuilder<ModalActionRowComponentBuilder>().addComponents(
        textInput2
      )
    );

    await interaction.showModal(modal);
  },
};
