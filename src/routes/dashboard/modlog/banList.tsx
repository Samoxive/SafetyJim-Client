import * as React from "react";
import { Component } from "react";
import { Guild } from "../../../entities/guild";
import { Ban } from "../../../entities/modLogEntities";
import { fetchBans } from "../../../endpoint/modLog";
import { Loading } from "../../../components/loading/loading";
import { Table, Image } from "react-bootstrap";

type BanListRouteState = { bans?: Ban[] };

export class BanListRoute extends Component<
    { guild: Guild },
    BanListRouteState
> {
    state: BanListRouteState = {
        bans: undefined
    };

    componentDidMount() {
        fetchBans(this.props.guild).then(bans => this.setState({ bans }));
    }

    render() {
        const { bans } = this.state;
        if (!bans) {
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
                        <th>Expires on</th>
                        <th>Expired</th>
                        <th>Reason</th>
                    </tr>
                </thead>
                <tbody>
                    {bans.map(ban => (
                        <tr key={ban.id}>
                            <td>{ban.id}</td>
                            <td>
                                <Image
                                    src={ban.user.avatarUrl}
                                    rounded
                                    width="32px"
                                    style={{ marginRight: "4px" }}
                                />
                                {ban.user.username}
                            </td>
                            <td>
                                <Image
                                    src={ban.moderatorUser.avatarUrl}
                                    rounded
                                    width="32px"
                                    style={{ marginRight: "4px" }}
                                />
                                {ban.moderatorUser.username}
                            </td>
                            <td>
                                {new Date(ban.actionTime * 1000).toUTCString()}
                            </td>
                            <td>
                                {ban.expirationTime
                                    ? new Date(
                                          ban.expirationTime * 1000
                                      ).toUTCString()
                                    : "-"}
                            </td>
                            <td style={{ textAlign: "center" }}>
                                {ban.unbanned ? "✔" : "✘"}
                            </td>
                            <td>{ban.reason}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        );
    }
}
