const database = require('../databases')
const Discord = require('discord.js')

module.exports = {
    name: 'bl',
    description: 'blacklist a word which will get auto-deleted when used.',
    execute(message, args) {
        const Bl = async (message, args) => {
            if (args[0] === 'add') {
                const exists = await database.BannedWords.findOne({ where: { word: args[1] } })
                if (exists) {
                    return message.channel.send('This word is already listed!')
                } try {
                    const addTheWord = await database.BannedWords.create({
                        word: args[1]
                    })
                    message.channel.send(`Successfully added the new word: ${args[1]}`)
                } catch {
                    return message.channel.send('Something went wrong :c')
                }
            } else if (args[0] === 'delete') {
                const exists = await database.BannedWords.findOne({ where: { word: args[1] } })
                if (!exists) {
                    return message.channel.send('You can\'t delete a non-existing word')
                } try {
                    await database.BannedWords.destroy({ where: { word: args[1] } })
                    message.channel.send(`Successfully deleted the word: ${args[1]}`)
                } catch {
                    return message.channel.send('Something went wrong :c')
                }
            } else if (!args.length) {
                const allWords = await database.BannedWords.findAll()
                const allListed = allWords.map(w => {
                    return w.word
                })
                const bannedWords = new Discord.MessageEmbed()
                    .setDescription(allListed.join(', '));
                await message.channel.send(bannedWords)
            }

        }
        Bl(message, args)
    }
}