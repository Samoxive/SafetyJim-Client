import { Avatar, Layout, Menu } from 'antd';
import * as React from 'react';
import { Link } from 'react-router-dom';
import Jimbo from './assets/jimbo.png';

const { Header } = Layout;

class Navbar extends React.Component {
    public render() {
        return (
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
                    </Menu>
                </Header>
            </Layout>
        );
    }
}

export default Navbar;
