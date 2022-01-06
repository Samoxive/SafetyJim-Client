import * as React from "react";
import Jimbo from "../../assets/jimbo.jpg";
import "./home.css";
import { Button } from "react-bootstrap";
import { MetaTag } from "../../components/meta_tag";

const inviteLink =
    "https://discord.com/oauth2/authorize?client_id=313749262687141888&permissions=1099918552278&scope=applications.commands%20bot";
const supportLink = "https://discord.io/safetyjim";

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
        </div>
    </div>
);
