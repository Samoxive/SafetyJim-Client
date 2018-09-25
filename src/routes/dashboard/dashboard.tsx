import { Modal } from 'antd';
import { inject, observer } from 'mobx-react';
import * as React from 'react';
import { Redirect, RouteProps } from 'react-router';
import { routeToOauth } from '../../environment';
import { LoginStore } from '../../stores/loginStore';

type DashboardProps = RouteProps & { loginStore?: LoginStore }

@inject('loginStore')
@observer
export class Dashboard extends React.Component<DashboardProps, { redirectHome: boolean }> {
    state = {
        redirectHome: false,
    }

    render() {
        const { loginStore, location } = this.props;
        const { redirectHome } = this.state;

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
        } else {
            return (<div>Success!</div>);
        }
    }
}