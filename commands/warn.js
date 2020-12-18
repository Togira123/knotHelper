const Discord = require('discord.js')

module.exports = {
    name: 'warn',
    description: 'warn a user',
    args: true,
    execute(message, args) {
        const Warn = async (message, args) => {
            let user = message.mentions.users.first();
            if (!user) {
                user = `<@${args[0]}>`
            }
            const user1 = args.shift()
            const logUser = user1.replace(/<|>|!|@/g, '');
            

            const reason = args.join(' ')

            //mod log channel
            const modLog = message.client.channels.cache.get('788098283368611891')

            const WarnEmbed = new Discord.MessageEmbed()
                .setColor('#e0dc08')
                .setAuthor('User warned')
                .addFields(
                    {name: 'User', value: `<@${logUser}> - ${logUser}`, inline: true},
                    {name: 'Moderator', value: `<@${message.author.id}> - ${message.author.id}`, inline: true},
                    {name: 'Reason', value: reason}
                )
                .setTimestamp();
            
            await modLog.send(WarnEmbed)

            await message.channel.send(`${user} has been warned for **${reason}**`);
        }
        Warn(message, args)
    }

}