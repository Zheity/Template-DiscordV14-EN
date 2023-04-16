const { SlashCommandBuilder, EmbedBuilder } = require ('discord.js')

module.exports = {
    data: new SlashCommandBuilder()
    .setName('8ball')
    .setDescription('Ask the bot a question.')
    .addStringOption(option =>
        option.setName('question') 
        .setDescription('Question.')
        .setRequired(true)
    ),

    async execute (interaction, cliente) {

        const message = interaction.options.getString('question');

        const { user } = interaction;

        let respostas = ["Yes.", "No", "It is certain.", "Perhaps", "Obviously", "It is decidedly so.", "Without a doubt.", "Yes definelty.", "You may rely on it.", "As I see it, yes.", "Most likely.", "Outlook good.", "Signs point to yes.", "Reply hazy, try again.", "Ask again later.", "Better not tell you now...", "Cannot predict now.", "Concentrate and ask again.", "Don't count on it.", "My reply is no.", "I do not think so", "Of course", "Outlook not so good...", "Very doubtful.", "That is SuS"];

        const ball = new EmbedBuilder()
            .setColor("#c5a0c1")
            .setTitle("**:8ball: 8BALL**")
            .setFooter({ text: `Executed by: ${user.username}`, iconURL: user.displayAvatarURL({ dynamic: true })})
            .addFields({ name: "» Question:", value: ` ${message}`, inline: false})
            .addFields({ name: "» Answer:", value: ` ${respostas[( Math.floor(Math.random() * respostas.length))]}.`, inline: false})
            interaction.reply({ embeds : [ball] })

    }
}