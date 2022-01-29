interface SlashCommandParameter {
    name: string;
    optional: boolean;
    description: string;
    example: string;
}

interface SlashCommand {
    name: string;
    tooltip: string; // rename to description
    parameters: Array<SlashCommandParameter>;
}

export const slashCommands: SlashCommand[] = [
    {
        name: "/ban",
        tooltip:
            "Bans the specified user but does not delete their recent messages",
        parameters: [
            {
                name: "user",
                optional: false,
                description: "target user to ban",
                example: "Samoxive#8634",
            },
            {
                name: "reason",
                optional: true,
                description: "reason for the ban",
                example: "bad behavior",
            },
            {
                name: "duration",
                optional: true,
                description: "duration for the ban",
                example: "3 days",
            },
        ],
    },
    {
        name: "/clean",
        tooltip: "Deletes messages in bulk",
        parameters: [
            {
                name: "number",
                optional: false,
                description: "number of messages to delete",
                example: "42",
            },
        ],
    },
    {
        name: "/clean-bot",
        tooltip: "Deletes only bot messages in bulk",
        parameters: [
            {
                name: "number",
                optional: false,
                description: "number of messages to delete",
                example: "42",
            },
        ],
    },
    {
        name: "/clean-user",
        tooltip: "Deletes only messages of specified user in bulk",
        parameters: [
            {
                name: "number",
                optional: false,
                description: "number of messages to delete",
                example: "42",
            },
            {
                name: "user",
                optional: false,
                description: "target user to clean messages from",
                example: "Samoxive#8634",
            },
        ],
    },
    {
        name: "/hardban",
        tooltip: "Bans the specified user and deletes their recent messages",
        parameters: [
            {
                name: "user",
                optional: false,
                description: "target user to hardban",
                example: "Samoxive#8634",
            },
            {
                name: "reason",
                optional: true,
                description: "reason for the hardban",
                example: "bad behavior",
            },
        ],
    },
    {
        name: "/iam",
        tooltip: "Self assigns a role",
        parameters: [
            {
                name: "role",
                optional: false,
                description: "role to assign",
                example: "cool role",
            },
        ],
    },
    {
        name: "/iam-not",
        tooltip: "Self removes a role",
        parameters: [
            {
                name: "role",
                optional: false,
                description: "role to remove",
                example: "cool role",
            },
        ],
    },
    {
        name: "/info",
        tooltip: "Displays statistics about Jim and useful links",
        parameters: [],
    },
    {
        name: "/invite",
        tooltip: "Displays links to invite Jim and get support",
        parameters: [],
    },
    {
        name: "/kick",
        tooltip: "Kicks the specified user",
        parameters: [
            {
                name: "user",
                optional: false,
                description: "target user to kick",
                example: "Samoxive#8634",
            },
            {
                name: "reason",
                optional: true,
                description: "reason for the kick",
                example: "bad behavior",
            },
        ],
    },
    {
        name: "/massban",
        tooltip: "Hardbans multiple users",
        parameters: [
            {
                name: "users",
                optional: false,
                description: "comma separated ids of users to hardban",
                example: "<id1>,<id2>,<id3>,<idN>",
            },
        ],
    },
    { name: "/melo", tooltip: "🍈", parameters: [] },
    {
        name: "/mute",
        tooltip: "Mutes the specified user",
        parameters: [
            {
                name: "user",
                optional: false,
                description: "target user to mute",
                example: "Samoxive#8634",
            },
            {
                name: "reason",
                optional: true,
                description: "reason for the mute",
                example: "bad behavior",
            },
            {
                name: "duration",
                optional: true,
                description: "duration for the mute",
                example: "3 days",
            },
        ],
    },
    { name: "/ping", tooltip: "Pongs if Jim is alive", parameters: [] },
    {
        name: "/remind",
        tooltip: "Sets a reminder for a future date",
        parameters: [
            {
                name: "message",
                optional: false,
                description: "message to be reminded of",
                example: "Do the important stuff",
            },
            {
                name: "duration",
                optional: true,
                description: "duration after which notification is sent",
                example: "3 days",
            },
        ],
    },
    {
        name: "/role-create",
        tooltip: "Creates a self assignable role for /iam command",
        parameters: [
            {
                name: "role",
                optional: false,
                description: "self assignable role to register",
                example: "cool role",
            },
        ],
    },
    {
        name: "/role-remove",
        tooltip: "Removes a self assignable role",
        parameters: [
            {
                name: "role",
                optional: false,
                description: "self assignable role to unregister",
                example: "cool role",
            },
        ],
    },
    {
        name: "/server",
        tooltip: "Displays information about the Discord server",
        parameters: [],
    },
    {
        name: "/softban",
        tooltip:
            "Ban, then unbans the specified user, deleting their recent messages",
        parameters: [
            {
                name: "user",
                optional: false,
                description: "target user to softban",
                example: "Samoxive#8634",
            },
            {
                name: "reason",
                optional: true,
                description: "reason for the softban",
                example: "bad behavior",
            },
            {
                name: "days",
                optional: true,
                description: "number of days to delete last messages",
                example: "3 days",
            },
        ],
    },
    {
        name: "/tag",
        tooltip: "Repeat a previously registered response",
        parameters: [
            {
                name: "name",
                optional: false,
                description: "tag name for message",
                example: "rule1",
            },
        ],
    },
    {
        name: "/tag-create",
        tooltip: "Registers a text shortcut for /tag command",
        parameters: [
            {
                name: "name",
                optional: false,
                description: "tag name to create",
                example: "rule1",
            },
            {
                name: "content",
                optional: false,
                description: "tag content",
                example: "You do not talk about Fight Club.",
            },
        ],
    },
    {
        name: "/tag-edit",
        tooltip: "Modifies a text shortcut",
        parameters: [
            {
                name: "name",
                optional: false,
                description: "tag name to edit",
                example: "rule1",
            },
            {
                name: "content",
                optional: false,
                description: "content to replace tag with",
                example: "You do not talk about ****.",
            },
        ],
    },
    {
        name: "/tag-list",
        tooltip: "Lists all available text shortcuts",
        parameters: [],
    },
    {
        name: "/tag-remove",
        tooltip: "Removes a text shortcut",
        parameters: [
            {
                name: "name",
                optional: false,
                description: "tag name to remove",
                example: "rule1",
            },
        ],
    },
    {
        name: "/unban",
        tooltip: "Unbans the specified user",
        parameters: [
            {
                name: "user",
                optional: false,
                description: "target user to unban",
                example: "Samoxive#8634",
            },
        ],
    },
    {
        name: "/unmute",
        tooltip: "Unmutes the specified user",
        parameters: [
            {
                name: "user",
                optional: false,
                description: "target user to unmute",
                example: "Samoxive#8634",
            },
        ],
    },
    {
        name: "/warn",
        tooltip: "Warns the specified user",
        parameters: [
            {
                name: "user",
                optional: false,
                description: "target user to warn",
                example: "Samoxive#8634",
            },
            {
                name: "reason",
                optional: true,
                description: "reason for the warn",
                example: "bad behavior",
            },
        ],
    },
    {
        name: "/weather",
        tooltip: "Displays weather information at given address",
        parameters: [
            {
                name: "address",
                optional: false,
                description: "address for weather location",
                example: "Istanbul Turkey",
            },
        ],
    },
    {
        name: "/whois",
        tooltip:
            "Displays information about given Discord user or server member",
        parameters: [
            {
                name: "user",
                optional: false,
                description: "target user to query",
                example: "Samoxive#8634",
            },
        ],
    },
    {
        name: "/xkcd",
        tooltip: "Finds a relevant xkcd comic related to given terms",
        parameters: [
            {
                name: "description",
                optional: false,
                description: "description or partial title of the comic",
                example: "bobby tables",
            },
        ],
    },
];
