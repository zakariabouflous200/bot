const { Client, GatewayIntentBits, PermissionsBitField } = require('discord.js');
const client = new Client({ 
    intents: [
        GatewayIntentBits.Guilds, 
        GatewayIntentBits.GuildMembers, 
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildMessages
    ] 
});

const token = 'MTI1NDg2MTA0ODM0ODE0NzcxMg.GmvYL9.SFn2WuhUpDRUXOgQzWOec71OTllbzmfIhRgY6k';
const guildId = '1250154483141574789';

client.once('ready', () => {
    console.log('Bot is ready!');
});

client.on('messageCreate', async message => {
    if (message.content.startsWith('!invite')) {
        const args = message.content.split(' ');
        const userId = args[1];

        if (!userId) {
            return message.reply('Please provide a user ID.');
        }

        try {
            const guild = await client.guilds.fetch(guildId);
            const user = await client.users.fetch(userId);

            if (!guild) {
                return message.reply('Guild not found.');
            }

            const invite = await guild.invites.create(guild.channels.cache.first(), {
                maxAge: 0, // Permanent invite
                maxUses: 1, // Only one use
            });

            await user.send(`** Rejoins notre serveur Discord ! Viens discuter, partager et t'amuser avec une communauté passionnée. Clique sur le lien et fais partie de l'aventure !**: ${invite.url}`);
            message.reply(`Invitation sent to ${user.tag}.`);
        } catch (error) {
            console.error(error);
            message.reply('Failed to send an invite. Please ensure the user ID is correct and the bot has sufficient permissions.');
        }
    }
});

client.login(token);
