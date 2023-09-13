const { Events } = require("discord.js");

// When the client is ready, run this code (only once)
module.exports = {
  name: Events.ClientReady,
  once: true,
  execute(client: any) {
    console.log(`Ready! Logged in as ${client.user.tag}`);
  },
};

// TODO:
// The part below used to work in bot.ts
// Can't use "Client<true>" here.

// // When the client is ready, run this code (only once)
// // We use 'c' for the event parameter to keep it separate from the already defined 'client'
// client.once(Events.ClientReady, (c: Client<true>) => {
//   console.log(`Ready! Logged in as ${c.user.tag}`);
// });
