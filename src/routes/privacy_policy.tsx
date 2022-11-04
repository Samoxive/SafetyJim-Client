import * as React from "react";

const PrivacyPolicy: React.FC<{}> = (props) => (
    <div style={{ maxWidth: "600px", marginLeft: "auto", marginRight: "auto" }}>
        <h1>Privacy Policy of safetyjim.xyz</h1>
        <p>
            This website uses GoatCounter for non-invasive analytics about Users
            to improve user experience
        </p>
        <h2>What we collect</h2>
        <ul>
            <li>URL of the visited page</li>
            <li>
                <code>Referer</code> header
            </li>
            <li>
                <code>User-Agent</code> header
            </li>
            <li>Screen size</li>
            <li>Country and region name based on IP address</li>
            <li>
                A hash of the IP address, <code>User-Agent</code> header, and
                random number (IP address is not recoverable after hashing
                process)
            </li>
        </ul>
        <h2>What we don't collect</h2>
        <p>
            This Website does not collect personal information, Discord user
            names, user profile information, message content, presence.
        </p>
    </div>
);

export default PrivacyPolicy;
