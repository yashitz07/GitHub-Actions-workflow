const { SlashCommandBuilder } = require('discord.js');
require('dotenv').config();

module.exports = {
  data: new SlashCommandBuilder()
    .setName('verify')
    .setDescription('Link your GitHub account to Discord'),

  async execute(interaction) {
    const discordId = interaction.user.id;
    const oauthUrl = `https://github.com/login/oauth/authorize?client_id=${process.env.GH_CLIENT_ID}&redirect_uri=${process.env.GITHUB_REDIRECT_URI}&state=${discordId}`;

    await interaction.reply({
      content: `🔗 Click to link your GitHub account: [Verify GitHub](${oauthUrl})`,
      ephemeral: true, // Only visible to user
    });
  },
};
