const Discord = require('discord.js')
const database = require('../databases')

module.exports = {
    name: 'unmute',
    description: 'unmute a user',
    args: true,
    execute(message, args) {
        /**
         * 
         * @param {Discord.Message} message 
         * @param {*} args 
         */
        const Unmute = async (message, args) => {
            let user = message.mentions.users.first()
            if (!user) {
                user = `<@${args[0]}>`
            }
            const user1 = args.shift()
            const logUser = user1.replace(/<|>|!|@/g, '');

            let userUnmute = message.mentions.members.first()
            if (!userUnmute) {
                try {
                    const user = await message.client.users.fetch(logUser)
                    userUnmute = message.guild.member(user)
                } catch {
                    message.channel.send('User not found!')
                }
            }
            const reason = args.join(' ')
            if (!reason) {
                message.channel.send('Provide a reason');
                return;
            }

            //check if the user is muted
            const userFound = await database.Mutes.findOne({ where: { id: userUnmute.id } })
            if (!userFound) {
                message.channel.send('This user isn\'t muted!')
                return
            }
            await database.Mutes.destroy({ where: { id: userUnmute.id } })
            const guild = message.client.guilds.cache.get('740955923031523370')
            const userToUnmute = guild.member(userUnmute.id)
            const role = guild.roles.cache.find(role => role.name === 'muted');
            userToUnmute.roles.remove(role);

            const modLog = message.client.channels.cache.get('788098283368611891')

            const unmuteEmbed = new Discord.MessageEmbed()
                .setColor('#06ff2f')
                .setAuthor('User unmuted')
                .addFields(
                    { name: 'User', value: `<@${userUnmute.id}> - ${userUnmute.id}`, inline: true },
                    { name: 'Moderator', value: `<@${message.author.id}> - ${message.author.id}`, inline: true },
                    { name: 'Reason', value: reason }
                )
                .setTimestamp();

            await modLog.send(unmuteEmbed)
            await message.channel.send(`${user} has been unmuted!`);
            try {
                await userUnmute.send(`You have been unmuted in Knot Bot Support for the reason: ${reason}`)
            } catch {
                console.log(`Failed to send ${userUnmute.id} a mute DM!`)
            }
        }
        Unmute(message, args);
    }
}

