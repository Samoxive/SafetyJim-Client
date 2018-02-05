import { Command } from './command';

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
            'the day count of messages deleted, you can use the "|" seperator and specify the number afterwards.'
        
    }
];


