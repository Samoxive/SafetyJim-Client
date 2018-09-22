import { Avatar, Icon, Layout, Menu } from 'antd';
import { inject, observer } from 'mobx-react';
import * as React from 'react';
import { BrowserRouter as Router, Link, Route } from 'react-router-dom';
import './App.css';
import Jimbo from './assets/jimbo.png';
import { Commands } from './routes/commands/commands';
import { Home } from './routes/home/home';
import { Login } from './routes/login/login';
import { LoginStore } from './stores/loginStore';
import { SelfUserStore } from './stores/selfUserStore';

const { Header, Content } = Layout;

@inject('loginStore', 'selfUserStore')
@observer
export class App extends React.Component<{loginStore?: LoginStore, selfUserStore?: SelfUserStore}> {
    render() {
        return (
            <Router>
                <Layout>
                    <Header style={{padding: '0px'}}>
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
                            <Menu.Item>
                                <Link to="/">
                                    Dashboard
                                </Link>
                            </Menu.Item>
                            {
                                this.props.loginStore!.token == null ? (
                                    <Menu.Item>
                                        <Link to="/login">
                                            Login
                                        </Link>
                                    </Menu.Item>
                                ) : (
                                    <Menu.Item>
                                        {this.props.selfUserStore!.isLoading ? (
                                            <Icon type="loading" theme="outlined" />
                                        ) : (
                                            <Avatar src={this.props.selfUserStore!.self!.avatarUrl}>
                                                {this.props.selfUserStore!.self!.name}
                                            </Avatar>
                                        )}
                                    </Menu.Item>
                                )
                            }
                        </Menu>
                    </Header>
                    <Content>
                        <Route exact={true} path="/" component={Home} />
                        <Route path="/commands" component={Commands} />
                        <Route path="/login" component={Login} />
                    </Content>
                </Layout>
            </Router>
        );
    }
} 

