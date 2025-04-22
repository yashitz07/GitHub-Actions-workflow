const admin = require('firebase-admin');
const axios = require('axios');
const serviceAccount = JSON.parse(process.env.FIREBASE_CREDENTIALS_JSON);
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();
const collection = db.collection('github-discord-mapping');
const weeklyCollection = db.collection('weekly-stats');

const DISCORD_BOT_TOKEN = process.env.DISCORD_BOT_TOKEN;
const GUILD_ID = process.env.GUILD_ID;

async function getDiscordUsername(discordId) {
  try {
    const response = await axios.get(
      `https://discord.com/api/v10/users/${discordId}`,
      {
        headers: {
          Authorization: `Bot ${DISCORD_BOT_TOKEN}`,
        },
      }
    );
    const { username, discriminator } = response.data;
    return `${username}#${discriminator}`;
  } catch (error) {
    console.error("⚠️ Failed to fetch Discord username:", error.response?.data || error.message);
    return discordId; // fallback
  }
}

async function setMapping(discordId, githubUsername) {
  await collection.doc(discordId).set({ githubUsername });
  const discordTag = await getDiscordUsername(discordId);
  console.log(`✅ Saved: ${githubUsername} → ${discordTag}`);
}

async function getDiscordId(githubUsername) {
  const snapshot = await collection.where('githubUsername', '==', githubUsername).get();
  if (snapshot.empty) {
    console.log(`❌ No match found for GitHub username: ${githubUsername}`);
    return null;
  }
  const doc = snapshot.docs[0];
  const discordId = doc.id;
  const discordTag = await getDiscordUsername(discordId);
  console.log(`✅ Found Discord: ${discordTag} for GitHub: ${githubUsername}`);
  return discordId;
}

async function getGitHubUsername(discordId) {
  const doc = await collection.doc(discordId).get();
  if (!doc.exists) {
    console.log(`❌ No match found for Discord ID: ${discordId}`);
    return null;
  }
  const githubUsername = doc.data().githubUsername;
  const discordTag = await getDiscordUsername(discordId);
  console.log(`✅ Found GitHub: ${githubUsername} for Discord: ${discordTag}`);
  return githubUsername;
}

async function saveGitHubStats(discordId, stats) {
  await collection.doc(discordId).set({
    stats,
  }, { merge: true });
  console.log(`📦 Stats cached in Firestore`);
}

async function getCachedStats(discordId) {
  const doc = await collection.doc(discordId).get();
  if (!doc.exists || !doc.data().stats) return null;
  return doc.data().stats;
}

async function getAllUserMappings() {
  const snapshot = await collection.get();
  const users = [];

  snapshot.forEach(doc => {
    const data = doc.data();
    if (data.githubUsername && data.stats) {
      users.push({
        discordId: doc.id,
        githubUsername: data.githubUsername,
        stats: data.stats,
      });
    }
  });

  return users;
}


async function saveWeeklyStats(stats) {
  const docId = new Date().toISOString().slice(0, 10); // e.g. 2025-04-21
  console.log("🔥 Saving stats:", JSON.stringify(stats, null, 2));
  await weeklyCollection.doc(docId).set({ data: stats });
  console.log("📊 Weekly stats saved to Firestore");
}

async function getTopContributorsFromStats(stats) {
  const topPR = stats.reduce((a, b) => a.prs > b.prs ? a : b, {});
  const topIssue = stats.reduce((a, b) => a.issues > b.issues ? a : b, {});
  const topCommit = stats.reduce((a, b) => a.commits > b.commits ? a : b, {});
  return { topPR, topIssue, topCommit };
}

module.exports = {
  setMapping,
  getDiscordId,
  getGitHubUsername,
  getDiscordUsername,
  saveGitHubStats,
  getCachedStats,
  getAllUserMappings,
  saveWeeklyStats,
  getTopContributorsFromStats,
};
