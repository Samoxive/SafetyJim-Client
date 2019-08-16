import * as React from "react";
import { Component } from "react";
import { Guild } from "../../../entities/guild";
import { Kick } from "../../../entities/modLogEntities";
import { fetchKicks } from "../../../endpoint/modLog";
import { Loading } from "../../../components/loading/loading";
import { Table, Image } from "react-bootstrap";

type KickListRouteState = { kicks?: Kick[] };

export class KickListRoute extends Component<
    { guild: Guild },
    KickListRouteState
> {
    state: KickListRouteState = {
        kicks: undefined
    };

    componentDidMount() {
        fetchKicks(this.props.guild).then(kicks => this.setState({ kicks }));
    }

    render() {
        const { kicks } = this.state;
        if (!kicks) {
            return <Loading />;
        }

        return (
            <Table striped>
                <thead>
                    <tr>
                        <th>#id</th>
                        <th>User</th>
                        <th>Moderator</th>
                        <th>Issued on</th>
                        <th>Reason</th>
                    </tr>
                </thead>
                <tbody>
                    {kicks.map(kick => (
                        <tr key={kick.id}>
                            <td>{kick.id}</td>
                            <td>
                                <Image
                                    src={kick.user.avatarUrl}
                                    rounded
                                    width="32px"
                                    style={{ marginRight: "4px" }}
                                />
                                {kick.user.username}
                            </td>
                            <td>
                                <Image
                                    src={kick.moderatorUser.avatarUrl}
                                    rounded
                                    width="32px"
                                    style={{ marginRight: "4px" }}
                                />
                                {kick.moderatorUser.username}
                            </td>
                            <td>
                                {new Date(kick.actionTime * 1000).toUTCString()}
                            </td>
                            <td>{kick.reason}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        );
    }
}
