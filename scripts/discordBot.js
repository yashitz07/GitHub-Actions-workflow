  // scripts/discordBot.js
  require('dotenv').config();
  const {Client, GatewayIntentBits, SlashCommandBuilder, REST, Routes, Events} = require('discord.js');
  const axios = require('axios'); 
  const { fetchGitHubStats } = require('../utils/githubStats');

  const client = new Client({
    intents: [
      GatewayIntentBits.Guilds,
      GatewayIntentBits.GuildMembers, 
    ]
  });
  
  client.once('ready',()=>console.log(`Bot ready as ${client.user.tag}`));

  client.on(Events.InteractionCreate, async interaction => {
    if (!interaction.isChatInputCommand()) return;

    if (interaction.commandName === 'verify') {
      const discordId = interaction.user.id;
      const url = `http://localhost:3000/oauth?discord_id=${discordId}`;
      try {
        await interaction.reply({
          content: `🔗 [Click here to verify GitHub account](${url})`,
          flags: 1 << 6, // ephemeral
        });
      } catch (err) {
        console.error("❌ Failed to reply to interaction:", err);
      }
    }
    if (interaction.commandName === 'contributions') {
      const discordTag = interaction.options.getString('username'); // e.g., yash#1234
      console.log("🔍 Discord Tag:", discordTag);
      await interaction.deferReply({ ephemeral: true });
    
      try {
        const headers = {
          Authorization: `Bot ${process.env.DISCORD_BOT_TOKEN}`
        };
        
        const guildId = process.env.GUILD_ID;
        const membersRes = await axios.get(
          `https://discord.com/api/v10/guilds/${guildId}/members?limit=1000`,
          { headers }
        );
    
        const matching = membersRes.data.find(
          m => m.user.username.toLowerCase() === discordTag.toLowerCase()
        );
      //  console.log("Members fetched:", membersRes.data.map(m => ${m.user.username}#${m.user.discriminator}));
        if (!matching) {
          await interaction.editReply("❌ Could not find a Discord user with that tag.");
          return;
        }
    
      const discordId = matching.user.id;
      console.log("🔍 Discord ID:", discordId);

      const { prs, issues, commits, githubUsername } = await fetchGitHubStats(discordId);
    
        const stats = `📊 **GitHub Contributions for \`${githubUsername}\` in RUXAILAB:**
    - 🛠️ PRs: ${prs}
    - 🐛 Issues: ${issues}
    - 💾 Commits: ${commits}`;
    
        await interaction.editReply({ content: stats });
      } catch (err) {
        console.error("❌ Error fetching stats:", err.message);
        await interaction.editReply("❌ Failed to fetch GitHub stats. Please check the username.");
      }
    }    
  });

  client.login(process.env.DISCORD_BOT_TOKEN);
