const axios = require("axios");
const { fetchGitHubStats } = require("./githubStats");

const DISCORD_BOT_TOKEN = process.env.DISCORD_BOT_TOKEN;
const GUILD_ID = process.env.GUILD_ID;

const PR_THRESHOLDS = [
  { count: 10, roleId: process.env.ROLE_ID_PR_10 },
  { count: 5, roleId: process.env.ROLE_ID_PR_5 },
  { count: 1, roleId: process.env.ROLE_ID_PR_1 }
];

const ISSUE_THRESHOLDS = [
  { count: 5, roleId: process.env.ROLE_ID_ISSUE_5 },
  { count: 1, roleId: process.env.ROLE_ID_ISSUE_1 }
];

const COMMIT_THRESHOLDS = [
  { count: 15, roleId: process.env.ROLE_ID_COMMIT_15 },
  { count: 1, roleId: process.env.ROLE_ID_COMMIT_5 }
];

async function assignRole(discordId, event, action,  forceRefresh = false) {
  const headers = { Authorization: `Bot ${DISCORD_BOT_TOKEN}` };

  let discordUsername = discordId;
  try {
    const userRes = await axios.get(`https://discord.com/api/v10/users/${discordId}`, { headers });
    discordUsername = `${userRes.data.username}#${userRes.data.discriminator}`;
  } catch (err) {
    console.warn("⚠️ Couldn't fetch Discord username.");
  }

  // Fetch contribution stats from Firestore (cache)
  const { prs, issues, commits } = await fetchGitHubStats(discordId, forceRefresh);
  console.log(`📊 Stats for ${discordUsername}: PRs=${prs}, Issues=${issues}, Commits=${commits}`);
  const assignments = [];

  if (event === "pull_request" && action === "opened") {
    for (const tier of PR_THRESHOLDS) {
      if (prs >= tier.count) {
        console.log(`💾 Matched pr Tier ${tier.count}+ → assigning role: ${tier.roleId}`);
        await axios.put(`https://discord.com/api/v10/guilds/${GUILD_ID}/members/${discordId}/roles/${tier.roleId}`, {}, { headers });
        assignments.push(`🛠️ PR Tier ${tier.count}+`);
        console.log(`pushed role ${tier.roleId} to ${discordId}`);
        break;
      }
    }
  }

  if (event === "issues" && action === "opened") {
    for (const tier of ISSUE_THRESHOLDS) {
      if (issues >= tier.count) {
        await axios.put(`https://discord.com/api/v10/guilds/${GUILD_ID}/members/${discordId}/roles/${tier.roleId}`, {}, { headers });
        assignments.push(`🐛 Issue Tier ${tier.count}+`);
        break;
      }
    }
  }

  if (event === "push") {
    for (const tier of COMMIT_THRESHOLDS) {
      if (commits >= tier.count) {
        console.log(`💾 Matched Commit Tier ${tier.count}+ → assigning role: ${tier.roleId}`);
        await axios.put(`https://discord.com/api/v10/guilds/${GUILD_ID}/members/${discordId}/roles/${tier.roleId}, {}, { headers }`);
        assignments.push(`💾 Commit Tier ${tier.count}+`);
        console.log(`commit role ${tier.roleId} to ${discordId}`);
        break;
      }
    }
  }
  
  console.log(assignments.length);
  if (assignments.length > 0) {
    console.log(`✅ Assigned to ${discordUsername}: ${assignments.join(", ")}`);
  } else {
    console.log(`ℹ️ No roles assigned to ${discordUsername} for this event.`);
  }
}

module.exports = { assignRole };
