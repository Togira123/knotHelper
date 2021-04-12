const Discord = require('discord.js')

module.exports = {
    name: 'lockdown',
    description: 'locks the whole server',
    modOnly: true,

    execute(message, args) {
        /**
         * 
         * @param {Discord.Message} message 
         * @param {Array<String>} args 
         */
        const lockdown = async(message, args) => {
            try {
                await message.guild.roles.everyone.setPermissions(['VIEW_CHANNEL', 'READ_MESSAGE_HISTORY']);
                message.guild.channels.cache.forEach(async c => {
                    if (c.type === 'text') {
                        await c.send('server lockdown! You will be notified when it\'s unlocked again!')
                    }
                })
                await message.channel.send('Server locked!!')
            } catch {
                message.channel.send('An error happened :(');
            }
        }
        lockdown(message, args);
    }
}