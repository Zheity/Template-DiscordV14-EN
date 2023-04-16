const { Client, SlashCommandBuilder } = require('discord.js')
const figlet = require('figlet')

module.exports = {
    data: new SlashCommandBuilder()  
    .setName('ascii')
    .setDescription('Generate asci.')
    .addStringOption(option =>
        option.setName('text')
        .setDescription('The text to make ascii')
        .setRequired(true)
    ),

    /**
     * @param {Client} client
     */

    async execute(interaction, client) {

        const text = interaction.options.getString("text");

        figlet.text(text, (err, data) => {
            if (err) return console.log(err)
            if (data.length > 2000) return interaction.reply({ content: "Please provide a text shorter than 2000 characters!", ephemeral: true })
            interaction.reply({ content: '```\n' + data + '```' })
        })

    }
}