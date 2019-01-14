import { Button, Card, Form, Icon, Input, InputNumber, Popconfirm, Select, Switch } from 'antd';
import { inject, observer } from 'mobx-react';
import * as React from 'react';
import { Guild } from '../../../entities/guild';
import { GuildSettingsStore } from '../../../stores/guildSettingsStore';
import { LoginStore } from '../../../stores/loginStore';
import { handleError } from '../../../utils';
import './settings.css';

const TextArea = Input.TextArea;
const Option = Select.Option;

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
                    <Form layout="inline" className="setting-groups" style={{ maxWidth: '900px' }}>
                        <Card title="Moderator Log" className="setting-group">
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
                        </Card>
                        <Card title="Holding Room" className="setting-group">
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
                        </Card>
                        <Card title="Invite Link Remover" className="setting-group">
                            <Form.Item label="Enable">
                                <Switch onChange={this.onInviteLinkRemover} defaultChecked={settings.inviteLinkRemover} />
                            </Form.Item>
                        </Card>
                        <Card title="Welcome Messages" className="setting-group">
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
                        </Card>
                        <Card title="Prefix Settings" className="setting-group">
                            <Form.Item label="No Space Prefix Enable">
                                <Switch onChange={this.onNoSpacePrefix} defaultChecked={settings.noSpacePrefix} />
                            </Form.Item>
                            <Form.Item label="Prefix">
                                <Input onChange={this.onPrefix} defaultValue={settings.prefix} />
                            </Form.Item>
                        </Card>
                        <Card title="Silent Commands" className="setting-group">
                            <Form.Item label="Enable">
                                <Switch onChange={this.onSilentCommands} defaultChecked={settings.silentCommands} />
                            </Form.Item>
                        </Card>
                        <Card title="Statistics" className="setting-group">
                            <Form.Item label="Enable">
                                <Switch onChange={this.onStatistics} defaultChecked={settings.statistics} />
                            </Form.Item>
                        </Card>
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