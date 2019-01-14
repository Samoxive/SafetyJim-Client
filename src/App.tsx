import { Avatar, Icon, Layout, Menu } from 'antd';
import { inject, observer } from 'mobx-react';
import * as React from 'react';
import { BrowserRouter as Router, Link, Route, Switch } from 'react-router-dom';
import './App.css';
import Jimbo from './assets/jimbo.png';
import { Commands } from './routes/commands/commands';
import { Dashboard } from './routes/dashboard/dashboard';
import { Home } from './routes/home/home';
import { Login } from './routes/login/login';
import { LoginStore } from './stores/loginStore';
import { SelfUserStore } from './stores/selfUserStore';

const { Header, Content } = Layout;

const NotFound = () => (
    <div>Not Found!</div>
);

@inject('loginStore', 'selfUserStore')
@observer
class NavBar extends React.Component<{ loginStore?: LoginStore, selfUserStore?: SelfUserStore }> {
    render() {
        const { loginStore, selfUserStore } = this.props;
        return (
            <Menu mode="horizontal" theme="dark" style={{ lineHeight: '64px' }}>
                <Menu.Item>
                    <Avatar src={Jimbo} />
                </Menu.Item>
                <Menu.Item>
                    <Link to="/">
                        Safety Jim
                    </Link>
                </Menu.Item>
                <Menu.Item>
                    <Link to="/commands">
                        Commands
                    </Link>
                </Menu.Item>
                {
                    loginStore!.token == null ? (
                        <Menu.Item>
                            <Link to="/login">
                                Login
                            </Link>
                        </Menu.Item>
                    ) : (
                            <Menu.SubMenu title={
                                selfUserStore!.isLoading ? (
                                    <Icon type="loading" />
                                ) : (
                                        <>
                                            <Avatar src={selfUserStore!.self!.avatarUrl} />
                                            <span style={{ marginLeft: '12px' }}>{selfUserStore!.self!.name}</span>
                                        </>
                                    )}
                            >
                                {
                                    selfUserStore!.isLoading ? (
                                        <Menu.Item>
                                            <Icon type="loading" />
                                        </Menu.Item>
                                    ) : (
                                            selfUserStore!.self!.guilds.map((guild) => (
                                                <Menu.SubMenu key={guild.id}
                                                    title={
                                                        <span>
                                                            <Avatar src={guild.iconUrl} style={{ marginRight: '16px' }} />
                                                            <span>{guild.name}</span>
                                                        </span>
                                                    }
                                                >
                                                    <Menu.Item>
                                                        <Link to={`/dashboard/${guild.id}/settings`}>
                                                            <Icon type="setting" />
                                                            <span>Settings</span>
                                                        </Link>
                                                    </Menu.Item>
                                                </Menu.SubMenu>
                                            ))
                                        )
                                }
                                <Menu.Item onClick={loginStore!.logout} >
                                    <Icon type="logout" />
                                    <span>Logout</span>
                                </Menu.Item>
                            </Menu.SubMenu>
                        )
                }
            </Menu>
        )
    }
}

@inject('loginStore', 'selfUserStore')
@observer
export class App extends React.Component<{ loginStore?: LoginStore, selfUserStore?: SelfUserStore }> {
    render() {
        return (
            <Router>
                <Layout>
                    <Header style={{ padding: '0px' }}>
                        <NavBar />
                    </Header>
                    <Content style={{ background: 'white' }}>
                        <Switch>
                            <Route exact={true} path="/" component={Home} />
                            <Route path="/commands" component={Commands} />
                            <Route path="/login" component={Login} />
                            <Route path="/dashboard/:guildId" component={Dashboard} />
                            <Route component={NotFound} />
                        </Switch>
                    </Content>
                </Layout>
            </Router>
        );
    }
}

