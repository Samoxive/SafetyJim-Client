import * as React from "react";
import { Component } from "react";
import { Guild } from "../../../entities/guild";
import { Warn } from "../../../entities/modLogEntities";
import { fetchWarns } from "../../../endpoint/modLog";
import { Loading } from "../../../components/loading/loading";
import { Table, Image } from "react-bootstrap";

type WarnListRouteState = { warns?: Warn[] };

export class WarnListRoute extends Component<
    { guild: Guild },
    WarnListRouteState
> {
    state: WarnListRouteState = {
        warns: undefined
    };

    componentDidMount() {
        fetchWarns(this.props.guild).then(warns => this.setState({ warns }));
    }

    render() {
        const { warns } = this.state;
        if (!warns) {
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
                    {warns.map(warn => (
                        <tr key={warn.id}>
                            <td>{warn.id}</td>
                            <td>
                                <Image
                                    src={warn.user.avatarUrl}
                                    rounded
                                    width="32px"
                                    style={{ marginRight: "4px" }}
                                />
                                {warn.user.username}
                            </td>
                            <td>
                                <Image
                                    src={warn.moderatorUser.avatarUrl}
                                    rounded
                                    width="32px"
                                    style={{ marginRight: "4px" }}
                                />
                                {warn.moderatorUser.username}
                            </td>
                            <td>
                                {new Date(warn.actionTime * 1000).toUTCString()}
                            </td>
                            <td>{warn.reason}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        );
    }
}
