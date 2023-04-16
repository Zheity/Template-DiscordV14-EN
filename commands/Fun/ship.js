const { SlashCommandBuilder, EmbedBuilder, AttachmentBuilder } = require ('discord.js')
const Canvas = require('canvas')
const block = "⬛";
const hearts = ":red_square:";

module.exports = {
    data: new SlashCommandBuilder()
    .setName('ship')
    .setDescription('Find out how much 2 people love each other!')
    .addUserOption(option =>
        option.setName('user')
        .setDescription('The first user.')
        .setRequired(true)
    )
    .addUserOption(option =>
        option.setName('user2')
        .setDescription('The second user.')
        .setRequired(true)
    ),
    async execute (interaction, client) {

        const user1 = interaction.options.getUser("user")
        const user2 = interaction.options.getUser("user2")

        const canvas = Canvas.createCanvas(700, 250)
        const ctx = canvas.getContext("2d")
    
        const bg = await Canvas.loadImage("https://cdn.discordapp.com/attachments/716216765448978504/858442843197669376/PElrfiWeuvQ.png")
        ctx.drawImage(bg, 0, 0, canvas.width, canvas.height)
    
        const avatar = await Canvas.loadImage(user1.displayAvatarURL({ extension: "png", size: 1024 }))
        ctx.save();
        ctx.beginPath();
        ctx.arc(200, 125, 95, 120, Math.PI * 2, true);
        ctx.lineWidth = 10
        ctx.strokeStyle = "#ffffff"
        ctx.stroke();
        ctx.clip();
        ctx.drawImage(avatar, 100, 25, 200, 200);
        ctx.restore();
    
        const TargetAvatar = await Canvas.loadImage(user2.displayAvatarURL({ extension: "png", size: 1024 }))
        ctx.save();
        ctx.beginPath();
        ctx.arc(500, 125, 95, 120, Math.PI * 2, true);
        ctx.lineWidth = 10
        ctx.strokeStyle = "#ffffff"
        ctx.stroke();
        ctx.clip();
        ctx.drawImage(TargetAvatar, 400, 25, 200, 200)
        ctx.restore();
    
        const heart = await Canvas.loadImage('https://cdn.discordapp.com/attachments/716216765448978504/858607217728159744/unknown.png')
        const broken = await Canvas.loadImage('https://cdn.discordapp.com/attachments/716216765448978504/858607537238179840/unknown.png')
        const random = Math.floor(Math.random() * 99) + 1

        const hearte = (random / 10)

        const str = `${hearts.repeat(hearte)}${block.repeat(11 - hearte)} ${random}%`;
    
        if(random >= 50) {
            ctx.drawImage(heart, 275, 60, 150, 150)
            const attachment = new AttachmentBuilder(canvas.toBuffer(), { name: 'love.png'})
            const embed = new EmbedBuilder()
            .setTitle('💓 **__Looks like love is in the air__** 💓')
            .addFields(
                { name: `User 1`, value: `****${user1}****`, inline: true },
                { name: `User 2`, value: `****${user2}****`, inline: true  },
                { name: `**Ship Meter**`, value: `${str}` },
                )
            .setImage(`attachment://love.png`)
            .setColor("Green")
            return  interaction.reply({ embeds: [embed], files: [attachment] })
    
        } else {
            ctx.drawImage(broken, 275, 60, 150, 150)
            const attachment = new AttachmentBuilder(canvas.toBuffer(), { name: 'broken.png'})
            const embed = new EmbedBuilder()
            .setTitle("💓 **__looks like you weren't made for each other__** 💓")
            .addFields(
                { name: `User 1`, value: `****${user1}****`, inline: true },
                { name: `User 2`, value: `****${user2}****`, inline: true  },
                { name: `**Ship Meter**`, value: `${str}` },
                )
            .setImage(`attachment://broken.png`)
            .setColor("Red")
            return  interaction.reply({ embeds: [embed], files: [attachment] })
    
        }   

    }
}