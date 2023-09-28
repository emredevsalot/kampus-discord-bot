import { Events, Message } from "discord.js";

export default {
  name: Events.MessageCreate,
  async execute(message: Message) {
    if (message.author.bot) return;

    // Define regex patterns for different reactions (case-insensitive)
    const morningPattern = /g(ü|u)nayd(ı|i)n/i;
    const nightPattern = /iyi geceler/i;

    if (morningPattern.test(message.content)) {
      message.react("☀️");
    } else if (nightPattern.test(message.content)) {
      message.react("🌙");
    }
  },
};
