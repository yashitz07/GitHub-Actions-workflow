const { GoogleSpreadsheet } = require("google-spreadsheet");
const { JWT } = require("google-auth-library");

const credentials = JSON.parse(process.env.GOOGLE_CREDENTIALS_JSON);
const sheetId = process.env.GOOGLE_SHEET_ID;

const auth = new JWT({
  email: credentials.client_email,
  key: credentials.private_key.replace(/\\n/g, "\n"),
  scopes: ["https://www.googleapis.com/auth/spreadsheets.readonly"],
});

async function getDiscordId(githubUsername) {
  try {
    const doc = new GoogleSpreadsheet(sheetId, auth);
    await doc.loadInfo();
    const sheet = doc.sheetsByIndex[0];
    const rows = await sheet.getRows();
    const row = rows.find((row) => row._rawData[0] === githubUsername);

    if (row) {
      console.log(` Found Discord ID: ${row._rawData[1]}`);
      return row._rawData[1];
    } else {
      console.log(`No match found for GitHub username: ${githubUsername}`);
      return null;
    }
  } catch (error) {
    console.error("Error accessing Google Sheets:", error);
    return null;
  }
}

module.exports = { getDiscordId };
