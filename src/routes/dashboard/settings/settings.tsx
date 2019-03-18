import * as React from "react";
import { Guild } from "../../../entities/guild";
import { GuildSettingsStore } from "../../../stores/guildSettingsStore";
import { LoginStore } from "../../../stores/loginStore";
import {
    booleanListener,
    stringListener,
    integerListener
} from "../../../utils";
import "./settings.css";
import {
    Card,
    Tooltip,
    OverlayTrigger,
    Col,
    Form,
    Container,
    Row,
    Button,
    Popover
} from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { GuildSettings } from "../../../entities/guildSettings";
import { Component } from "react";
import { Channel } from "../../../entities/channel";
import { Role } from "../../../entities/role";
import {
    updateSettings,
    fetchSettings,
    resetSettings
} from "../../../endpoint/guildSettings";

const INFO_TEXT: { [index: string]: string } = {
    modLog:
        "Enabling this will log moderation actions like bans, kicks, warnings in given channel.",
    holdingRoom:
        "Enabling this will assign the specified role to the new members after specified amount of time has passed. This role can be used to grant permissions to view exclusive channels, send messages and so on. Cannot be used while join captcha is enabled.",
    joinCaptcha:
        "Enabling this will cause Jim to send a captcha challenge to new members to get the role specified in holding room setting. Cannot be used while holding room is enabled.",
    inviteLink:
        "Enabling this will remove messages that contain any discord invite links, it will also kick new members that have an invite link as their username.",
    welcomeMessage:
        'Enabling this will make Jim welcome new members by messaging in specified channel. The welcome message can be customized. Placeholders "$user" and "$guild" can be used to message member\'s and your server\'s name. If holding room is enabled, "$minute" placeholder can be used to specify the time left until they get their role assigned.',
    prefix:
        'If no space prefix is enabled, Jim\'s commands can be issued without a space between command and the prefix (if prefix is set to "/", example usage will be "/ban").',
    silentCommands:
        "If enabled, the command message user sent will be deleted if the command was a moderation action like ban, kick or warning.",
    statistics:
        "Enabling this will allow Jim to collect statistics about your server. Jim never stores message contents. This setting isn't open to the public yet as it's a work-in-progress."
};

type SettingsGroupProps = {
    children: React.ReactChild[] | React.ReactChild;
    title: string;
    infoKey: string;
};
const SettingsGroup = ({ children, title, infoKey }: SettingsGroupProps) => (
    <Card style={{ height: "100%" }}>
        <Card.Header as="h5">
            {title}
            <OverlayTrigger
                placement="auto"
                overlay={
                    <Tooltip id={`settings-tooltip-${infoKey}`}>
                        {INFO_TEXT[infoKey]}
                    </Tooltip>
                }
            >
                <FontAwesomeIcon
                    icon="info-circle"
                    style={{ marginLeft: "4px" }}
                />
            </OverlayTrigger>
        </Card.Header>
        <Card.Body className="setting-group">{children}</Card.Body>
    </Card>
);

type SettingsRouteState = { settings?: GuildSettings };

export class SettingsRoute extends Component<
    { guild: Guild },
    SettingsRouteState
