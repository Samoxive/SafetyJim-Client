import * as React from "react";
import Jimbo from "../../assets/jimbo.jpg";
import "./home.css";
import { Button } from "react-bootstrap";
import { MetaTag } from "../../components/meta_tag";

const inviteLink =
    "https://discordapp.com/oauth2/authorize?client_id=313749262687141888&permissions=272706646&scope=bot";
const supportLink = "https://discord.io/safetyjim";
const donateLink = "https://www.patreon.com/safetyjim";

export const Home = () => (
    <div className="home-center">
        <MetaTag
            title="Safety Jim"
            description="Jim is a hardworking bot who will help you with your moderation needs."
        />
        <img className="home-jim-logo" src={Jimbo} alt="Jim's handsome face" />
        <h2 className="home-jim-desc">
            Jim is a hardworking bot who will help you with your moderation and
            server management needs.
        </h2>
        <div className="home-buttons">
            <Button
                variant="outline-primary"
                className="home-button"
                href={inviteLink}
            >
                Invite Jim!
            </Button>
            <Button
                variant="outline-primary"
                className="home-button"
                href={supportLink}
            >
                Support
            </Button>
            <Button
                variant="outline-primary"
                className="home-button"
                href={donateLink}
            >
                Donate
            </Button>
        </div>
    </div>
);
