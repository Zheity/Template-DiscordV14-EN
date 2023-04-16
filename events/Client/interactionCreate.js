const { Interaction, EmbedBuilder, WebhookClient } = require("discord.js");
const { inspect } = require("util");
const config = require('../../config/config.json')
const webhook = new WebhookClient({ url: config.Logs_Error });

module.exports = {
    name: 'interactionCreate',
    async execute(interaction, client) {

        if (!interaction.isCommand()) return;

        const command = client.commands.get(interaction.commandName);

        if (!command) return
        
        try{

            await command.execute(interaction, client);
            
        }catch (error) {
            console.log(error);
            await interaction.reply({
                content: 'There was an error while executing this command!', 
                ephemeral: true
            });

            const embed = new EmbedBuilder()
            .setTitle("Discord API Error")
            .setColor("Red")
            .setURL("https://discordjs.guide/popular-topics/errors.html#api-errors")
            .setDescription(`\`\`\`${inspect(error, { depth: 0 }).slice(0, 1000)}\`\`\``)
            .setTimestamp();

        await webhook.send({ embeds: [embed] });

        }

    },

};