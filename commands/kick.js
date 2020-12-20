const Discord = require('discord.js')

module.exports = {
    name: 'kick',
    description: 'kick a user',
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
            console.log(logUser)

            let reason = args.join(' ')
            if (!reason.length) {
                reason = 'none'
            }

            let userKick = message.mentions.members.first()
            if (!userKick) {
                const user = await message.client.users.fetch(logUser)
                userKick = message.guild.member(user)
            }
            try {
                const staffList = ['424510595702718475', '598758042049314847', '229299825072537601', '224837900536250369']
                if (staffList.includes(userKick.id)) return;
                await userKick.kick(reason)
            } catch (error) {
                console.log(error)
                const channel = message.client.channels.cache.get('746047347783368754');
                await channel.send(`Error while trying to kick...`)
                return;
            }

            //mod log channel
            const modLog = message.client.channels.cache.get('788098283368611891')

            const WarnEmbed = new Discord.MessageEmbed()
                .setColor('#dd0280')
                .setAuthor('User kicked')
                .addFields(
                    { name: 'User', value: `<@${logUser}> - ${logUser}`, inline: true },
                    { name: 'Moderator', value: `<@${message.author.id}> - ${message.author.id}`, inline: true },
                    { name: 'Reason', value: reason }
                )
                .setTimestamp();

            await modLog.send(WarnEmbed)

            await message.channel.send(`${user} has been kicked for **${reason}**`);
        }
        Kick(message, args)
    }

}