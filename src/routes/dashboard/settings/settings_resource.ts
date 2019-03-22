export const INFO_TEXT: { [index: string]: string } = {
    modLog:
        "Enabling this will log moderation actions like bans, kicks, warnings in given channel.",
    holdingRoom:
        "Enabling this will assign the specified role to the new members after specified amount of time has passed. This role can be used to grant permissions to view exclusive channels, send messages and so on. Cannot be used while join captcha is enabled.",
    joinCaptcha:
        "Enabling this will cause Jim to send a captcha challenge to new members to get the role specified in holding room setting. Cannot be used while holding room is enabled.",
    inviteLink:
        "Enabling this will remove messages that contain any discord invite links, it will also kick new members that have an invite link as their username.",
    welcomeMessage:
        'Enabling this will make Jim welcome new members by messaging in specified channel. The welcome message can be customized. Placeholders "$user" and "$guild" can be used to message member\'s and your server\'s name. If holding room is enabled, "$minute" placeholder can be used to specify the time left until they get their role assigned.',
    prefix:
        'If no space prefix is enabled, Jim\'s commands can be issued without a space between command and the prefix (if prefix is set to "/", example usage will be "/ban").',
    silentCommands:
        "If enabled, the command message user sent will be deleted if the command was a moderation action like ban, kick or warning.",
    statistics:
        "Enabling this will allow Jim to collect statistics about your server. Jim never stores message contents. This setting isn't open to the public yet as it's a work-in-progress."
};
