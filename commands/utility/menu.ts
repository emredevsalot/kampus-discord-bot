import {
  SlashCommandBuilder,
  CommandInteraction,
  StringSelectMenuBuilder,
  StringSelectMenuOptionBuilder,
  ActionRowBuilder,
} from "discord.js";

export default {
  data: new SlashCommandBuilder()
    .setName("menu")
    .setDescription("Returns a select menu!"),

  async execute(interaction: CommandInteraction) {
    const menu = new StringSelectMenuBuilder()
      .setCustomId("example-menu")
      .setPlaceholder("Make a selection!")
      .setMinValues(1)
      .setMaxValues(1)
      .addOptions(
        new StringSelectMenuOptionBuilder()
          .setLabel("Option 1")
          .setDescription("Option 1 description")
          .setValue("Option 1 value"),
        new StringSelectMenuOptionBuilder()
          .setLabel("Option 2")
          .setDescription("Option 2 description")
          .setValue("Option 2 value")
      );

    await interaction.reply({
      content: "Choose something!",
      components: [
        new ActionRowBuilder<StringSelectMenuBuilder>().addComponents(menu),
      ],
      ephemeral: true,
    });
  },
};
