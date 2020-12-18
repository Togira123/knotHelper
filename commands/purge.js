const Discord = require('discord.js')

module.exports = {
    name: 'purge',
    description: 'purge a certain amount of users',
    args: true,
    execute(message, args) {
        const Purge = async (message, args) => {
            const count = Number(args[0])
            await message.channel.bulkDelete(count)
                .then(m => message.channel.send(`deleted ${m.size} messages!`))
                .catch(e => message.channel.send('Failed to delete'));

            const modLog = message.client.channels.cache.get('788098283368611891')

            const WarnEmbed = new Discord.MessageEmbed()
                .setColor('#2d6b09')
                .setAuthor('Messages purged')
                .addFields(
                    { name: 'Channel', value: `#${message.channel.name} - ${message.channel.id}`, inline: true },
                    { name: 'Moderator', value: `<@${message.author.id}> - ${message.author.id}`, inline: true },
                    { name: 'Amount', value: count }
                )
                .setTimestamp();

            await modLog.send(WarnEmbed)
        }
        Purge(message, args)
    }

}




