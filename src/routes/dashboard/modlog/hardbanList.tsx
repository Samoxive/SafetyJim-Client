import * as React from "react";
import { Component } from "react";
import { Guild } from "../../../entities/guild";
import { Hardban } from "../../../entities/modLogEntities";
import { fetchHardbans } from "../../../endpoint/modLog";
import { Loading } from "../../../components/loading/loading";
import { Table, Image } from "react-bootstrap";

type HardbanListRouteState = { hardbans?: Hardban[] };

export class HardbanListRoute extends Component<
    { guild: Guild },
    HardbanListRouteState
> {
    state: HardbanListRouteState = {
        hardbans: undefined
    };

    componentDidMount() {
        fetchHardbans(this.props.guild).then(hardbans =>
            this.setState({ hardbans })
        );
    }

    render() {
        const { hardbans } = this.state;
        if (!hardbans) {
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
                    {hardbans.map(hardban => (
                        <tr key={hardban.id}>
                            <td>{hardban.id}</td>
                            <td>
                                <Image
                                    src={hardban.user.avatarUrl}
                                    rounded
                                    width="32px"
                                    style={{ marginRight: "4px" }}
                                />
                                {hardban.user.username}
                            </td>
                            <td>
                                <Image
                                    src={hardban.moderatorUser.avatarUrl}
                                    rounded
                                    width="32px"
                                    style={{ marginRight: "4px" }}
                                />
                                {hardban.moderatorUser.username}
                            </td>
                            <td>
                                {new Date(
                                    hardban.actionTime * 1000
                                ).toUTCString()}
                            </td>
                            <td>{hardban.reason}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        );
    }
}
