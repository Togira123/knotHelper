const Discord = require('discord.js');
const config = require('./config.json')
const fs = require('fs');
const { Op } = require('sequelize')
const database = require('./databases')



const client = new Discord.Client({ presence: { activity: { type: 'WATCHING', name: 'Knot Bot Support' } } })
client.commands = new Discord.Collection();

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    client.commands.set(command.name, command);
}

function sleep(ms) {
    return new Promise((resolve) => {
        setTimeout(resolve, ms);
    });
}

client.once('ready', () => {
    const channel = client.channels.cache.get('746047347783368754');
    //channel.send('I am online')
    console.log(Date.now())

    const LoopFunction = async () => {

        while (true) {
            const findAllRows = await database.Mutes.findAll()
            findAllRows.forEach(async p => {
                if (Date.now() > p.time) {
                    await database.Mutes.destroy({ where: { id: p.id } })
                    const guild = client.guilds.cache.get('740955923031523370')
                    const userMute = guild.member(p.id)
                    const role = guild.roles.cache.find(role => role.name === 'muted');
                    userMute.roles.remove(role);

                    const modLog = client.channels.cache.get('788098283368611891')

                    const muteEmbed = new Discord.MessageEmbed()
                        .setColor('#06ff2f')
                        .setAuthor('User unmuted')
                        .addFields(
                            { name: 'User', value: `<@${p.id}> - ${p.id}`, inline: true },
                            { name: 'Moderator', value: `<@${p.moderator}> - ${p.moderator}`, inline: true },
                        )
                        .setTimestamp();

                    await modLog.send(muteEmbed)
                }
            })
            console.log('done')
            await sleep(30000)
        }
    }
    LoopFunction()
})

const modList = ['424510595702718475', '598758042049314847', '229299825072537601']
const helperList = ['224837900536250369']


client.on('message', message => {
    if (!modList.includes(message.author.id) && !helperList.includes(message.author.id)) return;
    const args = message.content.slice(config.prefix.length).trim().split(' ');
    const commandName = args.shift().toLowerCase();

    if (!client.commands.has(commandName)) return;

    const command = client.commands.get(commandName);

    if (command.modOnly) {
        if (!modList.includes(message.author.id)) return;
    }

    if (command.args && !args.length) {
        const channel = client.channels.cache.get('746047347783368754');
        channel.send(`<@${message.author.id}> provide arguments :)`)
        return;
    }

    try {
        command.execute(message, args);
    } catch (error) {
        const channel = client.channels.cache.get('746047347783368754');
        channel.send(`Error while trying to execute ${commandName}...`)
    }
})













client.login(config.token)