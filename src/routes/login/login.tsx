import { notification } from 'antd';
import { inject, observer } from 'mobx-react';
import { parse } from 'query-string';
import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { routeToOauth } from '../../environment';
import { LoginStore } from '../../stores/loginStore';

type LoginProps = RouteComponentProps & { loginStore?: LoginStore };

@inject('loginStore')
@observer
export class Login extends React.Component<LoginProps> {
    render() {
        if (this.props.loginStore!.token != null) {
            return null;
        }

        const query = parse(this.props.location.search)
        if (query.code == null) {
            routeToOauth();
            return null;
        }

        if (query.code != null) {
            this.props.loginStore!.getToken(query.code as string)
                .then(() => location.href = location.origin + (query.state ? decodeURIComponent(query.state as string) : '/'))
                .catch(() => notification.error({ message: 'Failed to login.', description: 'Please try again later.' }));
        }

        return null;
    }
}
