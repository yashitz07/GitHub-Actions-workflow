const { GoogleSpreadsheet } = require("google-spreadsheet");
const { JWT } = require("google-auth-library");
const axios = require("axios");

const credentials = JSON.parse(process.env.GOOGLE_CREDENTIALS_JSON);
const sheetId = process.env.GOOGLE_SHEET_ID;
const DISCORD_BOT_TOKEN = process.env.DISCORD_BOT_TOKEN;
const GUILD_ID = process.env.GUILD_ID;

const auth = new JWT({
  email: credentials.client_email,
  key: credentials.private_key.replace(/\\n/g, "\n"),
  scopes: ["https://www.googleapis.com/auth/spreadsheets"],
});

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
    return discordId; 
  }
}

async function getDiscordId(githubUsername) {
  try {
    const doc = new GoogleSpreadsheet(sheetId, auth);
    await doc.loadInfo();
    const sheet = doc.sheetsByIndex[0];
    const rows = await sheet.getRows();
    const row = rows.find((row) => row._rawData[0] === githubUsername);

    if (row) {
      const discordId = row._rawData[1];
      const discordUser = await getDiscordUsername(discordId);
      console.log(`✅ Found Discord: ${discordUser} for GitHub: ${githubUsername}`);
      return discordId;
    } else {
      console.log(`❌ No match found for GitHub username: ${githubUsername}`);
      return null;
    }
  } catch (error) {
    console.error("Error accessing Google Sheets:", error);
    return null;
  }
}
async function getGitHubUsername(discordId) {
  try {
    const doc = new GoogleSpreadsheet(sheetId, auth);
    await doc.loadInfo();
    const sheet = doc.sheetsByIndex[0];
    const rows = await sheet.getRows();
    const row = rows.find((row) => row._rawData[1] === discordId);

    if (row) {
      const githubUsername = row._rawData[0];
      const discordUser = await getDiscordUsername(discordId);
      console.log(`✅ Found GitHub: ${githubUsername} for Discord: ${discordUser}`);
      return githubUsername;
    } else {
      console.log(`❌ No match found for Discord ID: ${discordId}`);
      return null;
    }
  } catch (error) {
    console.error("Error accessing Google Sheets:", error);
    return null;
  }
}
async function appendMappingToSheet(discordId, githubUsername) {
  try {
    const discordUser = await getDiscordUsername(discordId);
    const doc = new GoogleSpreadsheet(sheetId, auth);
    await doc.loadInfo();
    const sheet = doc.sheetsByIndex[0];

    console.log(`➕ Adding row: ${githubUsername} → ${discordUser}`);
    await sheet.addRow({
      "GitHub Username": githubUsername,
      "Discord ID": discordId
    });
    console.log(`✅ Appended: ${githubUsername} → ${discordUser}`);
  } catch (error) {
    console.error("Error appending to Google Sheets:", error);
  }
}

module.exports = { getDiscordId, appendMappingToSheet, getGitHubUsername };
