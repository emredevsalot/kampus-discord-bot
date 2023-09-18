import { Events, Client } from "discord.js";

// When the client is ready, run this code (only once)
export default {
  name: Events.ClientReady,
  once: true,
  async execute(client: Client<true>) {
    console.log(`Ready! Logged in as ${client.user.tag}`);
  },
};
