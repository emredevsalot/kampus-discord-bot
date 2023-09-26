import { Events, Client, ActivityType, PresenceStatusData } from "discord.js";

// When the client is ready, run this code (only once)
export default {
  name: Events.ClientReady,
  once: true,
  async execute(client: Client<true>) {
    const options = [
      {
        type: ActivityType.Watching,
        text: "Ted Lasso",
        status: "online",
      },
      {
        type: ActivityType.Listening,
        text: "Komutları.",
        status: "idle",
      },

      {
        type: ActivityType.Playing,
        text: "Oyun",
        status: "dnd",
      },
    ];

    // Set random presence every 7 seconds
    setInterval(() => {
      const option = Math.floor(Math.random() * options.length);
      client.user.setPresence({
        activities: [
          {
            name: options[option].text,
            type: options[option].type,
          },
        ],
        status: options[option].status as PresenceStatusData,
      });
    }, 7 * 1000);

    console.log(`Ready! Logged in as ${client.user.tag}`);
  },
};
