import React, { Component } from "react";
import "./app.scss";
import { Navbar, Image, Nav, NavDropdown } from "react-bootstrap";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
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
    <Navbar bg="dark" variant="dark" expand="lg">
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

    renderDashboard = (props: any) => (
        <Dashboard {...props} selfUser={this.state.selfUser} />
    );

    componentDidMount() {
        if (getToken()) {
            fetchSelfUser().then(selfUser => this.setState({ selfUser }));
        }
    }

    render() {
        return (
            <Router>
                <>
                    <NavbarComponent selfUser={this.state.selfUser} />
                    <Switch>
                        <Route exact={true} path="/" component={Home} />
                        <Route path="/commands" component={Commands} />
                        <Route path="/faq" component={FAQ} />
                        <Route path="/login" component={Login} />
                        <Route path="/terms-of-service" component={ToS} />
                        <Route path="/privacy-policy" component={PrivacyPolicy} />
                        <Route
                            path="/dashboard/:guildId"
                            render={this.renderDashboard}
                        />
                        <Route component={NotFound} />
                    </Switch>
                </>
            </Router>
        );
    }
}

export default App;
