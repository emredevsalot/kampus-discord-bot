import {
  SlashCommandBuilder,
  CommandInteraction,
  PermissionFlagsBits,
  PermissionsBitField,
  GuildMemberRoleManager,
  Role,
} from "discord.js";

export default {
  data: new SlashCommandBuilder()
    .setName("permission")
    .setDescription("This command requires permission!")
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),

  async execute(interaction: CommandInteraction) {
    if (!interaction.member) return;
    const { roles } = interaction.member;

    if (!(roles instanceof GuildMemberRoleManager)) return;

    // Get created "Admin" role
    let adminRole: Role | null | undefined;
    try {
      adminRole = await interaction.guild?.roles.fetch("1153611446777810974");
    } catch (error) {
      console.error(error);
    }

    // Create a "test" role
    let testRole: Role | null | undefined;
    try {
      testRole = await interaction.guild?.roles.create({
        name: "test",
        permissions: [PermissionsBitField.Flags.KickMembers],
      });
    } catch (error) {
      console.error(error);
    }

    // If user has "Admin" role, remove it
    if (adminRole) {
      if (roles.cache.has("1153611446777810974")) {
        await interaction.deferReply({
          fetchReply: true,
        });
        await roles.remove(adminRole).catch(console.error);
        await interaction.editReply({
          content: `Removed: ${adminRole.name} role from you.`,
        });
      } else {
        await interaction.reply({
          content: `You don't have the ${adminRole.name} role.`,
        });
      }
    } else {
      console.error("Admin role was not found.");
    }

    // Give user "test" role, create a "test" channel
    if (testRole) {
      await roles.add(testRole).catch(console.error);

      await testRole
        .setPermissions([PermissionsBitField.Flags.BanMembers])
        .catch(console.error);

      const channel = await interaction.guild?.channels.create({
        name: "test",
        permissionOverwrites: [
          {
            id: interaction.guild.id,
            deny: [PermissionsBitField.Flags.ViewChannel],
          },
          {
            id: testRole.id,
            allow: [PermissionsBitField.Flags.ViewChannel],
          },
        ],
      });

      await channel?.permissionOverwrites
        .edit(testRole.id, { SendMessages: false })
        .catch(console.error);
    } else {
      console.error("Test role was not found.");
    }
  },
};
