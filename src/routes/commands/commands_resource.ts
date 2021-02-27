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
        name: "Ban",
        tooltip:
            "Bans the specified user but does not delete their recent messages",
        quick: "-mod ban @Samoxive#1234 Spam | 3 days",
        description:
            "Bans the specified user, if additional text follows the identifier, " +
            "that text is used as the reason. To ban a user temporarily, you can specify " +
            'a duration by using the separator "|", and then typing the duration in full.',
        usages: [
            "-mod ban @user",
            "-mod ban @user <reason>",
            "-mod ban @user [reason] | <time>",
            "-mod ban <user_id> [reason] [| <time>]"
        ],
        examples: [
            "-mod ban @Samoxive#1234",
            "-mod ban @Samoxive#1234 Spamming",
            "-mod ban @Samoxive#1234 Posting invite links | 1 day",
            "-mod ban 145456746721312768"
        ]
    },
    {
        name: "Hardban",
        tooltip: "Bans the specified user and deletes their recent messages",
        quick: "-mod hardban @Samoxive#1234 Spam",
        description:
            "Bans the specified user, banning them and deleting every message they sent in the last week. " +
            "In addition, a reason may be provided.",
        usages: [
            "-mod hardban @user",
            "-mod hardban @user <reason>",
            "-mod hardban <user_id> [reason]"
        ],
        examples: [
            "-mod hardban @Samoxive#1234",
            "-mod hardban @Samoxive#1234 Spamming",
            "-mod hardban 145456746721312768 Bad Samoxive no cookie"
        ]
    },
    {
        name: "Kick",
        tooltip: "Kicks the specified user",
        quick: "-mod kick @Samoxive#1234 Advertisement",
        description:
            "Kicks the specified user, if additional text follows the identifier, " +
            "that text is used as the reason.",
        usages: [
            "-mod kick @user",
            "-mod kick @user <reason>",
            "-mod kick <user_id> [reason]"
        ],
        examples: [
            "-mod kick @Samoxive#1234",
            "-mod kick @Samoxive#1234 Breaking the rules",
            "-mod kick 145456746721312768"
        ]
    },
    {
        name: "Mute",
        tooltip: "Mutes the specified user",
        quick: "-mod mute @Samoxive#1234 Using profanity",
        description:
            "Mutes the specified user. While muted, a user cannot send messages in any text channel, or " +
            "use their microphone in any voice channel. If additional text follows the identifier, " +
            "that text is used as the reason. To mute a user temporarily, you can " +
            'specify the duration by using the separator "|", and then typing the duration in full.',
        usages: [
            "-mod mute @user",
            "-mod mute @user <reason>",
            "-mod mute @user [reason] | <time>",
            "-mod mute <user_id> [reason] [| <time>]"
        ],
        examples: [
            "-mod mute @Samoxive#1234",
            "-mod mute @Samoxive#1234 Spamming",
            "-mod mute @Samoxive#1234 Playing loud music | 6 hours",
            "-mod mute 145456746721312768 Spamming the chat"
        ]
    },
    {
        name: "Warn",
        tooltip: "Warns the specified user",
        quick: "-mod warn @Samoxive#1234 Harassing users",
        description:
            "Warns the specified user, sending them a direct message including the reason specified, if any. " +
            "Any text following the identifier is used as the reason.",
        usages: [
            "-mod warn @user",
            "-mod warn @user <reason>",
            "-mod warn <user_id> [reason]"
        ],
        examples: [
            "-mod warn @Samoxive#1234",
            "-mod warn @Samoxive#1234 Selfbots are not allowed",
            "-mod warn 145456746721312768"
        ]
    },
    {
        name: "Softban",
        tooltip:
            "Bans, then unbans, the specified user, deleting their recent messages",
        quick: "-mod softban @Samoxive#1234 Spamming nsfw pictures",
        description:
            "Bans the specified user, then unbans them afterwards, effectively kicking them. This deletes " +
            "the specified user's messages in the last 1-7 days, defaulting to those from the last 1 day. " +
            "If a text is given after the identifier, that text is used as the reason. To customise " +
            'the number of days from which to delete messages, you can use the separator "|", followed by a number.',
        usages: [
            "-mod softban @user",
            "-mod softban @user <reason>",
            "-mod softban @user [reason] | <number of days to delete messages>",
            "-mod softban <user_id> [reason] [| <number of days to delete messages>]"
        ],
        examples: [
            "-mod softban @Samoxive#1234",
            "-mod softban @Samoxive#1234 Spamming",
            "-mod softban @Samoxive#1234 Spamming | 3",
            "-mod softban 145456746721312768 | 6"
        ]
    },
    {
        name: "Server",
        tooltip: "Display information about the discord server",
        quick: "-mod server",
        description:
            "This command provides the creation date of the server, " +
            "the owner, member count and the available emoji.",
        usages: ["-mod server"],
        examples: ["-mod server"]
    },
    {
        name: "Invite",
        tooltip: "Display links to invite Jim and get support",
        quick: "-mod invite",
        description:
            "This command provides the link to invite Jim, and the support server link.",
        usages: ["-mod invite"],
        examples: ["-mod invite"]
    },
    {
        name: "Info",
        tooltip: "Display statistics about, and links related to, Jim",
        quick: "-mod info",
        description:
            "This command shows some statistics about Jim, including the uptime and diagnostics information, " +
            "as well as links to support Jim, invite Jim, and get support.",
        usages: ["-mod info"],
        examples: ["-mod info"]
    },
    {
        name: "Role",
        tooltip: "Create self-assignable roles",
        quick: "-mod role add AFK",
        description:
            "This command has multiple subcommands, you can use the subcommand `add` to create a new " +
            "self-assignable role, available for anyone to claim by using the command `Iam`. To add a role, a " +
            "role with the given name must exist. You can also use " +
            "the subcommand `remove` to make a role no longer self-assignable.",
        usages: ["-mod role add <role_name>", "-mod role remove <role_name>"],
        examples: ["-mod role add No-NSFW", "-mod role remove No-NSFW"]
    },
    {
        name: "Iam",
        tooltip: "Self-assigns a role",
        quick: "-mod iam AFK",
        description:
            "Self-assigns the specified role, the specified role must have been added " +
            "to the self-assignable roles list by an administrator who used the command `role add`.",
        usages: ["-mod iam <role_name>"],
        examples: ["-mod iam AFK"]
    },
    {
        name: "Ping",
        tooltip: "Pongs if Jim is alive",
        quick: "-mod ping",
        description:
            "This command is used to check if Jim is alive. If he is, he displays his websocket ping to the Discord API.",
        usages: ["-mod ping"],
        examples: ["-mod ping"]
    },
    {
        name: "Clean",
        tooltip: "Deletes messages in bulk",
        quick: "-mod clean 3",
        description:
            "Deletes the specified number of messages from the current channel. You may specialise the cleaning process " +
            "in two ways: By specifying the word `bot` after the amount, you can use Jim to clear only bot messages. Alternatively, " +
            "by specifying a user after the amount, you can use Jim to clear messages only from a certain user. This command will " +
            "not clear the original command message.",
        usages: [
            "-mod clean <number>",
            "-mod clean <number> bot",
            "-mod clean <number> @user",
            "-mod clean <number> <user_id>"
        ],
        examples: [
            "-mod clean 5",
            "-mod clean 2 bot",
            "-mod clean 10 @Samoxive#1234",
            "-mod clean 3 145456746721312768"
        ]
    },
    {
        name: "Remind",
        tooltip: "Sets a reminder for a date in the future",
        quick: "-mod remind Buy groceries",
        description:
            "Sets a reminder to send you a message after the specified amount of time, or one day if unspecified, " +
            "that contains the reminder you set. If private messages are blocked, " +
            "Jim will post the reminder in the channel in which it was set.",
        usages: ["-mod remind <message>", "-mod remind <message> | <time>"],
        examples: [
            "-mod remind Do the taxes",
            "-mod remind Ban that annoying guy | 3 hours"
        ]
    },
    {
        name: "Unban",
        tooltip: "Unbans the specified user",
        quick: "-mod unban Samoxive#1234",
        description: "Unbans the specified user.",
        usages: [
            "-mod unban @user",
            "-mod unban <username>",
            "-mod unban <user_id>"
        ],
        examples: [
            "-mod unban @Samoxive#1234",
            "-mod unban samox",
            "-mod unban 145456746721312768"
        ]
    },
    {
        name: "Unmute",
        tooltip: "Unmutes the specified user",
        quick: "-mod unban @Samoxive#1234",
        description:
            "Unmutes the specified user; removing the Muted role from them.",
        usages: [
            "-mod unmute @user",
            "-mod unmute <user_id>"
        ],
        examples: [
            "-mod unmute @Samoxive#1234",
            "-mod unmute 129819557115199488"
        ]
    },
    {
        name: "Tag",
        tooltip: "Creates, manages, and repeats textual shortcuts",
        quick: "-mod tag rule1",
        description:
            "When a tag name is given, Jim repeats the response associated with the name. You can use the subcommand `add` to " +
            "create a new tag, you can use the subcommand `remove` to delete an existing tag, or you can use the subcommand `edit` to " +
            "change the response associated with the given tag. To display all of the tags, " +
            "you can use the subcommand `list`.",
        usages: [
            "-mod tag list",
            "-mod tag <name>",
            "-mod tag add <name> <response>",
            "-mod tag edit <name> <response>",
            "-mod tag remove <name>"
        ],
        examples: [
            "-mod tag list",
            "-mod tag rule1",
            "-mod tag add rule1 No advertising.",
            "-mod tag edit rule1 No advertising without a moderator's permission.",
            "-mod tag remove rule1"
        ]
    }
];
