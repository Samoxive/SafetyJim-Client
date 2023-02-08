import * as React from "react";
import { Location, Navigate, NavigateFunction, Outlet, Params, Route, useNavigate, useNavigation, useOutletContext } from "react-router";
import { Guild } from "../../entities/guild";
import { SettingsRoute } from "./settings/settings";
import { routeToOauth, notifyError } from "../../utils";
import { SelfUserProps } from "../../App";
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
import { useParams } from "react-router";
import { useLocation } from "react-router";

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
        <ListGroup.Item action>
            {icon ? (
                <FontAwesomeIcon icon={icon} style={{ marginRight: "4px" }} />
            ) : (
                `${iconEmoji} `
            )}
            {title}
        </ListGroup.Item>
    </LinkContainer>
);

export type DashboardRouteProps = { guild: Guild, location: Location, navigate: NavigateFunction, params: Params };

export function dashboardRoute(ModLogComponent: React.ComponentClass<DashboardRouteProps>) {
    return (): JSX.Element => {
        let guild = useOutletContext<Guild>();
        let location = useLocation();
        let navigate = useNavigate();
        let params = useParams();

        return <ModLogComponent guild={guild} location={location} navigate={navigate} params={params} />;
    }
}

export function Dashboard(props: SelfUserProps): JSX.Element {
    let { guildId } = useParams();
    let location = useLocation();
    let pathname = location.pathname;

    return <ActualDashboard guildId={guildId} pathname={pathname} selfUser={props.selfUser} />;
}

type ActualDashboardProps = { guildId?: string, pathname: string } & SelfUserProps;

export class ActualDashboard extends React.Component<
    ActualDashboardProps,
    { redirectHome: boolean }
> {
    state = {
        redirectHome: false
    };

    onModalClose = () => this.setState({ redirectHome: true });
    onModalConfirm = () => routeToOauth(this.props.pathname);

    render() {
        const { guildId, selfUser } = this.props;
        const { redirectHome } = this.state;

        if (!getToken()) {
            if (redirectHome) {
                return <Navigate to="/" />;
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
                "You have navigated to an invalid URL, redirecting..."
            );
            return <Navigate to="/" />;
        }

        return (
            <Container fluid>
                <Row>
                    <Col xs="12" md="3" lg="2" style={{ padding: "0px" }}>
                        <ListGroup className="dashboard-sidenav">
                            <SidebarMenuItem
                                to="settings"
                                icon="cog"
                                title="Settings"
                            />
                            <SidebarMenuItem
                                to="bans"
                                icon="hammer"
                                title="Bans"
                            />
                            <SidebarMenuItem
                                to="softbans"
                                icon="hammer"
                                title="Softbans"
                            />
                            <SidebarMenuItem
                                to="hardbans"
                                icon="hammer"
                                title="Hardbans"
                            />
                            <SidebarMenuItem
                                to="kicks"
                                iconEmoji="🥾"
                                title="Kicks"
                            />
                            <SidebarMenuItem
                                to="mutes"
                                icon="microphone-slash"
                                title="Mutes"
                            />
                            <SidebarMenuItem
                                to="warns"
                                icon="exclamation-circle"
                                title="Warnings"
                            />
                        </ListGroup>
                    </Col>
                    <Col xs="12" md="9" lg="10">
                        <Outlet context={selectedGuild} />
                    </Col>
                </Row>
            </Container>
        );
    }
}
