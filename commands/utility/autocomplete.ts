import {
  SlashCommandBuilder,
  ChatInputCommandInteraction,
  AutocompleteInteraction,
} from "discord.js";

export default {
  data: new SlashCommandBuilder()
    .setName("autocomplete")
    .setDescription("Returns autocomplete")
    .addStringOption((option) =>
      option
        .setName("color")
        .setDescription("A color based on autocomplete")
        .setAutocomplete(true)
        .setRequired(true)
    ),
  async autocomplete(interaction: AutocompleteInteraction) {
    const focusedValue = interaction.options.getFocused();
    const choices = ["Red", "Green", "Blue", "White", "Yellow"];
    const filtered = choices.filter((choice) =>
      choice.startsWith(focusedValue)
    );
    await interaction.respond(
      filtered.map((choice) => ({ name: choice, value: choice }))
    );
  },
  async execute(interaction: ChatInputCommandInteraction) {
    const option = interaction.options.getString("color");
    await interaction.reply({ content: `You chose ${option}` });
  },
};
