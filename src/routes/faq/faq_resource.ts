interface FAQEntry {
    title: string;
    description: string;
}

export const faqs: FAQEntry[] = [
    {
        title: "How to enter a user as parameter if they aren't in server?",
        description:
            "If you want to use a command and the user isn't in your server, you can enter their user ID " +
            "as parameter instead of their username.\n\nTo find a user's ID, you need to enable Discord's" +
            ' developer mode by clicking "User Settings" > "Advanced" > "Developer Mode" slider.\n\n' +
            'After enabling developer mode you can simply right click their username and click "Copy ID" button.',
    },
    {
        title: "Why can't I see Jim's slash commands in my chat prompt?",
        description:
            "If you invited Jim after 24th of March, 2021 you need to kick him and invite back for slash commands to appear in your server.\n\n" +
            "This is due to Discord grandfathering servers that already invited at that point into having slash commands permissions for Jim, any server " +
            "that invited Jim afterwards lacks the permissions Jim needs to display slash commands.",
    },
    {
        title: "Can everyone use the commands of Jim?",
        description:
            "No, for some commands you need to have a specific permission.\n\n" +
            "- Ban command requires Ban Members permission\n" +
            "- Softban command requires Ban Members permission\n" +
            "- Hardban command requires Ban Members permission\n" +
            "- Kick command requires Kick Members permission\n" +
            "- Mute command requires Manage Roles permission\n" +
            "- Warn command requires Kick Members permission\n" +
            "- Clean command requires Manage Messages permission\n" +
            "- Modifying guild settings and tags requires Administrator permission",
    },
    {
        title: "Mute command won't work!",
        description:
            "Jim uses pure discord permissions to handle muting users," +
            " it creates a Muted role and creates permissions in every channel so" +
            " that users with Muted role can't send messages. To make sure this works properly\n\n" +
            "- Make sure Jim has the permissions it needs\n" +
            "- Make sure Muted role is above the highest role of the user you are trying to mute\n" +
            "- Make sure your channels have proper permission overrides for the role Muted",
    },
];
