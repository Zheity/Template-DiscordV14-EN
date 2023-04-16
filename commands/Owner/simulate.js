const { SlashCommandBuilder, PermissionFlagsBits, EmbedBuilder } = require ('discord.js')

module.exports = {
    data: new SlashCommandBuilder()
    .setName('simulate')
    .setDescription('Simulated join or leave event')
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
    .addStringOption(option =>
        option.setName('options')
        .setDescription('Choose whether to join or leave')
        .setRequired(true)
        .addChoices(
            { name: 'Join', value: 'join' },
            { name: 'Leave', value: 'leave' },
        )
    ),

    async execute (interaction, client) {

        await interaction.deferReply({ ephemeral: true })

        const { options, user, member } = interaction

        const Options = options.getString("options")

        if (user.id !== "207320731263041536") return interaction.editReply({
            embeds: [
                new EmbedBuilder()
                .setDescription(`:warning: | This command is for Develepors only`)
                .setColor("#c5a0c1")
            ], 
        })

        switch (Options) {

            case "join": {

                interaction.editReply({
                    embeds: [
                        new EmbedBuilder()
                        .setDescription(`<a:right:1021723073487052810> | Simulated Join Event`)
                        .setColor("#c5a0c1")
                    ], 
                })

                client.emit("guildMemberAdd", member)

            }
                break;

            case "leave": {

                interaction.editReply({
                    embeds: [
                        new EmbedBuilder()
                        .setDescription(`<a:right:1021723073487052810> | Simulated Leave Event`)
                        .setColor("#c5a0c1")
                    ], 
                })

                client.emit("guildMemberRemove", member)

            }
                break;

        }

    }
}