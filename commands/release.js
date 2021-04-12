const Discord = require('discord.js')

module.exports = {
    name: 'release',
    description: 'release the whole server from lockdown',
    modOnly: true,

    execute(message, args) {
        /**
         * 
         * @param {Discord.Message} message 
         * @param {Array<String>} args 
         */
        const release = async(message, args) => {
            try {
                await message.guild.roles.everyone.setPermissions(
                    [
                        'VIEW_CHANNEL',
                        'CREATE_INSTANT_INVITE',
                        'CHANGE_NICKNAME',
                        'SEND_MESSAGES',
                        'EMBED_LINKS',
                        'ATTACH_FILES',
                        'ADD_REACTIONS',
                        'USE_EXTERNAL_EMOJIS',
                        'READ_MESSAGE_HISTORY',
                        'CONNECT',
                        'SPEAK',
                        'STREAM',
                        'USE_VAD',
                    ]
                );
                message.guild.channels.cache.forEach(async c => {
                    if (c.type === 'text') {
                        await c.send('server is open again!')
                    }
                })
                await message.channel.send('Server released!!')
            } catch {
                message.channel.send('An error happened :(');
            }
        }
        release(message, args);
    }
}