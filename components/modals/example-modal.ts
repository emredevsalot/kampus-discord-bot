import { ModalSubmitInteraction } from "discord.js";

export default {
  data: { name: "example-modal" },
  async execute(interaction: ModalSubmitInteraction) {
    await interaction.reply({
      content: `You wrote: ${interaction.fields.getTextInputValue(
        "modalInput1"
      )} and ${interaction.fields.getTextInputValue("modalInput2")}`,
      ephemeral: true,
    });
  },
};
