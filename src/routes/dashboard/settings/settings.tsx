import * as React from "react";
import { Guild } from "../../../entities/guild";
import "./settings.css";
import { OverlayTrigger, Form, Button, Popover, Row, Stack } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    GuildSettings,
    GuildSettingsConstants,
} from "../../../entities/guildSettings";
import { Component } from "react";
import {
    updateSettings,
    fetchSettings,
    resetSettings,
} from "../../../endpoint/guildSettings";
import { INFO_TEXT } from "./settings_resource";
import { Loading } from "../../../components/loading/loading";
import Markdown from "react-markdown";
import { ModActionSelect, PrivacySelect } from "./settings_form_utils";
import {
    Checkbox,
    IntegerInput,
    IntegerSelect,
    StringSelect,
    TextArea,
} from "../../../components/form_components";
import { dashboardRoute, DashboardRouteProps } from "../dashboard";

const C = GuildSettingsConstants;

type SettingsGroupProps = {
    children: React.ReactChild[] | React.ReactChild;
    title: string;
    infoKey: string;
};

const SettingsGroup = ({ children, title, infoKey }: SettingsGroupProps) => (
    <Form className="setting-group">
        <Row>
            <h5>{title}</h5>
        </Row>
        <Row>
            <h6>
                <small className="text-muted setting-tooltip">
                    <Markdown children={INFO_TEXT[infoKey]} />
                </small>
            </h6>
        </Row>
        {children}
    </Form>
);

type SettingsRouteProps = DashboardRouteProps & { guild: Guild };
type SettingsRouteState = { settings?: GuildSettings };

export class ActualSettingsRoute extends Component<
    SettingsRouteProps,
    SettingsRouteState
