import { Button, Card, Form, Icon, Input, InputNumber, Popconfirm, Select, Switch, Tooltip } from 'antd';
import { inject, observer } from 'mobx-react';
import * as React from 'react';
import { Guild } from '../../../entities/guild';
import { GuildSettingsStore } from '../../../stores/guildSettingsStore';
import { LoginStore } from '../../../stores/loginStore';
import { handleError } from '../../../utils';
import './settings.css';

const TextArea = Input.TextArea;
const Option = Select.Option;

const INFO_TEXT: { [index: string]: string } = {
    'modLog': 'Enabling this will log moderation actions like bans, kicks, warnings in given channel.',
    'holdingRoom': 'Enabling this will assign the specified role to the new members after specified amount of time has passed. This role can be used to grant permissions to view exclusive channels, send messages and so on. Cannot be used while join captcha is enabled.',
    'joinCaptcha': 'Enabling this will cause Jim to send a captcha challenge to new members to get the role specified in holding room setting. Cannot be used while holding room is enabled.',
    'inviteLink': 'Enabling this will remove messages that contain any discord invite links, it will also kick new members that have an invite link as their username.',
    'welcomeMessage': 'Enabling this will make Jim welcome new members by messaging in specified channel. The welcome message can be customized. Placeholders "$user" and "$guild" can be used to message member\'s and your server\'s name. If holding room is enabled, "$minute" placeholder can be used to specify the time left until they get their role assigned.',
    'prefix': 'If no space prefix is enabled, Jim\'s commands can be issued without a space between command and the prefix (if prefix is set to "/", example usage will be "/help"). Prefix can also be customized.',
    'silentCommands': 'If enabled, the command message user sent will be deleted if the command was a moderation action like ban, kick or warning.',
    'statistics': 'Enabling this will allow Jim to collect statistics about your server. Jim never stores message contents. This setting isn\'t open to the public yet as it\'s a work-in-progress.'
};

const SettingsGroup = ({ children, title, infoKey }: { children: React.ReactChild[] | React.ReactChild, title: string, infoKey: string }) => {
    const titleNode = (
        <div style={{ display: 'flex' }}>
            <div>{title}</div>
            <Tooltip title={INFO_TEXT[infoKey]}>
                <Icon type="info-circle" style={{ marginLeft: '8px', marginTop: '4px' }} />
            </Tooltip>
        </div>
    );

    return (
        <Card title={titleNode} className="setting-group">
            {children}
        </Card>
    );
};

interface SettingsRouteProps {
    guild: Guild;
    loginStore?: LoginStore;
    guildSettingsStore?: GuildSettingsStore;
}

@inject('loginStore', 'guildSettingsStore')
@observer
export class SettingsRoute extends React.Component<SettingsRouteProps> {
    getGuildState = () => this.props.guildSettingsStore!.guildSettingsGetter(this.props.guild.id)!

    onModlog = (enabled: boolean) => this.getGuildState().modLog = enabled;
    onModLogChannel = (channelId: string) => this.getGuildState().modLogChannel = this.getGuildState().channels.find(channel => channel.id === channelId)!;
    onHoldingRoom = (enabled: boolean) => this.getGuildState().holdingRoom = enabled;
    onHoldingRoomRole = (roleId?: string) => this.getGuildState().holdingRoomRole = this.getGuildState().roles.find(role => role.id === roleId);
    onHoldingRoomMinutes = (minutes: number) => this.getGuildState().holdingRoomMinutes = minutes;
    onInviteLinkRemover = (enabled: boolean) => this.getGuildState().inviteLinkRemover = enabled;
    onWelcomeMessage = (enabled: boolean) => this.getGuildState().welcomeMessage = enabled;
    onMessage = (e: React.SyntheticEvent) => this.getGuildState().message = (e.target as any).value as string;
    onWelcomeMessageChannel = (channelId: string) => this.getGuildState().welcomeMessageChannel = this.getGuildState().channels.find(channel => channel.id === channelId)!;
    onPrefix = (e: React.SyntheticEvent) => this.getGuildState().prefix = (e.target as any).value as string;
    onSilentCommands = (enabled: boolean) => this.getGuildState().silentCommands = enabled;
    onNoSpacePrefix = (enabled: boolean) => this.getGuildState().noSpacePrefix = enabled;
    onStatistics = (enabled: boolean) => this.getGuildState().statistics = enabled;
    onJoinCaptcha = (enabled: boolean) => this.getGuildState().joinCaptcha = enabled;

    onSubmit = () => {
        const { guild, loginStore, guildSettingsStore } = this.props;
        const settings = guildSettingsStore!.guildSettingsGetter(guild.id);
        guildSettingsStore!.updateSettings(loginStore!, guild, settings!)
            .catch(handleError('Could not update guild settings!'))
    }

    onReset = () => {
        const { guild, loginStore, guildSettingsStore } = this.props;
        guildSettingsStore!.resetSettings(loginStore!, guild)
            .catch(handleError('Could not reset guild settings!'));
    }

