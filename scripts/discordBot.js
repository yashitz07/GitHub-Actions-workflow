// scripts/discordBot.js
require('dotenv').config();
const {Client, GatewayIntentBits, SlashCommandBuilder, REST, Routes, Events} = require('discord.js');

const client=new Client({intents:[GatewayIntentBits.Guilds]});

client.once('ready',()=>console.log(`Bot ready as ${client.user.tag}`));

client.on(Events.InteractionCreate, async interaction => {
  if (!interaction.isChatInputCommand()) return;
  if (interaction.commandName === 'verify') {
    const discordId = interaction.user.id;
    const url = `http://localhost:3000/oauth?discord_id=${discordId}`;
    try {
      await interaction.reply({
        content: `🔗 [Click here to verify GitHub account](${url})`,
        ephemeral: true,
      });
    } catch (err) {
      console.error("❌ Failed to reply to interaction:", err);
    }
    //await interaction.reply({content: `🔗 [Click here to verify GitHub account](${url})`, ephemeral:true});
  }
});

client.login(process.env.DISCORD_BOT_TOKEN);
