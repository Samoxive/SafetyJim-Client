import * as React from "react";
import { Guild } from "../../../entities/guild";
import "./settings.css";
import { OverlayTrigger, Form, Button, Popover } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    GuildSettings,
    GuildSettingsConstants
} from "../../../entities/guildSettings";
import { Component } from "react";
import { Channel } from "../../../entities/channel";
import {
    updateSettings,
    fetchSettings,
    resetSettings
} from "../../../endpoint/guildSettings";
import { INFO_TEXT } from "./settings_resource";
import { Loading } from "../../../components/loading/loading";
import Markdown from "react-markdown";
import {
    Checkbox,
    StringSelect,
    IntegerSelect,
    TextArea,
    TextInput,
    IntegerInput,
    ModActionSelect
} from "./form_utils";

const C = GuildSettingsConstants;

type SettingsGroupProps = {
    children: React.ReactChild[] | React.ReactChild;
    title: string;
    infoKey: string;
};

const SettingsGroup = ({ children, title, infoKey }: SettingsGroupProps) => (
    <Form className="setting-group">
        <Form.Row>
            <h5>{title}</h5>
        </Form.Row>
        <Form.Row>
            <h6>
                <small className="text-muted setting-tooltip">
                    <Markdown source={INFO_TEXT[infoKey]} />
                </small>
            </h6>
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
    // We also don't care if user modified the DOM or did other things and managed to
    // find a channel id that doesn't exist
    findChannel = (id: string): Channel =>
        this.state.settings!.channels.find(channel => channel.id === id)!;

    findRole = (id: string) => {
        const role = this.state.settings!.roles.find(role => role.id === id);
        return role || null;
    };

    onSetting = <K extends keyof GuildSettings>(
        key: K,
        value: GuildSettings[K]
    ) =>
        this.setState(state => ({
            ...state,
            settings: {
                ...state.settings!,
                [key]: value
            }
        }));

    onModlog = (enabled: boolean) => this.onSetting("modLog", enabled);

    onModLogChannel = (channelId: string) =>
        this.onSetting("modLogChannel", this.findChannel(channelId));

    onHoldingRoom = (enabled: boolean) =>
        this.onSetting("holdingRoom", enabled);

    onHoldingRoomRole = (roleId: string) =>
        this.onSetting("holdingRoomRole", this.findRole(roleId));

    onHoldingRoomMinutes = (minutes: number) =>
        this.onSetting("holdingRoomMinutes", minutes);

    onInviteLinkRemover = (enabled: boolean) =>
        this.onSetting("inviteLinkRemover", enabled);

    onWelcomeMessage = (enabled: boolean) =>
        this.onSetting("welcomeMessage", enabled);

    onMessage = (message: string) => this.onSetting("message", message);

    onWelcomeMessageChannel = (channelId: string) =>
        this.onSetting("welcomeMessageChannel", this.findChannel(channelId));

    onPrefix = (message: string) => this.onSetting("prefix", message);

    onSilentCommands = (enabled: boolean) =>
        this.onSetting("silentCommands", enabled);

    onNoSpacePrefix = (enabled: boolean) =>
        this.onSetting("noSpacePrefix", enabled);

    onStatistics = (enabled: boolean) => this.onSetting("statistics", enabled);

    onJoinCaptcha = (enabled: boolean) =>
        this.onSetting("joinCaptcha", enabled);

    onSilentCommandsLevel = (level: number) =>
        this.onSetting("silentCommandsLevel", level);

    onModActionConfirmationMessage = (enabled: boolean) =>
        this.onSetting("modActionConfirmationMessage", enabled);

    onWordFilter = (enabled: boolean) => this.onSetting("wordFilter", enabled);

    onWordFilterBlacklist = (wordFilterBlacklist: string) =>
        this.onSetting("wordFilterBlacklist", wordFilterBlacklist);

    onWordFilterLevel = (level: number) =>
        this.onSetting("wordFilterLevel", level);

    onWordFilterAction = (action: number) =>
        this.onSetting("wordFilterAction", action);

    onWordFilterActionDuration = (duration: number) =>
        this.onSetting("wordFilterActionDuration", duration);

    onWordFilterActionDurationType = (type: number) =>
        this.onSetting("wordFilterActionDurationType", type);

    onSave = () => {
        const { settings } = this.state;
        const { guild } = this.props;
        updateSettings(guild, settings!);
    };

    onReset = async () => {
        const { guild } = this.props;
        await resetSettings(guild);
        const settings = await fetchSettings(this.props.guild);
        this.setState({ settings });
    };

    componentDidMount() {
        fetchSettings(this.props.guild).then(settings =>
            this.setState({ settings })
        );
    }

    render() {
        const { settings } = this.state;
        if (!settings) {
            return <Loading />;
        }

        return (
            <div className="setting-groups">
                <SettingsGroup title="Moderator Log" infoKey="modLog">
                    <Form.Row>
                        <Checkbox
                            label="Enable"
                            defaultValue={settings.modLog}
                            onChange={this.onModlog}
                        />

                        <StringSelect
                            label="Log Channel"
                            defaultOption={settings.modLogChannel.id}
                            onSelect={this.onModLogChannel}
                            options={settings.channels.map(channel => [
                                channel.id,
                                channel.name
                            ])}
                        />
                    </Form.Row>
                </SettingsGroup>
                <SettingsGroup title="Prefix Settings" infoKey="prefix">
                    <Form.Row>
                        <Checkbox
                            label="No Space Prefix"
                            defaultValue={settings.noSpacePrefix}
                            onChange={this.onNoSpacePrefix}
                        />

                        <TextInput
                            label="Prefix"
                            placeholder="-mod"
                            defaultValue={settings.prefix}
                            onChange={this.onPrefix}
                        />
                    </Form.Row>
                </SettingsGroup>
                <SettingsGroup
                    title="Welcome Messages"
                    infoKey="welcomeMessage"
                >
                    <Form.Row>
                        <Checkbox
                            label="Enable"
                            defaultValue={settings.welcomeMessage}
                            onChange={this.onWelcomeMessage}
                        />

                        <StringSelect
                            label="Channel"
                            defaultOption={settings.welcomeMessageChannel.id}
                            onSelect={this.onWelcomeMessageChannel}
                            options={settings.channels.map(channel => [
                                channel.id,
                                channel.name
                            ])}
                        />
                    </Form.Row>

                    <Form.Row>
                        <TextArea
                            label="Message"
                            defaultValue={settings.message}
                            placeholder="Welcome to $guild $user!"
                            rows={3}
                            onChange={this.onMessage}
                        />
                    </Form.Row>
                </SettingsGroup>
                <SettingsGroup title="Holding Room" infoKey="holdingRoom">
                    <Form.Row>
                        <Checkbox
                            label="Enable"
                            defaultValue={settings.holdingRoom}
                            onChange={this.onHoldingRoom}
                        />

                        <StringSelect
                            label="Role"
                            defaultOption={
                                settings.holdingRoomRole
                                    ? settings.holdingRoomRole.id
                                    : "none"
                            }
                            onSelect={this.onHoldingRoomRole}
                            options={[
                                ["none", "None"],
                                ...settings.roles.map(
                                    role =>
                                        [role.id, role.name] as [string, string]
                                )
                            ]}
                        />

                        <IntegerInput
                            label="Minutes"
                            defaultValue={settings.holdingRoomMinutes}
                            onChange={this.onHoldingRoomMinutes}
                        />
                    </Form.Row>
                </SettingsGroup>
                <SettingsGroup title="Join Captcha" infoKey="joinCaptcha">
                    <Form.Row>
                        <Checkbox
                            label="Enable"
                            defaultValue={settings.joinCaptcha}
                            onChange={this.onJoinCaptcha}
                        />
                    </Form.Row>
                </SettingsGroup>
                <SettingsGroup title="Invite Link Remover" infoKey="inviteLink">
                    <Form.Row>
                        <Checkbox
                            label="Enable"
                            defaultValue={settings.inviteLinkRemover}
                            onChange={this.onInviteLinkRemover}
                        />
                    </Form.Row>
                </SettingsGroup>
                <SettingsGroup title="Silent Commands" infoKey="silentCommands">
                    <Form.Row>
                        <Checkbox
                            label="Enable"
                            defaultValue={settings.silentCommands}
                            onChange={this.onSilentCommands}
                        />
                        <Checkbox
                            label="Confirmation Message"
                            defaultValue={settings.modActionConfirmationMessage}
                            onChange={this.onModActionConfirmationMessage}
                        />
                        <IntegerSelect
                            label="Silence Level"
                            defaultOption={settings.silentCommandsLevel}
                            onSelect={this.onSilentCommandsLevel}
                            options={[
                                [C.SILENT_COMMANDS_MOD_ONLY, "Moderation Only"],
                                [C.SILENT_COMMANDS_ALL, "All"]
                            ]}
                        />
                    </Form.Row>
                </SettingsGroup>
                <SettingsGroup title="Statistics" infoKey="statistics">
                    <Form.Row>
                        <Checkbox
                            label="Enable"
                            defaultValue={settings.statistics}
                            onChange={this.onStatistics}
                        />
                    </Form.Row>
                </SettingsGroup>
                <SettingsGroup title="Word Filter" infoKey="wordFilter">
                    <Form.Row>
                        <Checkbox
                            label="Enable"
                            defaultValue={settings.wordFilter}
                            onChange={this.onWordFilter}
                        />
                        <IntegerSelect
                            label="Filter Level"
                            defaultOption={settings.wordFilterLevel}
                            onSelect={this.onWordFilterLevel}
                            options={[
                                [C.WORD_FILTER_LEVEL_LOW, "Low"],
                                [C.WORD_FILTER_LEVEL_HIGH, "High"]
                            ]}
                        />
                    </Form.Row>
                    <Form.Row>
                        <TextArea
                            label="Blacklisted Words"
                            defaultValue={settings.wordFilterBlacklist || ""}
                            placeholder="Using Jim's default list..."
                            rows={3}
                            onChange={this.onWordFilterBlacklist}
                        />
                    </Form.Row>
                    <Form.Row>
                        <ModActionSelect
                            defaultAction={settings.wordFilterAction}
                            defaultDuration={settings.wordFilterActionDuration}
                            defaultDurationType={
                                settings.wordFilterActionDurationType
                            }
                            onAction={this.onWordFilterAction}
                            onDuration={this.onWordFilterActionDuration}
                            onDurationType={this.onWordFilterActionDurationType}
                        />
                    </Form.Row>
                </SettingsGroup>
                <Form.Row style={{ height: "16px" }} />
                <Form.Row style={{ justifyContent: "center" }}>
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
                </Form.Row>
            </div>
        );
    }
}
