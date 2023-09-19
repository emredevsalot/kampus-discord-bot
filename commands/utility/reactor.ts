import {
  SlashCommandBuilder,
  CommandInteraction,
  MessageReaction,
  User,
  GuildEmoji,
} from "discord.js";

export default {
  data: new SlashCommandBuilder()
    .setName("reactor")
    .setDescription("Returns reactions"),

  async execute(interaction: CommandInteraction) {
    const message = await interaction.reply({
      content: "React here.",
      fetchReply: true,
    });

    // // TODO: "emoji" is undefined.
    // const emoji = message.guild?.emojis.cache.find(
    //   (e) => e.name === "blobreach"
    // );
    // console.log(emoji);
    // if (emoji) {
    //   message.react(emoji);
    // }

    message.react("😄");

    const filter = (reaction: MessageReaction, user: User) => {
      return reaction.emoji.name == "😄" && user.id == interaction.user.id;
    };

    const collector = message.createReactionCollector({ filter, time: 15000 });

    collector.on("collect", (reaction, user) => {
      console.log(`Collected ${reaction.emoji.name} from ${user.tag}`);
    });

    collector.on("end", (collected) => {
      console.log(`Collected ${collected.size} items`);
    });
  },
};
