const { Client, MessageFlags } = require('discord.js');
const client = new Client({intents:['GUILDS', 'GUILD_MESSAGES', 'GUILD_MEMBERS', 'GUILD_PRESENCES']});

client.on('ready', () => {
    console.log(`${client.user.tag} is ready for ${client.users.cache.size}!`);
});

client.on('messageCreate', async (msg) => {
    let args = msg.content.trim().split(/ +/g);

    // * Counting
    if (msg.channel.id === process.env.COUNTING_THREAD_ID) {
        if (args.length > 1) return msg.delete();
        let oldMsgs = await msg.channel.messages.fetch({limit: 2});
        let priorMsg = parseInt(oldMsgs.last().content);
        if (priorMsg+1 !== parseInt(msg.content)) return msg.delete();
    };

    if (msg.content === 'kill kiki' && msg.author.id === '617839406199341067') {
        msg.channel.send('Killing process...');
        process.exit(0);
    };
});


client.login(process.env.BOT_TOKEN)