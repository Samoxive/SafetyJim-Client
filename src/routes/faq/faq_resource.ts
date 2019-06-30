interface FAQEntry {
    title: string;
    description: string;
}

export const faqs: FAQEntry[] = [
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
            "- Modifying guild settings and tags requires Administrator permission"
    },
    {
        title: "Mute command won't work!",
        description:
            "Jim uses pure discord permissions to handle muting users," +
            " it creates a Muted role and creates permissions in every channel so" +
            " that users with Muted role can't send messages. To make sure this works properly\n\n" +
            "- Make sure Jim has the permissions it needs\n" +
            "- Make sure Muted role is above the highest role of the user you are trying to mute\n" +
            "- Make sure your channels have proper permission overrides for the role Muted"
    }
];
