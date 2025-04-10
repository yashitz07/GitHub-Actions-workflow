require('dotenv').config();
const express = require('express');
const axios = require('axios');
const { appendMappingToSheet } = require('../utils/googleSheets');

const app = express();
const PORT = process.env.PORT || 3000;

// Redirects user to GitHub OAuth with Discord ID stored in state param
app.get('/oauth', (req, res) => {
  const discord_id = req.query.discord_id;
  console.log(`🔗 Redirecting to GitHub OAuth for Discord ID: ${discord_id}`);
  if (!discord_id) {
    return res.status(400).send('❌ Missing Discord ID in query. Try again from the /verify command.');
  }

  const redirect_uri = `${process.env.BASE_URL}/oauth/callback`;

  const githubOAuthUrl = `https://github.com/login/oauth/authorize` +
    `?client_id=${process.env.GH_CLIENT_ID}` +
    `&redirect_uri=${encodeURIComponent(redirect_uri)}` +
    `&state=${discord_id}` +
    `&scope=read:user`;

  console.log(`🔗 Redirecting to GitHub OAuth for Discord ID: ${discord_id}`);
  res.redirect(githubOAuthUrl);
});

// GitHub redirects here after user logs in and authorizes
app.get('/oauth/callback', async (req, res) => {
  const code = req.query.code;
  const discord_id = req.query.state;

  if (!code || !discord_id) {
    return res.status(400).send("❌ Missing code or Discord ID (state). Cannot continue.");
  }

  try {
    console.log(`🎯 GitHub OAuth callback received for Discord ID: ${discord_id}`);

    // Exchange code for access token
    const tokenRes = await axios.post(`https://github.com/login/oauth/access_token`, {
      client_id: process.env.GH_CLIENT_ID,
      client_secret: process.env.GH_CLIENT_SECRET,
      code
    }, {
      headers: { 'Accept': 'application/json' }
    });

    const token = tokenRes.data.access_token;
    if (!token) throw new Error("Failed to retrieve GitHub token");

    // Fetch GitHub profile
    const userRes = await axios.get('https://api.github.com/user', {
      headers: { Authorization: `Bearer ${token}` }
    });

    const github_username = userRes.data.login;
    if (!github_username) throw new Error("GitHub user not found");

    // Append to Google Sheet
    await appendMappingToSheet(discord_id, github_username);
    console.log(`✅ Linked: ${github_username} → ${discord_id}`);

    // Respond to user
    res.send(`<h2>✅ You’ve successfully linked GitHub with Discord!</h2>`);

  } catch (error) {
    console.error("❌ Error during OAuth callback:", error);
    res.status(500).send("❌ An error occurred during GitHub OAuth process.");
  }
});

app.listen(PORT, () => {
  console.log(`🚀 OAuth server running at http://localhost:${PORT}`);
});
