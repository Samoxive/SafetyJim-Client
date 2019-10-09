import * as React from "react";
import { Component } from "react";
import { Guild } from "../../../entities/guild";
import { Bans } from "../../../entities/modLogEntities";
import { fetchBans } from "../../../endpoint/modLog";
import { Loading } from "../../../components/loading/loading";
import { Table, Image, Container, Row, Pagination } from "react-bootstrap";

type BanListRouteState = { bans?: Bans };

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

    onPrev = () => {
        fetchBans(this.props.guild, this.state.bans!!.currentPage - 1).then(
            bans => this.setState({ bans })
        );
    };

    onNext = () => {
        fetchBans(this.props.guild, this.state.bans!!.currentPage + 1).then(
            bans => this.setState({ bans })
        );
    };

    render() {
        const { bans } = this.state;
        if (!bans) {
            return <Loading />;
        }

        const { entries, currentPage, totalPages } = bans;

        return (
            <Container style={{ maxWidth: "none" }}>
                <Row>
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
                            {entries.map(ban => (
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
                                        {new Date(
                                            ban.actionTime * 1000
                                        ).toUTCString()}
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
                </Row>
                <Row style={{ justifyContent: "center" }}>
                    <Pagination>
                        <Pagination.Prev
                            onClick={this.onPrev}
                            disabled={currentPage <= 1}
                        />
                        <Pagination.Item
                            active
                        >{`${currentPage} / ${totalPages}`}</Pagination.Item>
                        <Pagination.Next
                            onClick={this.onNext}
                            disabled={currentPage >= totalPages}
                        />
                    </Pagination>
                </Row>
            </Container>
        );
    }
}
