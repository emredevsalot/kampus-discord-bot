import {
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
  Events,
  Message,
  MessageComponentInteraction,
} from "discord.js";

export default {
  name: Events.MessageCreate,
  async execute(message: Message) {
    if (message.author.bot) return;

    // If any message is sent in the "ping-admin" channel, the bot responds with a confirmation message
    // that includes "Yes" and "No" buttons.
    // If the user clicks "Yes," it pings the "Admin" role in the server, indicating that the user needs help.
    // If the user clicks "No" or if no response is received within 15 seconds, it informs the user accordingly
    // and deletes the confirmation message.
    if (message.channel.id === "1156972022929313934") {
      const confirmationMessage = await message.channel.send({
        content: "Are you sure you want to ping an admin?",
        components: [
          new ActionRowBuilder<ButtonBuilder>().addComponents(
            new ButtonBuilder()
              .setCustomId("yes")
              .setLabel("Yes")
              .setStyle(ButtonStyle.Success),
            new ButtonBuilder()
              .setCustomId("no")
              .setLabel("No")
              .setStyle(ButtonStyle.Danger)
          ),
        ],
      });
      // Filter for the user's response
      const filter = (interaction: MessageComponentInteraction) =>
        interaction.customId === "yes" || interaction.customId === "no";

      const collector = confirmationMessage.createMessageComponentCollector({
        filter,
        time: 15000,
        max: 1,
      });

      collector.on("collect", async (interaction) => {
        if (interaction.customId === "yes") {
          const adminRole = message.guild?.roles.cache.find(
            (role) => role.name === "Admin"
          );
          if (adminRole) {
            await message.channel.send(
              `${adminRole.toString()}, ${message.author.toString()} needs help!`
            );
          }
        } else {
          await message.channel.send("Admin will not be pinged.");
        }

        await confirmationMessage.delete();
        interaction.deferUpdate();
      });

      collector.on("end", (collected, reason) => {
        if (reason === "time") {
          message.channel.send(
            "No response received. Admin will not be pinged."
          );
          confirmationMessage.delete();
        }
      });
    }

    // "Good morning" and "Good night" message reactions
    const morningPattern = /g(ü|u)nayd(ı|i)n/i;
    const nightPattern = /iyi geceler/i;

    if (morningPattern.test(message.content)) {
      message.react("☀️");
    } else if (nightPattern.test(message.content)) {
      message.react("🌙");
    }
  },
};
