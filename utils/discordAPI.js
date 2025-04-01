const axios = require("axios");

const DISCORD_BOT_TOKEN = process.env.DISCORD_BOT_TOKEN;
const GUILD_ID = process.env.GUILD_ID;

async function assignRole(discordId, event, action) {
  let roleId;

  if (event === "pull_request" && action === "closed") {
    roleId = process.env.ROLE_ID_PR;
  } else if (event === "issues" && action === "opened") {
    roleId = process.env.ROLE_ID_ISSUE;
  } else if (event === "push") {
    roleId = process.env.ROLE_ID_COMMIT;
  } else {
    console.log("❌ No role assigned for this event.");
    return;
  }

  const url = `https://discord.com/api/v10/guilds/${GUILD_ID}/members/${discordId}/roles/${roleId}`;
  const headers = { Authorization: `Bot ${DISCORD_BOT_TOKEN}`, "Content-Type": "application/json" };

  try {
    await axios.put(url, {}, { headers });
    console.log(`✅ Role ${roleId} assigned to Discord user: ${discordId}`);
  } catch (error) {
    console.error("❌ Error assigning role:", error.response?.data || error.message);
  }
}

module.exports = { assignRole };
