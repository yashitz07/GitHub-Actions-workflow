const { SlashCommandBuilder } = require('discord.js');
const { fetchGitHubStats } = require('../../utils/githubStats');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('contributions')
    .setDescription('Get GitHub contribution stats')
    .addStringOption(option =>
      option.setName('username')
        .setDescription('Your GitHub username')
        .setRequired(true)
    ),

  async execute(interaction) {
    const githubUsername = interaction.options.getString('username');
    await interaction.deferReply({ ephemeral: true });

    try {
      const stats = await fetchGitHubStats(githubUsername);
      const reply = `📊 GitHub Contributions for **${githubUsername}** in RUXAILAB:
- 🧪 Pull Requests: ${stats.prs}
- 🐛 Issues Opened: ${stats.issues}
- 💾 Commits: ${stats.commits}`;

      await interaction.editReply({ content: reply });
    } catch (error) {
      console.error('Error fetching stats:', error);
      await interaction.editReply('❌ Could not fetch contribution stats. Try again later.');
    }
  }
};
