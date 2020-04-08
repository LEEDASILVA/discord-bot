const Discord = require('discord.js')
const bot = new Discord.Client()

// The ready event is vital, it means that only _after_ this
//will your bot start reacting to information received from Discord
bot.on('ready', () => {
  console.log('I am ready!')
})

client.on('message', (message) => {
  // Ignore messages that aren't from a guild
  if (!message.guild) return

  // If the message content starts with "!kick"
  if (message.content.startsWith('--kick')) {
    // Assuming we mention someone in the message, this will return the user
    // Read more about mentions over at https://discord.js.org/#/docs/main/master/class/MessageMentions
    const user = message.mentions.users.first()
    // If we have a user mentioned
    if (user) {
      // Now we get the member from the user
      const member = message.guild.member(user)
      // If the member is in the guild
      if (member) {
        // Kick the member
        // Make sure you run this on a member, not a user!
        // There are big differences between a user and a member
        member
          .kick('Optional reason that will display in the audit logs')
          .then(() => {
            // We let the message author know we were able to kick the person
            message.reply(`${user.tag} is kicked!`)
          })
          .catch((err) => {
            // An error happened
            // This is generally due to the bot not being able to kick the member,
            // either due to missing permissions or role hierarchy
            message.reply('I was unable to kick the member')
            // Log the error
            console.error(err)
          })
      } else {
        // The mentioned user isn't in this guild
        message.reply("That user isn't in this guild!")
      }
      // Otherwise, if no user was mentioned
    } else {
      message.reply("who do you what me to kick?!")
    }
  }
})

// Create an event listener for new guild members
client.on('guildMemberAdd', (member) => {
  // Send the message to a designated channel on a server:
  const channel = member.guild.channels.cache.find(
    (ch) => ch.name === 'member-log'
  )
  // Do nothing if the channel wasn't found on this server
  if (!channel) return
  // Send the message, mentioning the member
  channel.send(`Welcome to the server, ${member}`)
})

// Create an event listener for messages
bot.on('message', (message) => {
  if (message.content.includes('ping')) {
    // message.reply('pong')
    message.channel.send('pong!!!')
  }
  // If the message is "what is my avatar"
  if (message.content.includes('my avatar')) {
    // Send the user's avatar URL
    message.reply(message.author.displayAvatarURL())
  }
  // create the attachment in the message channel with a content
  if (message.content.includes('!rip')) {
    const attachment = new MessageAttachment('https://i.imgur.com/w3duR07.png')
    message.channel.send(attachment)
  }
})

bot.login('your-token!!!')
