import React, { Component } from "react";
import "./app.scss";
import { Navbar, Image, Nav, NavDropdown } from "react-bootstrap";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { LinkContainer } from "react-router-bootstrap";
import { Commands } from "./routes/commands/commands";
import { Dashboard } from "./routes/dashboard/dashboard";
import { Home } from "./routes/home/home";
import { Login } from "./routes/login/login";
import { SelfUser } from "./entities/selfUser";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { clearToken, getToken } from "./endpoint/utils";
import { fetchSelfUser } from "./endpoint/selfUser";
import { FAQ } from "./routes/faq/faq";
import ToS from "./routes/tos";
import PrivacyPolicy from "./routes/privacy_policy";
import { ToastContainer } from "react-toastify";
import { SettingsRoute } from "./routes/dashboard/settings/settings";
import { BanListRoute } from "./routes/dashboard/modlog/banList";
import { SoftbanListRoute } from "./routes/dashboard/modlog/softbanList";
import { HardbanListRoute } from "./routes/dashboard/modlog/hardbanList";
import { KickListRoute } from "./routes/dashboard/modlog/kickList";
import { MuteListRoute } from "./routes/dashboard/modlog/muteList";
import { WarnListRoute } from "./routes/dashboard/modlog/warnList";

export type SelfUserProps = { selfUser?: SelfUser };

const NotFound = () => <h1>Not Found!</h1>;

const onLogout = () => {
    clearToken("/");
};

const NavbarUserMenu = ({ selfUser }: SelfUserProps) => {
    if (!selfUser) {
        return (
            <LinkContainer to="/login">
                <Nav.Link>Login</Nav.Link>
            </LinkContainer>
        );
    } else {
        return (
            <NavDropdown title="Dashboard" id="self-user-dropdown">
                <NavDropdown.Item>
                    <Image
                        src={selfUser.avatarUrl}
                        rounded
                        width="32px"
                        style={{ marginRight: "4px" }}
                    />
                    {selfUser.name}
                </NavDropdown.Item>
                <NavDropdown.Divider />
                {selfUser.guilds.map(guild => (
                    <LinkContainer to={`/dashboard/${guild.id}`} key={guild.id}>
                        <NavDropdown.Item>
                            <Image
                                src={guild.iconUrl}
                                rounded
                                width="32px"
                                style={{ marginRight: "4px" }}
                            />
                            {guild.name}
                        </NavDropdown.Item>
                    </LinkContainer>
                ))}
                <NavDropdown.Divider />
                <NavDropdown.Item onClick={onLogout}>
                    <FontAwesomeIcon
                        icon="sign-out-alt"
                        style={{ marginRight: "4px" }}
                    />
                    Log out
                </NavDropdown.Item>
            </NavDropdown>
        );
    }
};

const NavbarComponent = ({ selfUser }: SelfUserProps) => (
    <Navbar bg="dark" variant="dark" expand="lg" style={{ paddingLeft: "16px", paddingRight: "16px" }}>
        <LinkContainer to="/">
            <Navbar.Brand>Safety Jim</Navbar.Brand>
        </LinkContainer>
        <Navbar.Toggle />
        <Navbar.Collapse>
            <Nav className="mr-auto">
                <LinkContainer to="/commands">
                    <Nav.Link>Commands</Nav.Link>
                </LinkContainer>
                <LinkContainer to="/faq">
                    <Nav.Link>FAQ</Nav.Link>
                </LinkContainer>
                {getToken() ? (
                    <NavbarUserMenu selfUser={selfUser} />
                ) : (
                    <LinkContainer to="/login">
                        <Nav.Link>Login</Nav.Link>
                    </LinkContainer>
                )}
                <LinkContainer to="/terms-of-service">
                    <Nav.Link>Terms</Nav.Link>
                </LinkContainer>
                <LinkContainer to="/privacy-policy">
                    <Nav.Link>Privacy</Nav.Link>
                </LinkContainer>
            </Nav>
        </Navbar.Collapse>
    </Navbar>
);

class App extends Component<{}, { selfUser?: SelfUser }> {
    state = { selfUser: undefined };

    componentDidMount() {
        if (getToken()) {
            fetchSelfUser().then(selfUser => this.setState({ selfUser }));
        }
    }

    render() {
        return (
            <BrowserRouter>
                <>
                    <NavbarComponent selfUser={this.state.selfUser} />
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/commands" element={<Commands />} />
                        <Route path="/faq" element={<FAQ />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/terms-of-service" element={<ToS />} />
                        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
                        <Route
                            path="/dashboard/:guildId"
                            element={<Dashboard selfUser={this.state.selfUser} />}
                        >
                            <Route
                                path="settings"
                                element={<SettingsRoute />}
                                action={undefined}
                            />
                            <Route
                                path="bans/:banId?"
                                element={<BanListRoute />}
                            />
                            <Route
                                path="softbans/:softbanId?"
                                element={<SoftbanListRoute />}
                            />
                            <Route
                                path="hardbans/:hardbanId?"
                                element={<HardbanListRoute />}
                            />
                            <Route
                                path="kicks/:kickId?"
                                element={<KickListRoute />}
                            />
                            <Route
                                path="mutes/:muteId?"
                                element={<MuteListRoute />}
                            />
                            <Route
                                path="warns/:warnId?"
                                element={<WarnListRoute />}
                            />
                        </Route>
                        <Route path="*" element={<NotFound />} />
                    </Routes>
                    <ToastContainer />
                </>
            </BrowserRouter>
        );
    }
}

export default App;
