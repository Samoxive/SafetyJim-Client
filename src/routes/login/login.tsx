import { parse } from "query-string";
import * as React from "react";
import { RouteComponentProps } from "react-router";
import { routeToOauth, notifyError } from "../../utils";
import { getToken } from "../../endpoint/utils";
import { getTokenFromApi } from "../../endpoint/login";

type LoginProps = RouteComponentProps;

export class Login extends React.Component<LoginProps> {
    render() {
        if (getToken()) {
            return null;
        }

        const query = parse(this.props.location.search);
        if (query.code == null) {
            routeToOauth();
            return null;
        }

        if (query.code != null) {
            getTokenFromApi(query.code as string)
                .then(
                    () =>
                        (window.location.href =
                            window.location.origin +
                            (query.state
                                ? decodeURIComponent(query.state as string)
                                : "/"))
                )
                .catch(() =>
                    notifyError("Failed to login.", "Please try again later.")
                );
        }

        return null;
    }
}