> {
    state: SettingsRouteState = {
        settings: undefined
    };

    // onChange events can only fire when settings are fetched so we are sure that settings exist.
    // We also don't care if user modified the DOM or did other things and managed to find a channel id that doesn't exist
    findChannel = (state: SettingsRouteState, id: string): Channel =>
        state.settings!.channels.find(channel => channel.id === id)!;

    findRole = (state: SettingsRouteState, id: string): Role =>
        state.settings!.roles.find(role => role.id === id)!;

    onSetting = <K extends keyof GuildSettings>(
        key: K,
        value: GuildSettings[K]
    ) => {
        this.setState(state => {
            const newState = {
                settings: { ...state.settings! }
            };
            newState.settings[key] = value;
            return newState;
        });
    };

    onModlog = booleanListener(enabled => this.onSetting("modLog", enabled));
    onModLogChannel = stringListener((channelId: string) =>
        this.setState(state => ({
            settings: {
                ...state.settings!,
                modLogChannel: this.findChannel(state, channelId)
            }
        }))
    );

    onHoldingRoom = booleanListener(enabled =>
        this.onSetting("holdingRoom", enabled)
    );

    onHoldingRoomRole = stringListener((roleId: string) =>
        this.setState(state => ({
            settings: {
                ...state.settings!,
                holdingRoomRole: this.findRole(state, roleId)
            }
        }))
    );

    onHoldingRoomMinutes = integerListener(minutes =>
        this.onSetting("holdingRoomMinutes", minutes)
    );

    onInviteLinkRemover = booleanListener(enabled =>
        this.onSetting("inviteLinkRemover", enabled)
    );

    onWelcomeMessage = booleanListener(enabled =>
        this.onSetting("welcomeMessage", enabled)
    );

    onMessage = stringListener(message => this.onSetting("message", message));

    onWelcomeMessageChannel = stringListener((channelId: string) =>
        this.setState(state => ({
            settings: {
                ...state.settings!,
                welcomeMessageChannel: this.findChannel(state, channelId)
            }
        }))
    );
    onPrefix = stringListener(message => this.onSetting("prefix", message));

    onSilentCommands = booleanListener(enabled =>
        this.onSetting("silentCommands", enabled)
    );

    onNoSpacePrefix = booleanListener(enabled =>
        this.onSetting("noSpacePrefix", enabled)
    );

    onStatistics = booleanListener(enabled =>
        this.onSetting("statistics", enabled)
    );

    onJoinCaptcha = booleanListener(enabled =>
        this.onSetting("joinCaptcha", enabled)
    );

    onSave = () => {
        const { settings } = this.state;
        const { guild } = this.props;
        updateSettings(guild, settings!);
    };

    onReset = () => {
        const { guild } = this.props;
        resetSettings(guild);
        fetchSettings(this.props.guild).then(settings =>
            this.setState({ settings })
        );
    };

    componentDidMount() {
        fetchSettings(this.props.guild).then(settings =>
            this.setState({ settings })
        );
    }

    render() {
        const { settings } = this.state;
        if (!settings) {
            return <></>;
        }

        return (
            <Container fluid style={{ padding: "0px" }}>
                <Row className="settings-container">
                    <Col xs="12" md="6" lg="4" xl="3">
                        <SettingsGroup title="Moderator Log" infoKey="modLog">
                            <Form.Group>
                                <Form.Label>Enable</Form.Label>
                                <Form.Check
                                    type="checkbox"
                                    defaultChecked={settings.modLog}
                                    onChange={this.onModlog}
                                />
                            </Form.Group>

                            <Form.Group>
                                <Form.Label>Channel</Form.Label>
                                <Form.Control
                                    as="select"
                                    onChange={this.onModLogChannel}
                                    value={settings.modLogChannel.id}
                                >
                                    {settings.channels.map(channel => (
                                        <option
                                            key={channel.id}
                                            value={channel.id}
                                        >
                                            {channel.name}
                                        </option>
                                    ))}
                                </Form.Control>
                            </Form.Group>
                        </SettingsGroup>
                    </Col>

                    <Col xs="12" md="6" lg="4" xl="3">
                        <SettingsGroup title="Prefix Settings" infoKey="prefix">
                            <Form.Group style={{ width: "80%" }}>
                                <Form.Label>No Space</Form.Label>
                                <Form.Check
                                    type="checkbox"
                                    defaultChecked={settings.noSpacePrefix}
                                    onChange={this.onNoSpacePrefix}
                                />
                            </Form.Group>

                            <Form.Group>
                                <Form.Label>Prefix</Form.Label>
                                <Form.Control
                                    placeholder="-mod"
                                    value={settings.prefix}
                                    onChange={this.onPrefix}
                                />
                            </Form.Group>
                        </SettingsGroup>
                    </Col>
                    <Col xs="12" sm="6" md="4" lg="4" xl="3">
                        <SettingsGroup
                            title="Invite Link Remover"
                            infoKey="inviteLink"
                        >
                            <Row>
                                <Col xs="12">
                                    <Form.Group>
                                        <Form.Label>Enable</Form.Label>
                                        <Form.Check
                                            type="checkbox"
                                            defaultChecked={
                                                settings.inviteLinkRemover
                                            }
                                            onChange={this.onInviteLinkRemover}
                                        />
                                    </Form.Group>
                                </Col>
                            </Row>
                        </SettingsGroup>
                    </Col>
                    <Col xs="12" sm="6" md="4" lg="4" xl="3">
                        <SettingsGroup
                            title="Silent Commands"
                            infoKey="silentCommands"
                        >
                            <Form.Group>
                                <Form.Label>Enable</Form.Label>
                                <Form.Check
                                    type="checkbox"
                                    defaultChecked={settings.silentCommands}
                                    onChange={this.onSilentCommands}
                                />
                            </Form.Group>
                        </SettingsGroup>
                    </Col>
                    <Col xs="12">
                        <SettingsGroup
                            title="Welcome Messages"
                            infoKey="welcomeMessage"
                        >
                            <Form.Group>
                                <Form.Label>Enable</Form.Label>
                                <Form.Check
                                    type="checkbox"
                                    defaultChecked={settings.welcomeMessage}
                                    onChange={this.onWelcomeMessage}
                                />
                            </Form.Group>

                            <Form.Group>
                                <Form.Label>Channel</Form.Label>
                                <Form.Control
                                    as="select"
                                    value={settings.welcomeMessageChannel.id}
                                    onChange={this.onWelcomeMessageChannel}
                                >
                                    {settings.channels.map(channel => (
                                        <option
                                            key={channel.id}
                                            value={channel.id}
                                        >
                                            {channel.name}
                                        </option>
                                    ))}
                                </Form.Control>
                            </Form.Group>

                            <Form.Group style={{ width: "100%" }}>
                                <Form.Label>Message</Form.Label>
                                <Form.Control
                                    as="textarea"
                                    rows="3"
                                    value={settings.message}
                                    onChange={this.onMessage}
                                />
                            </Form.Group>
                        </SettingsGroup>
                    </Col>
                    <Col xs="12" sm="8" md="6" xl="4">
                        <SettingsGroup
                            title="Holding Room"
                            infoKey="holdingRoom"
                        >
                            <Form.Group>
                                <Form.Label>Enable</Form.Label>
                                <Form.Check
                                    type="checkbox"
                                    defaultChecked={settings.holdingRoom}
                                    onChange={this.onHoldingRoom}
                                />
                            </Form.Group>

                            <Form.Group>
                                <Form.Label>Role</Form.Label>
                                <Form.Control
                                    as="select"
                                    value={
                                        settings.holdingRoomRole
                                            ? settings.holdingRoomRole.id
                                            : undefined
                                    }
                                    onChange={this.onHoldingRoomRole}
                                >
                                    {settings.roles.map(role => (
                                        <option key={role.id} value={role.id}>
                                            {role.name}
                                        </option>
                                    ))}
                                </Form.Control>
                            </Form.Group>

                            <Form.Group>
                                <Form.Label>Minutes</Form.Label>
                                <Form.Control
                                    type="number"
                                    value={`${settings.holdingRoomMinutes}`}
                                    onChange={this.onHoldingRoomMinutes}
                                />
                            </Form.Group>
                        </SettingsGroup>
                    </Col>
                    <Col xs="12" sm="6" md="4" lg="3" xl="2">
                        <SettingsGroup
                            title="Join Captcha"
                            infoKey="joinCaptcha"
                        >
                            <Form.Group>
                                <Form.Label>Enable</Form.Label>
                                <Form.Check
                                    type="checkbox"
                                    style={{ marginBottom: "30px" }}
                                    defaultChecked={settings.joinCaptcha}
                                    onChange={this.onJoinCaptcha}
                                />
                            </Form.Group>
                        </SettingsGroup>
                    </Col>
                    <Col xs="12" sm="6" md="4" lg="3" xl="2">
                        <SettingsGroup title="Statistics" infoKey="statistics">
                            <Form.Group>
                                <Form.Label>Enable</Form.Label>
                                <Form.Check
                                    type="checkbox"
                                    disabled
                                    defaultChecked={settings.statistics}
                                    onChange={this.onStatistics}
                                />
                            </Form.Group>
                        </SettingsGroup>
                    </Col>
                </Row>
                <Row style={{ marginTop: "8px" }}>
                    <Col
                        xs={{ span: 3, offset: 3 }}
                        sm={{ span: 2, offset: 4 }}
                        md={{ span: 1, offset: 5 }}
                    >
                        <OverlayTrigger
                            trigger={["click", "focus"]}
                            placement="auto"
                            overlay={
                                <Popover
                                    id="settings-reset-popover"
                                    title="Are you sure?"
                                >
                                    <Button
                                        variant="danger"
                                        onClick={this.onReset}
                                    >
                                        <FontAwesomeIcon
                                            icon="exclamation-triangle"
                                            style={{ marginRight: "4px" }}
                                        />
                                        Reset Settings
                                    </Button>
                                </Popover>
                            }
                        >
                            <Button variant="danger">Reset</Button>
                        </OverlayTrigger>
                    </Col>
                    <Col xs="3" sm="2" md="1">
                        <Button variant="primary" onClick={this.onSave}>
                            Save
                        </Button>
                    </Col>
                </Row>
            </Container>
        );
    }
}
