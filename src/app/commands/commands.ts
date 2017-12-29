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
    }
];


