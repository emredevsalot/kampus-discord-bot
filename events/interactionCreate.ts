const { Events } = require("discord.js");

// Command interactions listener
module.exports = {
  name: Events.InteractionCreate,
  async execute(interaction: any) {
    if (!interaction.isChatInputCommand()) return;

    const command = interaction.client.commands.get(interaction.commandName);

    if (!command) {
      console.error(
        `No command matching ${interaction.commandName} was found.`
      );
      return;
    }

    try {
      await command.execute(interaction);
    } catch (error) {
      console.error(`Error executing ${interaction.commandName}`);
      console.error(error);
    }
  },
};

// TODO:
// The part below used to work in bot.ts
// Can't use "Interaction<CacheType>" here.
// ERROR: 'Interaction' refers to a value, but is being used as a type here. Did you mean 'typeof Interaction'?ts(2749)

// // Receiving command interactions
// client.on(
//   Events.InteractionCreate,
//   async (interaction: Interaction<CacheType>) => {
//     if (!interaction.isChatInputCommand()) return;
//     const command = client.commands.get(interaction.commandName);

//     if (!command) {
//       console.error(
//         `No command matching ${interaction.commandName} was found.`
//       );
//       return;
//     }

//     try {
//       await command.execute(interaction);
//     } catch (error) {
//       console.error(error);
//       if (interaction.replied || interaction.deferred) {
//         await interaction.followUp({
//           content: "There was an error while executing this command!",
//           ephemeral: true,
//         });
//       } else {
//         await interaction.reply({
//           content: "There was an error while executing this command!",
//           ephemeral: true,
//         });
//       }
//     }
//   }
// );
