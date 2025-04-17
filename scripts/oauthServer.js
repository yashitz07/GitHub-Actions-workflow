require('dotenv').config();
const express = require('express');
const axios = require('axios');
const { setMapping, getDiscordUsername } = require('../utils/firestore');

const app = express();
const PORT = process.env.PORT || 3000;

app.get('/oauth', async (req, res) => {
  const discord_id = req.query.discord_id;
  if (!discord_id) {
    return res.status(400).send('❌ Missing Discord ID in query. Try again from the /verify command.');
  }

  const discordUser = await getDiscordUsername(discord_id);
  const redirect_uri = `${process.env.BASE_URL}/oauth/callback`;
  const githubOAuthUrl =
    `https://github.com/login/oauth/authorize` +
    `?client_id=${process.env.GH_CLIENT_ID}` +
    `&redirect_uri=${encodeURIComponent(redirect_uri)}` +
    `&state=${discord_id}` +
    `&scope=read:user`;

  console.log(`🔗 Redirecting Discord user: ${discordUser} → GitHub OAuth`);
  res.redirect(githubOAuthUrl);
});

app.get('/oauth/callback', async (req, res) => {
  const code = req.query.code;
  const discord_id = req.query.state;

  if (!code || !discord_id) {
    return res.status(400).send("❌ Missing code or Discord ID (state). Cannot continue.");
  }

  try {
    const discordUser = await getDiscordUsername(discord_id);
    console.log(`🎯 OAuth callback received for Discord user: ${discordUser}`);

    const tokenRes = await axios.post(`https://github.com/login/oauth/access_token`, {
      client_id: process.env.GH_CLIENT_ID,
      client_secret: process.env.GH_CLIENT_SECRET,
      code,
    }, {
      headers: { 'Accept': 'application/json' }
    });

    const token = tokenRes.data.access_token;
    if (!token) throw new Error("Failed to retrieve GitHub token");

    const userRes = await axios.get('https://api.github.com/user', {
      headers: { Authorization: `Bearer ${token}` }
    });

    const github_username = userRes.data.login;
    if (!github_username) throw new Error("GitHub user not found");

    await setMapping(discord_id, github_username);
    console.log(`✅ Linked: ${discordUser} (Discord user) ←→ ${github_username} (GitHub user)`);

    res.send(`<h2>✅ GitHub <code>${github_username}</code> successfully linked with Discord <code>${discordUser}</code></h2>`);
  } catch (error) {
    console.error("❌ Error during OAuth callback:", error);
    res.status(500).send("❌ An error occurred during GitHub OAuth process.");
  }
});

app.listen(PORT, () => {
  console.log(`🚀 OAuth server running at http://localhost:${PORT}`);
});
