import * as React from "react";
import { Guild } from "../../../entities/guild";
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
    Popover,
    FormGroup
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
import { INFO_TEXT } from "./settings_resource";

const SettingsTitleTooltip = ({ infoKey }: { infoKey: string }) => (
    <OverlayTrigger
        placement="auto"
        overlay={
            <Tooltip id={`settings-tooltip-${infoKey}`}>
                {INFO_TEXT[infoKey]}
            </Tooltip>
        }
    >
        <FontAwesomeIcon icon="info-circle" style={{ marginLeft: "4px" }} />
    </OverlayTrigger>
);

type SettingsGroupProps = {
    children: React.ReactChild[] | React.ReactChild;
    title: string;
    infoKey: string;
};

const SettingsGroup = ({ children, title, infoKey }: SettingsGroupProps) => (
    <Form className="setting-group">
        <Form.Row>
            <h5>
                {title} <SettingsTitleTooltip infoKey={infoKey} />
            </h5>
        </Form.Row>
        {children}
    </Form>
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
            <div className="setting-groups">
                <SettingsGroup title="Moderator Log" infoKey="modLog">
                    <Form.Row>
                        <Form.Group as={Col}>
                            <Form.Label>Enable</Form.Label>
                            <Form.Check
                                type="checkbox"
                                defaultChecked={settings.modLog}
                                onChange={this.onModlog}
                            />
                        </Form.Group>

                        <Form.Group as={Col}>
                            <Form.Label>Channel</Form.Label>
                            <Form.Control
                                as="select"
                                onChange={this.onModLogChannel}
                                value={settings.modLogChannel.id}
                            >
                                {settings.channels.map(channel => (
                                    <option key={channel.id} value={channel.id}>
                                        {channel.name}
                                    </option>
                                ))}
                            </Form.Control>
                        </Form.Group>
                    </Form.Row>
                </SettingsGroup>
                <SettingsGroup title="Prefix Settings" infoKey="prefix">
                    <Form.Row>
                        <Form.Group as={Col}>
                            <Form.Label>No Space</Form.Label>
                            <Form.Check
                                type="checkbox"
                                defaultChecked={settings.noSpacePrefix}
                                onChange={this.onNoSpacePrefix}
                            />
                        </Form.Group>

                        <Form.Group as={Col}>
                            <Form.Label>Prefix</Form.Label>
                            <Form.Control
                                placeholder="-mod"
                                value={settings.prefix}
                                onChange={this.onPrefix}
                            />
                        </Form.Group>
                    </Form.Row>
                </SettingsGroup>
                <SettingsGroup
                    title="Welcome Messages"
                    infoKey="welcomeMessage"
                >
                    <Form.Row>
                        <Form.Group as={Col}>
                            <Form.Label>Enable</Form.Label>
                            <Form.Check
                                type="checkbox"
                                defaultChecked={settings.welcomeMessage}
                                onChange={this.onWelcomeMessage}
                            />
                        </Form.Group>

                        <Form.Group as={Col}>
                            <Form.Label>Channel</Form.Label>
                            <Form.Control
                                as="select"
                                value={settings.welcomeMessageChannel.id}
                                onChange={this.onWelcomeMessageChannel}
                            >
                                {settings.channels.map(channel => (
                                    <option key={channel.id} value={channel.id}>
                                        {channel.name}
                                    </option>
                                ))}
                            </Form.Control>
                        </Form.Group>
                    </Form.Row>

                    <Form.Row>
                        <Form.Group style={{ width: "100%" }}>
                            <Form.Label>Message</Form.Label>
                            <Form.Control
                                as="textarea"
                                rows="3"
                                value={settings.message}
                                onChange={this.onMessage}
                            />
                        </Form.Group>
                    </Form.Row>
                </SettingsGroup>
                <SettingsGroup title="Holding Room" infoKey="holdingRoom">
                    <Form.Row>
                        <Form.Group as={Col}>
                            <Form.Label>Enable</Form.Label>
                            <Form.Check
                                type="checkbox"
                                defaultChecked={settings.holdingRoom}
                                onChange={this.onHoldingRoom}
                            />
                        </Form.Group>

                        <Form.Group as={Col}>
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

                        <Form.Group as={Col}>
                            <Form.Label>Minutes</Form.Label>
                            <Form.Control
                                type="number"
                                value={`${settings.holdingRoomMinutes}`}
                                onChange={this.onHoldingRoomMinutes}
                            />
                        </Form.Group>
                    </Form.Row>
                </SettingsGroup>
                <SettingsGroup title="Join Captcha" infoKey="joinCaptcha">
                    <Form.Row>
                        <Form.Group as={Col}>
                            <Form.Label>Enable</Form.Label>
                            <Form.Check
                                type="checkbox"
                                style={{ marginBottom: "30px" }}
                                defaultChecked={settings.joinCaptcha}
                                onChange={this.onJoinCaptcha}
                            />
                        </Form.Group>
                    </Form.Row>
                </SettingsGroup>
                <SettingsGroup title="Invite Link Remover" infoKey="inviteLink">
                    <Form.Row>
                        <Form.Group as={Col}>
                            <Form.Label>Enable</Form.Label>
                            <Form.Check
                                type="checkbox"
                                defaultChecked={settings.inviteLinkRemover}
                                onChange={this.onInviteLinkRemover}
                            />
                        </Form.Group>
                    </Form.Row>
                </SettingsGroup>
                <SettingsGroup title="Silent Commands" infoKey="silentCommands">
                    <Form.Row>
                        <Form.Group as={Col}>
                            <Form.Label>Enable</Form.Label>
                            <Form.Check
                                type="checkbox"
                                defaultChecked={settings.silentCommands}
                                onChange={this.onSilentCommands}
                            />
                        </Form.Group>
                    </Form.Row>
                </SettingsGroup>
                <SettingsGroup title="Statistics" infoKey="statistics">
                    <Form.Row>
                        <Form.Group as={Col}>
                            <Form.Label>Enable</Form.Label>
                            <Form.Check
                                type="checkbox"
                                disabled
                                defaultChecked={settings.statistics}
                                onChange={this.onStatistics}
                            />
                        </Form.Group>
                    </Form.Row>
                </SettingsGroup>
                <OverlayTrigger
                    trigger={["click", "focus"]}
                    placement="auto"
                    overlay={
                        <Popover
                            id="settings-reset-popover"
                            title="Are you sure?"
                        >
                            <Button variant="danger" onClick={this.onReset}>
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
                <Button
                    variant="primary"
                    onClick={this.onSave}
                    style={{ marginLeft: "8px" }}
                >
                    Save
                </Button>
            </div>
        );
    }
}