    componentWillMount() {
        const { guild, loginStore, guildSettingsStore } = this.props;
        guildSettingsStore!.fetchSettings(loginStore!, guild)
            .catch(handleError('Could not fetch guild settings!'));
    }
    render() {
        const { guild, guildSettingsStore } = this.props;
        const settings = guildSettingsStore!.guildSettingsGetter(guild.id);
        if (settings == null || guildSettingsStore!.isLoading) {
            return (<Icon type="loading" />);
        }

        return (
            <>
                <div style={{ display: 'flex', justifyContent: 'center', marginTop: '16px', flexDirection: 'column', justifyItems: 'center', alignItems: 'center' }} >
                    <Form layout="inline" className="setting-groups" style={{ maxWidth: '1100px' }}>
                        <SettingsGroup title="Moderator Log" infoKey="modLog">
                            <Form.Item label="Enable">
                                <Switch onChange={this.onModlog} defaultChecked={settings.modLog} />
                            </Form.Item>
                            <Form.Item label="Channel">
                                <Select
                                    onChange={this.onModLogChannel}
                                    defaultValue={settings.modLogChannel.name}
                                    style={{ width: '100px' }}
                                >
                                    {
                                        settings.channels.map(channel => (
                                            <Option key={channel.id} value={channel.id}>{channel.name}</Option>
                                        ))
                                    }
                                </Select>
                            </Form.Item>
                        </SettingsGroup>
                        <SettingsGroup title="Holding Room" infoKey="holdingRoom">
                            <Form.Item label="Enable">
                                <Switch onChange={this.onHoldingRoom} defaultChecked={settings.holdingRoom} />
                            </Form.Item>
                            <Form.Item label="Role">
                                <Select
                                    onChange={this.onHoldingRoomRole as any}
                                    defaultValue={settings.holdingRoomRole ? settings.holdingRoomRole.id : ''}
                                    style={{ width: '100px' }}
                                >
                                    <Option key={''} value={''} />
                                    {
                                        settings.roles.map(role => (
                                            <Option key={role.id} value={role.id}>{role.name}</Option>
                                        ))
                                    }
                                </Select>
                            </Form.Item>
                            <Form.Item label="Minutes">
                                <InputNumber onChange={this.onHoldingRoomMinutes} defaultValue={settings.holdingRoomMinutes} />
                            </Form.Item>
                        </SettingsGroup>
                        <SettingsGroup title="Join Captcha" infoKey="joinCaptcha">
                            <Form.Item label="Enable">
                                <Switch onChange={this.onJoinCaptcha} defaultChecked={settings.joinCaptcha} />
                            </Form.Item>
                        </SettingsGroup>
                        <SettingsGroup title="Invite Link Remover" infoKey={'inviteLink'}>
                            <Form.Item label="Enable">
                                <Switch onChange={this.onInviteLinkRemover} defaultChecked={settings.inviteLinkRemover} />
                            </Form.Item>
                        </SettingsGroup>
                        <SettingsGroup title="Welcome Messages" infoKey="welcomeMessage">
                            <Form.Item label="Enable">
                                <Switch onChange={this.onWelcomeMessage} defaultChecked={settings.welcomeMessage} />
                            </Form.Item>
                            <Form.Item label="Channel">
                                <Select
                                    onChange={this.onWelcomeMessageChannel}
                                    defaultValue={settings.welcomeMessageChannel.name}
                                    style={{ width: '100px' }}
                                >
                                    {
                                        settings.channels.map(channel => (
                                            <Option key={channel.id} value={channel.id}>{channel.name}</Option>
                                        ))
                                    }
                                </Select>
                            </Form.Item>
                            <Form.Item label="Message">
                                <TextArea rows={1} onChange={this.onMessage} defaultValue={settings.message} />
                            </Form.Item>
                        </SettingsGroup>
                        <SettingsGroup title="Prefix Settings" infoKey="prefix">
                            <Form.Item label="No Space Prefix Enable">
                                <Switch onChange={this.onNoSpacePrefix} defaultChecked={settings.noSpacePrefix} />
                            </Form.Item>
                            <Form.Item label="Prefix">
                                <Input onChange={this.onPrefix} defaultValue={settings.prefix} />
                            </Form.Item>
                        </SettingsGroup>
                        <SettingsGroup title="Silent Commands" infoKey="silentCommands">
                            <Form.Item label="Enable">
                                <Switch onChange={this.onSilentCommands} defaultChecked={settings.silentCommands} />
                            </Form.Item>
                        </SettingsGroup>
                        <SettingsGroup title="Statistics" infoKey="statistics">
                            <Form.Item label="Enable">
                                <Switch onChange={this.onStatistics} defaultChecked={settings.statistics} />
                            </Form.Item>
                        </SettingsGroup>
                    </Form>
                    <div style={{ marginTop: '8px' }}>
                        <Button type="primary" onClick={this.onSubmit} style={{ marginLeft: '4px' }}>
                            Update
                        </Button>
                        <Popconfirm
                            title="Are you sure you want to reset settings?"
                            onConfirm={this.onReset}
                            okText="Reset"
                            cancelText="No"
                        >
                            <Button type="danger" style={{ marginLeft: '4px' }}>Reset</Button>
                        </Popconfirm>
                    </div>
                </div>
            </>
        );
    }
}