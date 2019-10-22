import * as React from "react";
import { Component } from "react";
import { Guild } from "../../../entities/guild";
import { Kicks } from "../../../entities/modLogEntities";
import { fetchKicks } from "../../../endpoint/modLog";
import { Loading } from "../../../components/loading/loading";
import { Table, Image, Container, Row, Pagination } from "react-bootstrap";
import { UserText } from "../../../components/user_text";

type KickListRouteState = { kicks?: Kicks };

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

    onPrev = () => {
        fetchKicks(this.props.guild, this.state.kicks!!.currentPage - 1).then(
            kicks => this.setState({ kicks })
        );
    };

    onNext = () => {
        fetchKicks(this.props.guild, this.state.kicks!!.currentPage - 1).then(
            kicks => this.setState({ kicks })
        );
    };

    render() {
        const { kicks } = this.state;
        if (!kicks) {
            return <Loading />;
        }

        const { entries, currentPage, totalPages } = kicks;

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
                                <th>Reason</th>
                            </tr>
                        </thead>
                        <tbody>
                            {entries.map(kick => (
                                <tr key={kick.id}>
                                    <td>{kick.id}</td>
                                    <td>
                                        <Image
                                            src={kick.user.avatarUrl}
                                            rounded
                                            width="32px"
                                            style={{ marginRight: "4px" }}
                                        />
                                        <UserText user={kick.user} />
                                    </td>
                                    <td>
                                        <Image
                                            src={kick.moderatorUser.avatarUrl}
                                            rounded
                                            width="32px"
                                            style={{ marginRight: "4px" }}
                                        />
                                        <UserText user={kick.moderatorUser} />
                                    </td>
                                    <td>
                                        {new Date(
                                            kick.actionTime * 1000
                                        ).toUTCString()}
                                    </td>
                                    <td>{kick.reason}</td>
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
