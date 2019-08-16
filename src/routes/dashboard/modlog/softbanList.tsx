import * as React from "react";
import { Component } from "react";
import { Guild } from "../../../entities/guild";
import { Softban } from "../../../entities/modLogEntities";
import { fetchSoftbans } from "../../../endpoint/modLog";
import { Loading } from "../../../components/loading/loading";
import { Table, Image } from "react-bootstrap";

type SoftbanListRouteState = { softbans?: Softban[] };

export class SoftbanListRoute extends Component<
    { guild: Guild },
    SoftbanListRouteState
> {
    state: SoftbanListRouteState = {
        softbans: undefined
    };

    componentDidMount() {
        fetchSoftbans(this.props.guild).then(softbans =>
            this.setState({ softbans })
        );
    }

    render() {
        const { softbans } = this.state;
        if (!softbans) {
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
                    {softbans.map(softban => (
                        <tr key={softban.id}>
                            <td>{softban.id}</td>
                            <td>
                                <Image
                                    src={softban.user.avatarUrl}
                                    rounded
                                    width="32px"
                                    style={{ marginRight: "4px" }}
                                />
                                {softban.user.username}
                            </td>
                            <td>
                                <Image
                                    src={softban.moderatorUser.avatarUrl}
                                    rounded
                                    width="32px"
                                    style={{ marginRight: "4px" }}
                                />
                                {softban.moderatorUser.username}
                            </td>
                            <td>
                                {new Date(
                                    softban.actionTime * 1000
                                ).toUTCString()}
                            </td>
                            <td>{softban.reason}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        );
    }
}
