interface Command {
    name: string;
    tooltip: string;
    quick: string;
    description: string;
    usages: string[];
    examples: string[];
}

export const commands: Command[] = [
    {
        name: 'Ban',
        tooltip: 'Bans specified user',
        quick: '-mod ban @Samoxive#1234 Spam | 3 days',
        description: 'Bans the mentioned user, if a text is given after the mention, ' +
            'that text is used as the ban reason. To ban a user temporarily, you can specify ' +
            'the ban duration by using the seperator "|" and typing the duration after.',
        usages: [
            '-mod ban @user',
            '-mod ban @user <reason>',
            '-mod ban @user <reason> | <time>'
        ],
        examples: [
            '-mod ban @Samoxive#1234',
            '-mod ban @Samoxive#1234 Spamming',
            '-mod ban @Samoxive#1234 Messaging invite links | 1 day'
        ]
    },
    {
        name: 'Kick',
        tooltip: 'Kicks specified user',
        quick: '-mod kick @Samoxive#1234 Advertisement',
        description: 'Kicks the mentioned user, if a text is given after the mention, ' +
            'that text is used as the kick reason.',
        usages: [
            '-mod kick @user',
            '-mod kick @user <reason>'
        ],
        examples: [
            '-mod kick @Samoxive#1234',
            '-mod kick @Samoxive#1234 Not abiding by the rules'
        ]
    },
    {
        name: 'Mute',
        tooltip: 'Mutes specified user',
        quick: '-mod mute @Samoxive#1234 Using profanity',
        description: 'Mutes the mentioned user, this means user can\'t send messages in text channels, ' +
            'they can\'t use their microphone in voice channels while they are muted. If a text is given ' +
            'after the mention, that text is used as the kick reason. To mute a user temporarily, you can ' +
            'specify the mute duraction by using the seperator "|" and typing the duration after.',
        usages: [
            '-mod mute @user',
            '-mod mute @user <reason>',
            '-mod mute @user <reason> | <time>',
        ],
        examples: [
            '-mod mute @Samoxive#1234',
            '-mod mute @Samoxive#1234 Spamming',
            '-mod mute @Samoxive#1234 Playing loud music | 6 hours'
        ]
    },
    {
        name: 'Warn',
        tooltip: 'Warns the specified user',
        quick: '-mod warn @Samoxive#1234 Harassing users',
        description: 'Warns the mentioned user, sending them a direct message that explains why they ' +
            'received a warning (you can customize it by specifying a reason). If a text is given after ' +
            'the mention, that text is used as the warning reason.',
        usages: [
            '-mod warn @user',
            '-mod warn @user <reason>',
        ],
        examples: [
            '-mod warn @Samoxive#1234',
            '-mod warn @Samoxive#1234 Selfbots are not allowed'
        ],
    },
    {
        name: 'Softban',
        tooltip: 'Softbans the specified user',
        quick: '-mod softban @Samoxive#1234 Spamming nsfw pictures',
        description: 'Softbans the mentioned user, banning and unbanning them afterwards. This deletes ' +
            'the specified user\'s messages in the last x days (x is 1 by default, can be 7 at maximum). ' +
            'If a text is given after the mention, that text is used as the softban reason. To customize ' +
            'the day count of messages deleted, you can use the "|" seperator and specify the number afterwards.',
        usages: [
            '-mod softban @user',
            '-mod softban @user <reason>',
            '-mod softban @user <reason> | <number of days to delete messages>',
        ],
        examples: [
            '-mod softban @Samoxive#1234',
            '-mod softban @Samoxive#1234 Spamming',
            '-mod softban @Samoxive#1234 Spamming | 3'
        ]
    },
    {
        name: 'Settings',
        tooltip: 'Modify or view server specific settings',
        quick: '-mod settings set InviteLinkRemover enabled',
        description: 'This command has multiple subcommands, to view current state of server wide settings, ' +
            'use the `display` subcommand. To change settings, you can use the subcommand `set` with the relevant ' +
            'setting key. To view the setting keys you can use and the possible values for them, use the `list` command. ' +
            'You can also use the subcommand `reset` with no arguments to revert every setting to the default values.',
        usages: [
            '-mod settings display',
            '-mod settings list',
            '-mod settings set <setting key> <value>',
            '-mod settings reset'
        ],
        examples: [
            '-mod settings display',
            '-mod settings list',
            '-mod settings set Prefix -jim',
            '-mod settings reset'
        ]
    },
    {
        name: 'Server',
        tooltip: 'Display information about the current server',
        quick: '-mod server',
        description: 'By using this command, you can view the creation date of the server, ' +
            'the owner, member count and the emojis available.',
        usages: [
            '-mod server'
        ],
        examples: [
            '-mod server'
        ]
    },
    {
        name: 'Role',
        tooltip: 'Create self-assignable roles',
        quick: '-mod role add AFK',
        description: 'This command has multiple subcommands, you can use the `add` subcommand to create a new ' +
            'self-assignable role, available for every to self-assign via the `Iam` command. To add a role, a ' +
            'role with given name must exist. You can also use ' +
            'the `remove` subcommand to get rid of a self-assignable role.',
        usages: [
            '-mod role add <roleName>',
            '-mod role remove <roleName>'
        ],
        examples: [
            '-mod role add No-NSFW',
            '-mod role remove No-NSFW'
        ]
    },
    {
        name: 'Ping',
        tooltip: 'Pongs if Jim is alive',
        quick: '-mod ping',
        description: 'This command is used to check if Jim is alive, it also displays websocket ping to the Discord API.',
        usages: [
            '-mod ping'
        ],
        examples: [
            '-mod ping'
        ]
    },
    {
        name: 'Clean',
        tooltip: 'Bulk deletes messages',
        quick: '-mod clean 3',
        description: 'Cleans amount of messages specified by the user, moderators can use two more methods to specialize the ' +
            'cleaning process. By specifying the word `bot` after the amount, you can use Jim to clear only bot messages. By sp' +
            'ecifying a user mention after the amount, you can use Jim to clear messages only from a certain user. This command will ' +
            'never clear the original command message.',
        usages: [
            '-mod clean <number>',
            '-mod clean <number> bot',
            '-mod clean <number> @user'
        ],
        examples: [
            '-mod clean 5',
            '-mod clean 2 bot',
            '-mod clean 10 @Samoxive#1234'
        ]
    },
    {
        name: 'Remind',
        tooltip: 'Sets a reminder for a future date',
        quick: '-mod remind Buy groceries',
        description: 'Sets a reminder to send you a message after the specified amount of time (if unspecified, it defaults to a day) ' +
            'that contains the specified piece of message. If private messages are blocked, ' +
            'Jim will remind in the channel reminder was set in.',
        usages: [
            '-mod remind <message>',
            '-mod remind <message> | <time>'
        ],
        examples: [
            '-mod remind Do the taxes',
            '-mod remind Ban that annoying guy | 3 hours'
        ]
    },
    {
        name: 'Unban',
        tooltip: 'Unbans specified user',
        quick: '-mod unban Samoxive#1234',
        description: 'Unbans the specified user, due to limitiations of discord, ' +
            'a name and discriminator is needed instead of a user mention.',
        usages: [
            '-mod unban user#discriminator',
        ],
        examples: [
            '-mod unban Samoxive#1234'
        ]
    },
    {
        name: 'Unmute',
        tooltip: 'Unmutes specified user',
        quick: '-mod unban @Samoxive#1234',
        description: 'Unmutes specified user, removing the Muted role from them.',
        usages: [
            '-mod unmute @user'
        ],
        examples: [
            '-mod unmute @Samoxive#1234'
        ]
    },
    {
        name: 'Tag',
        tooltip: 'Makes Jim repeat a pre-created response',
        quick: '-mod tag rule1',
        description: 'When a tag name is given, Jim repeats the response associated with the name. You can use the subcommand `add` to ' +
            'create a new tag, you can use the subcommand `remove` to delete an existing tag, you can use the subcommand `edit` to ' +
            'change the response that the given tag name is associated with. To display the existing tag names, ' +
            'you can use the subcommand `list`.',
        usages: [
            '-mod tag list',
            '-mod tag <name>',
            '-mod add <name> <response>',
            '-mod edit <name> <response>',
            '-mod remove <name>'
        ],
        examples: [
            '-mod tag list',
            '-mod tag rule1',
            '-mod tag add rule1 No advertising.',
            '-mod tag edit rule1 No advertising unless a permission is given by the moderators.',
            '-mod tag remove rule1'
        ]
    }
];
