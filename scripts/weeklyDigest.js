require('dotenv').config();
const axios = require('axios');
const { getAllUserMappings, getTopContributorsFromStats, saveWeeklyStats } = require('../utils/firestore');
const { fetchGitHubStats } = require('../utils/githubStats');

const headers = {
  Authorization: `Bot ${process.env.DISCORD_BOT_TOKEN}`,
};

const CHANNEL_ID = process.env.WEEKLY_DIGEST_CHANNEL_ID;

async function postWeeklyDigest() {
  const mappings = await getAllUserMappings();
  const stats = [];

  for (const { discordId, githubUsername } of mappings) {
    const { prs, issues, commits } = await fetchGitHubStats(discordId, true);
    stats.push({ discordId, githubUsername, prs, issues, commits });
  }

  await saveWeeklyStats(stats);
  const { topPR, topIssue, topCommit } = await getTopContributorsFromStats(stats);

  const message = `📢 **Weekly Highlights**
🥇 **Top PR Contributor**: <@${topPR.discordId}> (${topPR.prs} PRs)
🐛 **Top Issue Opener**: <@${topIssue.discordId}> (${topIssue.issues} issues)
💾 **Most Commits**: <@${topCommit.discordId}> (${topCommit.commits} commits)`;

  await axios.post(`https://discord.com/api/v10/channels/${CHANNEL_ID}/messages`, {
    content: message,
  }, { headers });

  console.log("✅ Weekly digest posted to Discord.");
}

postWeeklyDigest();
