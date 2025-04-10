const axios = require("axios");

const DISCORD_BOT_TOKEN = process.env.DISCORD_BOT_TOKEN;
const GUILD_ID = process.env.GUILD_ID;

async function assignRole(discordId, event, action) {
  let roleId, roleName;

  if (event === "pull_request" && action === "closed") {
    roleId = process.env.ROLE_ID_PR;
    roleName = "PR raised";
  } else if (event === "issues" && action === "opened") {
    roleId = process.env.ROLE_ID_ISSUE;
    roleName = "issue opened";
  } else if (event === "push") {
    roleId = process.env.ROLE_ID_COMMIT;
    roleName = "Commit Pushed";
  } else {
    console.log(" No role assigned for this event.");
    return;
  }

  const roleUrl = `https://discord.com/api/v10/guilds/${GUILD_ID}/members/${discordId}/roles/${roleId}`;
  const userUrl = `https://discord.com/api/v10/users/${discordId}`;
  const headers = { Authorization: `Bot ${DISCORD_BOT_TOKEN}`, "Content-Type": "application/json" };

  try {
    const userRes = await axios.get(userUrl, { headers });
    const discordUsername = userRes.data.username + "#" + userRes.data.discriminator;

    await axios.put(roleUrl, {}, { headers });
    console.log(`✅ Role "${roleName}" assigned to Discord user: ${discordUsername} (${discordId})`);
  } catch (error) {
    console.error("❌ Error assigning role:", error.response?.data || error.message);
  }
}

module.exports = { assignRole };
