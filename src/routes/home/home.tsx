import { Button } from 'antd';
import * as React from 'react';
import Jimbo from '../../assets/jimbo.png';
import './home.css';

const inviteLink = 'https://discordapp.com/oauth2/authorize?client_id=313749262687141888&permissions=272706646&scope=bot';
const supportLink = 'https://discord.io/safetyjim';
const donateLink = 'https://www.patreon.com/safetyjim';

export const Home = () => (
    <div className="home-center">
        <img className="home-jim-logo" src={Jimbo} />
        <h2 className="home-jim-desc">
            Jim is a hardworking bot who will help you with your moderation and server management needs.
        </h2>
        <div className="home-buttons">
            <Button type="primary" ghost={true} className="home-button" href={inviteLink}>
                Invite Jim!
            </Button>
            <Button type="primary" ghost={true} className="home-button" href={supportLink}>
                Support
            </Button>
            <Button type="primary" ghost={true} className="home-button" href={donateLink}>
                Donate
            </Button>
        </div>
    </div>
);