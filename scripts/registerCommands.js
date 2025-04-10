require('dotenv').config();
const {REST, Routes, SlashCommandBuilder} = require('discord.js');

const commands=[
  new SlashCommandBuilder().setName('verify').setDescription('Link your GitHub with Discord')
].map(cmd => cmd.toJSON());

const rest=new REST({version:'10'}).setToken(process.env.DISCORD_BOT_TOKEN);

rest.put(Routes.applicationCommands(process.env.DISCORD_CLIENT_ID), {body: commands})
  .then(()=>console.log('✅ Slash command registered'))
  .catch(console.error);
