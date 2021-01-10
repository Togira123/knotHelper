module.exports = {
    name: 'role',
    description: 'gives you a role',
    args: true,
    everyone: true,
    execute(message, args) {
        const GiveRole = async () => {
            if (args[0] !== 'updates') {
                return message.channel.send('The only available role you can get righ now is `updates`')
            }
            const member = message.member
            const role = message.guild.roles.cache.find(r => r.name === args[0]);
            if (member.roles.cache.some(r => r.name === args[0])) {
                //if the user has the role remove it
                try {
                    await member.roles.remove(role);
                    message.channel.send(`Successfully removed the role ${args[0]}`)
                } catch {
                    message.channel.send('There was an error while trying to remove that role :c')
                }
            } else {
                //else give it to the user
                try {
                    member.roles.add(role)
                    message.channel.send(`Successfully gave you the role ${args[0]}`)
                } catch {
                    message.channel.send('There was an error while trying to give you that role :c')
                }
            }
        }
        GiveRole()
    }
}