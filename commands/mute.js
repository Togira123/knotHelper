const Discord = require('discord.js')
const database = require('../databases')

module.exports = {
    name: 'mute',
    description: 'mute a user',
    args: true,
    execute(message, args) {
        const Mute = async (message, args) => {
            let user = message.mentions.users.first();
            if (!user) {
                user = `<@${args[0]}>`
            }
            const user1 = args.shift()
            const logUser = user1.replace(/<|>|!|@/g, '');

            const time = args[0]
            args.shift()

            let helpTime;

            let userMute = message.mentions.members.first()
            if (!userMute) {
                const user = message.client.users.cache.get(logUser)
                userMute = message.guild.member(user)
            }
            let timeType;
            let userDM;
            try {
                const role = message.guild.roles.cache.find(role => role.name === 'muted');
                userMute.roles.add(role);
                let inMS;
                if (time.endsWith('s') || time.endsWith('S')) {
                    const amount = time.replace(/S|s/g, '')
                    helpTime = Number(amount)
                    inMS = Number(amount) * 1000
                    timeType = 'seconds'
                } else if (time.endsWith('m') || time.endsWith('M')) {
                    const amount = time.replace(/M|m/g, '')
                    helpTime = Number(amount)
                    inMS = Number(amount) * 60000
                    timeType = 'minutes'
                } else if (time.endsWith('h') || time.endsWith('H')) {
                    const amount = time.replace(/H|h/g, '')
                    helpTime = Number(amount)
                    inMS = Number(amount) * 3600000
                    timeType = 'hours'
                } else if (time.endsWith('d') || time.endsWith('D')) {
                    const amount = time.replace(/D|d/g, '')
                    helpTime = Number(amount)
                    inMS = Number(amount) * 86400000
                    timeType = 'days'
                }
                userDM = message.client.users.cache.get(userMute.id)
                const isMuted = await database.Mutes.findOne({ where: { id: userMute.id } })
                if (isMuted) {
                    return message.channel.send('User is already muted!')
                } else {
                    const timeToWait = Number(Date.now() + inMS)
                    await database.Mutes.create({
                        id: userMute.id,
                        time: timeToWait,
                        moderator: message.author.id
                    });
                }



            } catch (error) {
                console.log(error)
                const channel = message.client.channels.cache.get('746047347783368754');
                await channel.send(`Error while trying to mute...`)
                return;
            }

            const reason = args.join(' ')

            //mod log channel
            const modLog = message.client.channels.cache.get('788098283368611891')

            const muteEmbed = new Discord.MessageEmbed()
                .setColor('#4b4949')
                .setAuthor('User muted')
                .addFields(
                    { name: 'User', value: `<@${logUser}> - ${logUser}`, inline: true },
                    { name: 'Moderator', value: `<@${message.author.id}> - ${message.author.id}`, inline: true },
                    { name: 'Time', value: `${helpTime} ${timeType}` },
                    { name: 'Reason', value: `${reason}` }
                )
                .setTimestamp();

            await modLog.send(muteEmbed)
            await message.channel.send(`${user} has been muted for **${helpTime} ${timeType}**`);
            try {
                await userDM.send(`You have been muted in Knot Bot Support for ${helpTime} ${timeType}.
Reason: ${reason}`)
            } catch {
                console.log(`Failed to send ${userDM.id} a mute DM!`)
            }
        }
        Mute(message, args)
    }

}