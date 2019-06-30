import * as React from "react";
import { Redirect, Route, RouteComponentProps } from "react-router";
import { Guild } from "../../entities/guild";
import { SettingsRoute } from "./settings/settings";
import { routeToOauth, notifyError } from "../../utils";
import { SelfUserProps } from "../../app";
import { Modal, Button, Container, Row, Col, ListGroup } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { LinkContainer } from "react-router-bootstrap";
import "./dashboard.css";
import { getToken } from "../../endpoint/utils";
import { Loading } from "../../components/loading/loading";

type GenericGuildRouteProps = { guild: Guild } & any;

function injectGuild(
    guild: Guild,
    Component: React.ComponentType<GenericGuildRouteProps>
): React.StatelessComponent<any> {
    return () => <Component guild={guild} />;
}

type DashboardProps = RouteComponentProps<{ guildId: string }> & SelfUserProps;

export class Dashboard extends React.Component<
    DashboardProps,
    { redirectHome: boolean }
> {
    state = {
        redirectHome: false
    };

    onModalClose = () => this.setState({ redirectHome: true });
    onModalConfirm = () => routeToOauth(this.props.location.pathname);

    render() {
        const { match, selfUser } = this.props;
        const { redirectHome } = this.state;
        const path = match.path;
        const guildId = match.params.guildId;

        if (!getToken()) {
            if (redirectHome) {
                return <Redirect to="/" />;
            } else {
                return (
                    <Modal show={true}>
                        <Modal.Header>
                            <Modal.Title>Hold up!</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            You must log in through Discord to view this page.
                        </Modal.Body>
                        <Modal.Footer>
                            <Button
                                variant="secondary"
                                onClick={this.onModalClose}
                            >
                                Home
                            </Button>
                            <Button
                                variant="primary"
                                onClick={this.onModalConfirm}
                            >
                                Login
                            </Button>
                        </Modal.Footer>
                    </Modal>
                );
            }
        }

        if (!selfUser) {
            return <Loading />;
        }

        const selectedGuild = selfUser.guilds.find(
            guild => guild.id === guildId
        );

        if (selectedGuild == null) {
            notifyError(
                "Invalid URL",
                "You have navigated to an invalid URL, redirecting..."
            );
            return <Redirect to="/" />;
        }

        return (
            <Container fluid>
                <Row>
                    <Col xs="12" md="3" lg="2" style={{ padding: "0px" }}>
                        <ListGroup className="dashboard-sidenav">
                            <LinkContainer
                                to={`/dashboard/${guildId}/settings`}
                            >
                                <ListGroup.Item>
                                    <FontAwesomeIcon
                                        icon="cog"
                                        style={{ marginRight: "4px" }}
                                    />
                                    Settings
                                </ListGroup.Item>
                            </LinkContainer>
                            <LinkContainer to={`/dashboard/${guildId}/#`}>
                                <ListGroup.Item>
                                    <FontAwesomeIcon
                                        icon="cog"
                                        style={{ marginRight: "4px" }}
                                    />
                                    Super Ultra Long Dummy
                                </ListGroup.Item>
                            </LinkContainer>
                            <LinkContainer to={`/dashboard/${guildId}/##`}>
                                <ListGroup.Item>
                                    <FontAwesomeIcon
                                        icon="cog"
                                        style={{ marginRight: "4px" }}
                                    />
                                    Dummy
                                </ListGroup.Item>
                            </LinkContainer>
                        </ListGroup>
                    </Col>
                    <Col xs="12" md="9" lg="10">
                        <Route
                            path={`${path}/settings`}
                            component={injectGuild(
                                selectedGuild,
                                SettingsRoute
                            )}
                        />
                    </Col>
                </Row>
            </Container>
        );
    }
}
