export const INFO_TEXT: { [index: string]: string } = {
    modLog:
        "Enabling this will log moderation actions like bans, kicks, warnings in given channel.",
    holdingRoom:
        "Enabling this will assign the specified role to the new members after specified amount of time has passed. This role can be used to grant permissions to view exclusive channels, send messages and so on. Cannot be used while **Join Captcha** is enabled.",
    joinCaptcha:
        "Enabling this will cause Jim to send a captcha challenge to new members to get the role specified in holding room setting. Cannot be used while **Holding Room** is enabled.",
    inviteLink:
        "Enabling this will remove messages that contain any discord invite links, it will also kick new members that have an invite link as their username. Members with moderation related permissions will be allowed to send links.",
    welcomeMessage:
        "Enabling this will make Jim welcome new members by messaging in specified channel. The welcome message can be customized. Placeholders `$user` and `$guild` can be used to message member's and your server's name.\n\nIf holding room is enabled, `$minute` placeholder can be used to specify the time left until they get their role assigned.",
    prefix:
        "If **No Space Prefix** is enabled, Jim's commands can be issued without a space between command and the prefix (if prefix is set to `/`, example usage will be `/ban`).",
    silentCommands:
        "If enabled, the command message user sent will be deleted after command has been executed (messages with content like `-mod ping`).\n\n" +
        "By default only moderation commands like ban, kick or warning will be deleted, this can be changed to delete all command messages through **Level** setting.\n\n" +
        'After each moderation command Jim sends a confirmation message like "Banned Lowestofthelow#5084 (408770622957551616) (Indefinitely)", this message can be disable via **Confirmation Message** setting.',
    statistics:
        "Enabling this will allow Jim to collect statistics about your server. Jim never stores message contents. This setting isn't open to the public yet as it's a work-in-progress.",
    wordFilter:
        "Enabling this will make Jim scan every message for blacklisted words (swear words by default) and remove offending messages. Setting filter level to `High` will result in a deeper search within words but it can increase false positives.\n\n" +
        "Blacklisted word list can also be customized, by default Jim uses a list of English swear words (you can find the list [here](https://raw.githubusercontent.com/Samoxive/Google-profanity-words/master/list.txt))\n\n" +
        "You can also choose a specific action to be taken after message is removed, for `Mute` and `Ban` actions some time duration can be set to make them temporary (set duration to 0 to make them permanent)."
};
