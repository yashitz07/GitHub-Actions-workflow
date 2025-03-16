const { GoogleSpreadsheet } = require('google-spreadsheet');
const { JWT } = require('google-auth-library');
const axios = require('axios');
const dotenv = require('dotenv');

dotenv.config();

const DISCORD_BOT_TOKEN = process.env.DISCORD_BOT_TOKEN;
const credentials  = JSON.parse(process.env.GOOGLE_CREDENTIALS_JSON);

async function getDiscordId(githubUsername) {
    const serviceAccountAuth = new JWT({
        email: credentials.client_email,
        key: credentials.private_key.replace(/\\n/g, '\n'),
        scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly'],
    });
    // console.log(serviceAccountAuth);
    const doc = new GoogleSpreadsheet(process.env.GOOGLE_SHEET_ID, serviceAccountAuth);
    await doc.loadInfo();
    const sheet = doc.sheetsByIndex[0];
    const rows = await sheet.getRows();
    console.log(`✅ Connected to Sheet: ${doc.title}`);
    console.log(`📜 Found ${rows.length} rows in the sheet`);
   // console.log("📄 Found rows:", rows.map(row => row._rawData));
    for (let row of rows) {
        console.log(`🔍 Checking row: ${row._rawData[0]} → ${row._rawData[1]}`);
        if (row._rawData[0] === githubUsername) {
            console.log(`✅ Match found! Returning Discord ID: ${row._rawData[1]}`);
            return row._rawData[1];
        }
    }
    console.log(`❌ No match found for GitHub username: ${githubUsername}`);
    return null;
}

async function assignDiscordRole(discordId) {
    const GUILD_ID = process.env.GUILD_ID;
    const ROLE_ID = process.env.ROLE_ID;

    const url = `https://discord.com/api/v10/guilds/${GUILD_ID}/members/${discordId}/roles/${ROLE_ID}`;
    console.log(url);
    const headers = {
        "Authorization": `Bot ${DISCORD_BOT_TOKEN}`,
        "Content-Type": "application/json"
    };

    try {
        await axios.put(url, {}, { headers });
        console.log(`✅ Role assigned to Discord user: ${discordId}`);
    } catch (error) {
        console.error("❌ Error assigning role:", error.response?.data || error.message);
    }
}

async function main() {
    const githubUsername = process.env.GITHUB_ACTOR; // GitHub username from workflow
    console.log(`🔍 Searching for GitHub username: ${githubUsername}`);
    if (!githubUsername) {
        console.error("❌ GitHub username not found!");
        return;
    }

    const discordId = await getDiscordId(githubUsername);
    if (!discordId) {
        console.error(`❌ No Discord ID found for GitHub username: ${githubUsername}`);
        return;
    }
    console.log(`✅ Found Discord ID: ${discordId}`);
    await assignDiscordRole(discordId);
}

main();
