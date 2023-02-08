import * as React from "react";
import queryString from "query-string";
import { routeToOauth, notifyError } from "../../utils";
import { getToken } from "../../endpoint/utils";
import { getTokenFromApi } from "../../endpoint/login";
import { useEffect } from "react";
import { useLocation } from "react-router";

export function Login(): JSX.Element | null {
    if (getToken()) {
        return null;
    }

    let location = useLocation();
    const query = queryString.parse(location.search);
    if (query.code == null) {
        routeToOauth();
        return null;
    }

    useEffect(() => {
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
            notifyError("Failed to login. Please try again later.")
        );
    })

    return null;
}
