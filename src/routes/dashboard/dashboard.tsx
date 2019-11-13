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
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { BanListRoute } from "./modlog/banList";
import { SoftbanListRoute } from "./modlog/softbanList";
import { HardbanListRoute } from "./modlog/hardbanList";
import { KickListRoute } from "./modlog/kickList";
import { MuteListRoute } from "./modlog/muteList";
import { WarnListRoute } from "./modlog/warnList";

type SidebarMenuItemProps = {
    to: string;
    icon?: IconProp;
    iconEmoji?: string;
    title: string;
};

const SidebarMenuItem = ({
    to,
    icon,
    iconEmoji,
    title
}: SidebarMenuItemProps) => (
    <LinkContainer to={to}>
        <ListGroup.Item>
            {icon ? (
                <FontAwesomeIcon icon={icon} style={{ marginRight: "4px" }} />
            ) : (
                `${iconEmoji} `
            )}
            {title}
        </ListGroup.Item>
    </LinkContainer>
);

type GenericGuildRouteProps = { guild: Guild } & any;

function injectGuild(
    guild: Guild,
    Component: React.ComponentType<GenericGuildRouteProps>
): React.StatelessComponent<any> {
    return (props: any) => <Component {...props} guild={guild} />;
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
                            <SidebarMenuItem
                                to={`/dashboard/${guildId}/settings`}
                                icon="cog"
                                title="Settings"
                            />
                            <SidebarMenuItem
                                to={`/dashboard/${guildId}/bans`}
                                icon="hammer"
                                title="Bans"
                            />
                            <SidebarMenuItem
                                to={`/dashboard/${guildId}/softbans`}
                                icon="hammer"
                                title="Softbans"
                            />
                            <SidebarMenuItem
                                to={`/dashboard/${guildId}/hardbans`}
                                icon="hammer"
                                title="Hardbans"
                            />
                            <SidebarMenuItem
                                to={`/dashboard/${guildId}/kicks`}
                                iconEmoji="🥾"
                                title="Kicks"
                            />
                            <SidebarMenuItem
                                to={`/dashboard/${guildId}/mutes`}
                                icon="microphone-slash"
                                title="Mutes"
                            />
                            <SidebarMenuItem
                                to={`/dashboard/${guildId}/warns`}
                                icon="exclamation-circle"
                                title="Warnings"
                            />
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
                        <Route
                            path={`${path}/bans/:banId?`}
                            component={injectGuild(selectedGuild, BanListRoute)}
                        />
                        <Route
                            path={`${path}/softbans/:softbanId?`}
                            component={injectGuild(
                                selectedGuild,
                                SoftbanListRoute
                            )}
                        />
                        <Route
                            path={`${path}/hardbans/:hardbanId?`}
                            component={injectGuild(
                                selectedGuild,
                                HardbanListRoute
                            )}
                        />
                        <Route
                            path={`${path}/kicks/:kickId?`}
                            component={injectGuild(
                                selectedGuild,
                                KickListRoute
                            )}
                        />
                        <Route
                            path={`${path}/mutes/:muteId?`}
                            component={injectGuild(
                                selectedGuild,
                                MuteListRoute
                            )}
                        />
                        <Route
                            path={`${path}/warns/:warnId?`}
                            component={injectGuild(
                                selectedGuild,
                                WarnListRoute
                            )}
                        />
                    </Col>
                </Row>
            </Container>
        );
    }
}
