require("dotenv").config();
const { getDiscordId } = require("../utils/firestore");
const { assignRole } = require("../utils/discordAPI");

const EVENT_NAME = process.env.GITHUB_EVENT_NAME;
const EVENT_ACTION = process.env.GITHUB_EVENT_ACTION;
const ACTOR = process.env.ACTOR;
//test
async function main() {
  console.log(`🔍 Searching for GitHub username: ${ACTOR}`);
  if (!ACTOR) return console.error("❌ GitHub username not found!");

  const discordId = await getDiscordId(ACTOR);
  if (!discordId) return console.error(`❌ No Discord ID found for ${ACTOR}`);

  await assignRole(discordId, EVENT_NAME, EVENT_ACTION, true);
}

main();
