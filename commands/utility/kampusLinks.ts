import {
  SlashCommandBuilder,
  CommandInteraction,
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
} from "discord.js";

export default {
  data: new SlashCommandBuilder()
    .setName("kampus_links")
    .setDescription("Kampüsle alakalı linkler"),

  async execute(interaction: CommandInteraction) {
    const twitch = new ButtonBuilder()
      .setCustomId("twitch")
      .setLabel("Usirin Twitch")
      .setStyle(ButtonStyle.Primary);
    const monorepo = new ButtonBuilder()
      .setCustomId("monorepo")
      .setLabel("Kampüs Projeleri")
      .setStyle(ButtonStyle.Primary);
    const odin = new ButtonBuilder()
      .setCustomId("odin")
      .setLabel("Türkçe Odin Projesi")
      .setStyle(ButtonStyle.Primary);

    await interaction.reply({
      components: [
        new ActionRowBuilder<ButtonBuilder>().addComponents(
          twitch,
          monorepo,
          odin
        ),
      ],
      ephemeral: true,
    });
  },
};
