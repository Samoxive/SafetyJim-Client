export const INFO_TEXT: { [index: string]: string } = {
    modLog:
        "Enabling this will log moderation actions like bans, kicks, warnings in given channel.",
    holdingRoom:
        "Enabling this will assign the specified role to the new members after specified amount of time has passed. This role can be used to grant permissions to view exclusive channels, send messages and so on. Cannot be used while **Join Captcha** is enabled.",
    joinCaptcha:
        "Enabling this will cause Jim to send a captcha challenge to new members to get the role specified in holding room setting. Cannot be used while **Holding Room** is enabled.",
    inviteLink:
        "Enabling this will remove messages that contain any discord invite links, it will also kick new members that have an invite link as their username. Members with moderation related permissions will be allowed to send links.\n\n" +
        "You can also choose a specific action to be taken after message is removed, for `Mute` and `Ban` actions some time duration can be set to make them temporary actions (set **Duration** to 0 to make them permanent).",
    welcomeMessage:
        "Enabling this will make Jim welcome new members by messaging in specified channel. The welcome message can be customized. Placeholders `$user` and `$guild` can be used to message member's and your server's name.\n\nIf holding room is enabled, `$minute` placeholder can be used to specify the time left until they get their role assigned.",
    wordFilter:
        "Enabling this will make Jim scan every message for blacklisted words (swear words by default) and remove offending messages. Setting **Filter Level** to `High` will result in a deeper search within words but it can increase false positives.\n\n" +
        "Blacklisted word list can also be customized, by default Jim uses a list of English swear words (you can find the list [here](https://raw.githubusercontent.com/Samoxive/Google-profanity-words/master/list.txt)). Each word in blacklist needs to be **comma seperated**.\n\n" +
        "You can also choose a specific action to be taken after message is removed, for `Mute` and `Ban` actions some time duration can be set to make them temporary actions (set **Duration** to 0 to make them permanent).",
    privacy:
        "By default any user can view server specific data on the dashboard but modifying it requires specific permissions. Using these levels you can choose who can view server data including settings and moderator log entries.",
    autoActions:
        "With automatic actions, you can have Jim issue moderation actions when users had too many actions issued against them. For example, you can have Jim automatically mute a person if they have been warned 3 times (warned by word filter perhaps).\n\n" +
        "You can set threshold of a specific action to 0 to disable automatic actions, to prevent infinite loops, chain of automatic actions will only be issued 3 times. (scenario of kicked because threshold of mutes was exceeded because threshold of warnings was exceeded).\n\n" +
        "Actions are taken after **every** violation of the threshold (if threshold is 3, automatic action will be taken for 3rd, 4th, 5th... violation). You can pardon past violations to reduce a user's violation count.",
    tagPermission:
        "If enabled this setting allows non-administrator moderators to add, modify, and delete tags.",
    spamFilter:
        "If enabled, users who send messages containing the same message 6 times in a short duration will be hardbanned. You can use this to prevent spam and Discord nitro scams."
};