> {
    state: SettingsRouteState = {
        settings: undefined,
    };

    // onChange events can only fire when settings are fetched so we are sure that settings exist.
    // We also don't care if user modified the DOM or did other things and managed to
    // find a channel id that doesn't exist
    findChannel = (id: string) => {
        const channel = this.state.settings!.channels.find(
            (channel) => channel.id === id
        );
        return channel || null;
    };

    findRole = (id: string) => {
        const role = this.state.settings!.roles.find((role) => role.id === id);
        return role || null;
    };

    onSetting = <K extends keyof GuildSettings>(
        key: K,
        value: GuildSettings[K]
    ) =>
        this.setState((state) => ({
            ...state,
            settings: {
                ...state.settings!,
                [key]: value,
            },
        }));

    onModlog = (enabled: boolean) => this.onSetting("modLog", enabled);

    onModLogChannel = (channelId: string) =>
        this.onSetting("modLogChannel", this.findChannel(channelId));

    onReportChannel = (channelId: string) =>
        this.onSetting("reportChannel", this.findChannel(channelId));

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

    onJoinCaptcha = (enabled: boolean) =>
        this.onSetting("joinCaptcha", enabled);

    onWordFilter = (enabled: boolean) => this.onSetting("wordFilter", enabled);

    onWordFilterBlocklist = (wordFilterBlocklist: string) =>
        this.onSetting("wordFilterBlocklist", wordFilterBlocklist);

    onWordFilterLevel = (level: number) =>
        this.onSetting("wordFilterLevel", level);

    onWordFilterAction = (action: number) =>
        this.onSetting("wordFilterAction", action);

    onWordFilterActionDuration = (duration: number) =>
        this.onSetting("wordFilterActionDuration", duration);

    onWordFilterActionDurationType = (type: number) =>
        this.onSetting("wordFilterActionDurationType", type);

    onInviteLinkRemoverAction = (action: number) =>
        this.onSetting("inviteLinkRemoverAction", action);

    onInviteLinkRemoverActionDuration = (duration: number) =>
        this.onSetting("inviteLinkRemoverActionDuration", duration);

    onInviteLinkRemoverActionDurationType = (type: number) =>
        this.onSetting("inviteLinkRemoverActionDurationType", type);

    onPrivacySettings = (mode: number) =>
        this.onSetting("privacySettings", mode);

    onPrivacyModLog = (mode: number) => this.onSetting("privacyModLog", mode);

    onSoftbanThreshold = (threshold: number) =>
        this.onSetting("softbanThreshold", threshold);
    onSoftbanAction = (action: number) =>
        this.onSetting("softbanAction", action);
    onSoftbanActionDuration = (duration: number) =>
        this.onSetting("softbanActionDuration", duration);
    onSoftbanActionDurationType = (type: number) =>
        this.onSetting("softbanActionDurationType", type);

    onKickThreshold = (threshold: number) =>
        this.onSetting("kickThreshold", threshold);
    onKickAction = (action: number) => this.onSetting("kickAction", action);
    onKickActionDuration = (duration: number) =>
        this.onSetting("kickActionDuration", duration);
    onKickActionDurationType = (type: number) =>
        this.onSetting("kickActionDurationType", type);

    onMuteThreshold = (threshold: number) =>
        this.onSetting("muteThreshold", threshold);
    onMuteAction = (action: number) => this.onSetting("muteAction", action);
    onMuteActionDuration = (duration: number) =>
        this.onSetting("muteActionDuration", duration);
    onMuteActionDurationType = (type: number) =>
        this.onSetting("muteActionDurationType", type);

    onWarnThreshold = (threshold: number) =>
        this.onSetting("warnThreshold", threshold);
    onWarnAction = (action: number) => this.onSetting("warnAction", action);
    onWarnActionDuration = (duration: number) =>
        this.onSetting("warnActionDuration", duration);
    onWarnActionDurationType = (type: number) =>
        this.onSetting("warnActionDurationType", type);

    onModsCanEditTags = (canThey: boolean) =>
        this.onSetting("modsCanEditTags", canThey);

    onSpamFilter = (enabled: boolean) => this.onSetting("spamFilter", enabled);

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
        fetchSettings(this.props.guild).then((settings) =>
            this.setState({ settings })
        );
    }

    render() {
        const { settings: s } = this.state;
        if (!s) {
            return <Loading />;
        }

        return (
            <div className="setting-groups">
                <SettingsGroup title="Moderator Log" infoKey="modLog">
                    <Row>
                        <Checkbox
                            label="Enable"
                            defaultValue={s.modLog}
                            onChange={this.onModlog}
                        />

                        <StringSelect
                            label="Log Channel"
                            defaultOption={
                                s.modLogChannel ? s.modLogChannel.id : "none"
                            }
                            onSelect={this.onModLogChannel}
                            options={[
                                ["none", "None"],
                                ...s.channels.map(
                                    (channel) =>
                                        [channel.id, channel.name] as [
                                            string,
                                            string
                                        ]
                                ),
                            ]}
                        />

                        <StringSelect
                            label="Report Channel"
                            defaultOption={
                                s.reportChannel ? s.reportChannel.id : "None"
                            }
                            onSelect={this.onReportChannel}
                            options={[
                                ["none", "None"],
                                ...s.channels.map(
                                    (channel) =>
                                        [channel.id, channel.name] as [
                                            string,
                                            string
                                        ]
                                ),
                            ]}
                        />
                    </Row>
                </SettingsGroup>
                <SettingsGroup
                    title="Welcome Messages"
                    infoKey="welcomeMessage"
                >
                    <Row>
                        <Checkbox
                            label="Enable"
                            defaultValue={s.welcomeMessage}
                            onChange={this.onWelcomeMessage}
                        />

                        <StringSelect
                            label="Channel"
                            defaultOption={
                                s.welcomeMessageChannel
                                    ? s.welcomeMessageChannel.id
                                    : "none"
                            }
                            onSelect={this.onWelcomeMessageChannel}
                            options={[
                                ["none", "None"],
                                ...s.channels.map(
                                    (channel) =>
                                        [channel.id, channel.name] as [string, string]
                                ),
                            ]}
                        />
                    </Row>

                    <Row>
                        <TextArea
                            label="Message"
                            defaultValue={s.message}
                            placeholder="Welcome to $guild $user!"
                            rows={3}
                            onChange={this.onMessage}
                        />
                    </Row>
                </SettingsGroup>
                <SettingsGroup title="Holding Room" infoKey="holdingRoom">
                    <Row>
                        <Checkbox
                            label="Enable"
                            defaultValue={s.holdingRoom}
                            onChange={this.onHoldingRoom}
                        />

                        <StringSelect
                            label="Role"
                            defaultOption={
                                s.holdingRoomRole
                                    ? s.holdingRoomRole.id
                                    : "none"
                            }
                            onSelect={this.onHoldingRoomRole}
                            options={[
                                ["none", "None"],
                                ...s.roles.map(
                                    (role) =>
                                        [role.id, role.name] as [string, string]
                                ),
                            ]}
                        />

                        <IntegerInput
                            label="Minutes"
                            defaultValue={s.holdingRoomMinutes}
                            onChange={this.onHoldingRoomMinutes}
                        />
                    </Row>
                </SettingsGroup>
                <SettingsGroup title="Join Captcha" infoKey="joinCaptcha">
                    <Row>
                        <Checkbox
                            label="Enable"
                            defaultValue={s.joinCaptcha}
                            onChange={this.onJoinCaptcha}
                        />
                    </Row>
                </SettingsGroup>
                <SettingsGroup title="Invite Link Remover" infoKey="inviteLink">
                    <Row>
                        <Checkbox
                            label="Enable"
                            defaultValue={s.inviteLinkRemover}
                            onChange={this.onInviteLinkRemover}
                        />
                        <ModActionSelect
                            defaultAction={s.inviteLinkRemoverAction}
                            defaultDuration={s.inviteLinkRemoverActionDuration}
                            defaultDurationType={
                                s.inviteLinkRemoverActionDurationType
                            }
                            onAction={this.onInviteLinkRemoverAction}
                            onDuration={this.onInviteLinkRemoverActionDuration}
                            onDurationType={
                                this.onInviteLinkRemoverActionDurationType
                            }
                        />
                    </Row>
                </SettingsGroup>
                <SettingsGroup title="Word Filter" infoKey="wordFilter">
                    <Row>
                        <Checkbox
                            label="Enable"
                            defaultValue={s.wordFilter}
                            onChange={this.onWordFilter}
                        />
                        <IntegerSelect
                            label="Filter Level"
                            defaultOption={s.wordFilterLevel}
                            onSelect={this.onWordFilterLevel}
                            options={[
                                [C.WORD_FILTER_LEVEL_LOW, "Low"],
                                [C.WORD_FILTER_LEVEL_HIGH, "High"],
                            ]}
                        />
                    </Row>
                    <Row>
                        <TextArea
                            label="Blocklisted Words"
                            defaultValue={s.wordFilterBlocklist || ""}
                            placeholder="Using Jim's default list..."
                            rows={3}
                            onChange={this.onWordFilterBlocklist}
                        />
                    </Row>
                    <Row>
                        <ModActionSelect
                            defaultAction={s.wordFilterAction}
                            defaultDuration={s.wordFilterActionDuration}
                            defaultDurationType={s.wordFilterActionDurationType}
                            onAction={this.onWordFilterAction}
                            onDuration={this.onWordFilterActionDuration}
                            onDurationType={this.onWordFilterActionDurationType}
                        />
                    </Row>
                </SettingsGroup>
                <SettingsGroup title="Privacy" infoKey="privacy">
                    <Row>
                        <PrivacySelect
                            label="Settings"
                            defaultPrivacy={s.privacySettings}
                            onPrivacy={this.onPrivacySettings}
                        />
                        <PrivacySelect
                            label="Moderator Log"
                            defaultPrivacy={s.privacyModLog}
                            onPrivacy={this.onPrivacyModLog}
                        />
                    </Row>
                </SettingsGroup>
                <SettingsGroup title="Automatic Actions" infoKey="autoActions">
                    <Row>
                        <IntegerInput
                            label="After x count of soft bans"
                            defaultValue={s.softbanThreshold}
                            onChange={this.onSoftbanThreshold}
                        />
                        <ModActionSelect
                            defaultAction={s.softbanAction}
                            defaultDuration={s.softbanActionDuration}
                            defaultDurationType={s.softbanActionDurationType}
                            onAction={this.onSoftbanAction}
                            onDuration={this.onSoftbanActionDuration}
                            onDurationType={this.onSoftbanActionDurationType}
                        />
                    </Row>
                    <Row>
                        <IntegerInput
                            label="After x count of kicks"
                            defaultValue={s.kickThreshold}
                            onChange={this.onKickThreshold}
                        />
                        <ModActionSelect
                            defaultAction={s.kickAction}
                            defaultDuration={s.kickActionDuration}
                            defaultDurationType={s.kickActionDurationType}
                            onAction={this.onKickAction}
                            onDuration={this.onKickActionDuration}
                            onDurationType={this.onKickActionDurationType}
                        />
                    </Row>
                    <Row>
                        <IntegerInput
                            label="After x count of mutes"
                            defaultValue={s.muteThreshold}
                            onChange={this.onMuteThreshold}
                        />
                        <ModActionSelect
                            defaultAction={s.muteAction}
                            defaultDuration={s.muteActionDuration}
                            defaultDurationType={s.muteActionDurationType}
                            onAction={this.onMuteAction}
                            onDuration={this.onMuteActionDuration}
                            onDurationType={this.onMuteActionDurationType}
                        />
                    </Row>
                    <Row>
                        <IntegerInput
                            label="After x count of warns"
                            defaultValue={s.warnThreshold}
                            onChange={this.onWarnThreshold}
                        />
                        <ModActionSelect
                            defaultAction={s.warnAction}
                            defaultDuration={s.warnActionDuration}
                            defaultDurationType={s.warnActionDurationType}
                            onAction={this.onWarnAction}
                            onDuration={this.onWarnActionDuration}
                            onDurationType={this.onWarnActionDurationType}
                        />
                    </Row>
                </SettingsGroup>
                <SettingsGroup title="Tag Permission" infoKey="tagPermission">
                    <Row>
                        <Checkbox
                            label="Mods can edit tags"
                            defaultValue={s.modsCanEditTags}
                            onChange={this.onModsCanEditTags}
                        />
                    </Row>
                </SettingsGroup>
                <SettingsGroup title="Spam Filter" infoKey="spamFilter">
                    <Row>
                        <Checkbox
                            label="Enable"
                            defaultValue={s.spamFilter}
                            onChange={this.onSpamFilter}
                        />
                    </Row>
                </SettingsGroup>
                <Row style={{ height: "16px" }} />
                <Stack direction="horizontal" style={{ "justifyContent": "space-evenly" }}>
                    <div>
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
                                            icon="circle-exclamation"
                                            style={{ marginRight: "4px" }}
                                        />
                                        Reset Settings
                                    </Button>
                                </Popover>
                            }
                        >
                            <Button variant="danger">Reset</Button>
                        </OverlayTrigger>
                    </div>
                    <div>
                        <Button
                            variant="primary"
                            onClick={this.onSave}
                        >
                            Save
                        </Button>
                    </div>
                </Stack>
            </div>
        );
    }
}

export const SettingsRoute = dashboardRoute(ActualSettingsRoute);