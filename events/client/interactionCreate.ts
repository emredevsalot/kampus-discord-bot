import {
  Events,
  Interaction,
  CacheType,
  Client,
  InteractionType,
} from "discord.js";

// Command interactions listener
export default {
  name: Events.InteractionCreate,
  async execute(interaction: Interaction<CacheType>, client: Client) {
    if (interaction.isChatInputCommand()) {
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
    } else if (interaction.isButton()) {
      const { buttons } = interaction.client;
      const { customId } = interaction;
      const button = buttons.get(customId);
      if (!button) return new Error("There is no code for this button");

      try {
        await button.execute(interaction, client);
      } catch (err) {
        console.log(err);
      }
    } else if (interaction.isModalSubmit()) {
      const { modals } = interaction.client;
      const { customId } = interaction;
      const modal = modals.get(customId);
      if (!modal) return new Error("There is no code for this modal");

      try {
        await modal.execute(interaction, client);
      } catch (err) {
        console.log(err);
      }
    } else if (interaction.isStringSelectMenu()) {
      const { selectMenus } = interaction.client;
      const { customId } = interaction;
      const menu = selectMenus.get(customId);
      if (!menu) return new Error("There is no code for this select menu");

      try {
        await menu.execute(interaction, client);
      } catch (err) {
        console.log(err);
      }
    } else if (interaction.isContextMenuCommand()) {
      const contextCommand = interaction.client.commands.get(
        interaction.commandName
      );

      if (!contextCommand) {
        console.error(
          `No command matching ${interaction.commandName} was found.`
        );
        return;
      }

      try {
        await contextCommand.execute(interaction);
      } catch (error) {
        console.error(`Error executing ${interaction.commandName}`);
        console.error(error);
      }
    } else if (interaction.isAutocomplete()) {
      const autocompleteCommand = interaction.client.commands.get(
        interaction.commandName
      );

      if (!autocompleteCommand) {
        console.error(
          `No command matching ${interaction.commandName} was found.`
        );
        return;
      }

      try {
        await autocompleteCommand.autocomplete(interaction);
      } catch (error) {
        console.error(error);
      }
    }
  },
};
