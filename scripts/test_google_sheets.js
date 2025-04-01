require("dotenv").config();
const { google } = require("googleapis");

const credentials = JSON.parse(process.env.GOOGLE_CREDENTIALS_JSON);
const sheetId = process.env.GOOGLE_SHEET_ID;

async function testGoogleSheets() {
  const auth = new google.auth.JWT(credentials.client_email, null, credentials.private_key.replace(/\\n/g, "\n"), [
    "https://www.googleapis.com/auth/spreadsheets",
  ]);

  const sheets = google.sheets({ version: "v4", auth });

  try {
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: sheetId,
      range: "Sheet1!A1:B5",
    });

    console.log("✅ Google Sheets API Test Successful!");
    console.table(response.data.values);
  } catch (error) {
    console.error("❌ Google Sheets API Test Failed!", error);
  }
}

testGoogleSheets();
