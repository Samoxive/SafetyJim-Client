import { Icon, Modal, notification } from 'antd';
import { inject, observer } from 'mobx-react';
import * as React from 'react';
import { Redirect, Route, RouteComponentProps } from 'react-router';
import { Guild } from '../../entities/guild';
import { routeToOauth } from '../../environment';
import { LoginStore } from '../../stores/loginStore';
import { SelfUserStore } from '../../stores/selfUserStore';
import { SettingsRoute } from './settings/settings';

type GenericGuildRouteProps  = {guild: Guild} & any;

function injectGuild(guild: Guild, Component: React.ComponentType<GenericGuildRouteProps>): React.StatelessComponent<any> {
    return () => (<Component guild={guild} />);
}

type DashboardProps = RouteComponentProps<{ guildId: string }> & { loginStore?: LoginStore, selfUserStore?: SelfUserStore }

@inject('loginStore', 'selfUserStore')
@observer
export class Dashboard extends React.Component<DashboardProps, { redirectHome: boolean, collapsed: boolean }> {
    state = {
        redirectHome: false,
        collapsed: false,
    }

    onCollapse = () => this.setState({ ...this.state, collapsed: !this.state.collapsed })

    render() {
        const { loginStore, selfUserStore, match, location } = this.props;
        const { redirectHome } = this.state;
        const path = match.path;
        const guildId = match.params.guildId;

        if (!loginStore!.token) {
            if (redirectHome) {
                return (<Redirect to="/" />);
            } else {
                Modal.confirm({
                    okText: 'Login',
                    cancelText: 'Home',
                    onCancel: () => this.setState({ redirectHome: true }),
                    onOk: () => routeToOauth(location!.pathname)
                })

                return (<></>);
            }
        }

        if (selfUserStore!.isLoading) {
            return (<Icon type="loading" />);
        }

        const selectedGuild = selfUserStore!.self!.guilds.find(guild => guild.id === guildId)
        if (selectedGuild == null) {
            notification.error({
                message: 'Invalid URL',
                description: 'You have navigated to an invalid URL, redirecting...'
            });
            return <Redirect to="/" />
        }

        return (
            <>
                <Route path={`${path}/settings`} component={injectGuild(selectedGuild, SettingsRoute)} />
            </>
        );
    }
}