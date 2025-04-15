require('dotenv').config();
const {REST, Routes, SlashCommandBuilder} = require('discord.js');

const commands=[
  new SlashCommandBuilder().setName('verify').setDescription('Link your GitHub with Discord'),
  new SlashCommandBuilder().setName('contributions').setDescription('Get GitHub stats of a user via their Discord username').
  addStringOption(option =>
    option.setName('username')
      .setDescription('Discord username (e.g., yash#1234)')
      .setRequired(true)
  ),
].map(cmd => cmd.toJSON());

const rest=new REST({version:'10'}).setToken(process.env.DISCORD_BOT_TOKEN);

rest.put(Routes.applicationCommands(process.env.DISCORD_CLIENT_ID), {body: commands})
  .then(()=>console.log('✅ Slash commands registered: /verify, /contributions'))
  .catch(console.error);
