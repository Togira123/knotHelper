const Discord = require('discord.js')

module.exports = {
    name: 'lockdown',
    description: 'locks the whole server',
    modOnly: true,
    args: true,

    execute(message, args) {
        /**
         * 
         * @param {Discord.Message} message 
         * @param {Array<String>} args 
         */
        const lockdown = async(message, args) => {
            await message.guild.roles.everyone.setPermissions([]);
        }
        lockdown(message, args);
    }
}