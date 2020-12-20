const Discord = require('discord.js')

module.exports = {
    name: 'ban',
    description: 'bans a user',
    modOnly: true,
    args: true,
    execute(message, args) {
        const Kick = async (message, args) => {
            let user = message.mentions.users.first();
            if (!user) {
                user = `<@${args[0]}>`
            }
            const user1 = args.shift()
            const logUser = user1.replace(/<|>|!|@/g, '');

            let reason = args.join(' ')
            if (!reason.length) {
                reason = 'none'
            }

            let userBan = message.mentions.members.first()
            if (!userBan) {
                const user = await message.client.users.fetch(logUser)
                userBan = message.guild.member(user)
            }
            try {
                const staffList = ['424510595702718475', '598758042049314847', '229299825072537601', '224837900536250369']
                if (staffList.includes(userBan.id)) return;
                await userBan.ban(reason)
            } catch (error) {
                console.log(error)
                const channel = message.client.channels.cache.get('746047347783368754');
                await channel.send(`Error while trying ban...`)
                return;
            }

            //mod log channel
            const modLog = message.client.channels.cache.get('788098283368611891')

            const WarnEmbed = new Discord.MessageEmbed()
                .setColor('#b10003')
                .setAuthor('User banned')
                .addFields(
                    { name: 'User', value: `<@${logUser}> - ${logUser}`, inline: true },
                    { name: 'Moderator', value: `<@${message.author.id}> - ${message.author.id}`, inline: true },
                    { name: 'Reason', value: reason }
                )
                .setTimestamp();

            await modLog.send(WarnEmbed)

            await message.channel.send(`${user} has been banned for **${reason}**`);
        }
        Kick(message, args)
    }

}