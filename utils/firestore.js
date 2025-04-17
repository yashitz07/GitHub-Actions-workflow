const admin = require('firebase-admin');
const axios = require('axios');
const serviceAccount = JSON.parse(process.env.FIREBASE_CREDENTIALS);
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();
const collection = db.collection('github-discord-mapping');

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

module.exports = {
  setMapping,
  getDiscordId,
  getGitHubUsername,
  getDiscordUsername
};
