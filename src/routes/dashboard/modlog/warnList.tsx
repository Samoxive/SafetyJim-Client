import * as React from "react";
import { Component } from "react";
import { Guild } from "../../../entities/guild";
import { Warns } from "../../../entities/modLogEntities";
import { fetchWarns } from "../../../endpoint/modLog";
import { Loading } from "../../../components/loading/loading";
import { Table, Image, Container, Row, Pagination } from "react-bootstrap";

type WarnListRouteState = { warns?: Warns };

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

    onPrev = () => {
        fetchWarns(this.props.guild, this.state.warns!!.currentPage - 1).then(
            warns => this.setState({ warns })
        );
    };

    onNext = () => {
        fetchWarns(this.props.guild, this.state.warns!!.currentPage + 1).then(
            warns => this.setState({ warns })
        );
    };

    render() {
        const { warns } = this.state;
        if (!warns) {
            return <Loading />;
        }

        const { entries, currentPage, totalPages } = warns;

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
                            {entries.map(warn => (
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
                                        {new Date(
                                            warn.actionTime * 1000
                                        ).toUTCString()}
                                    </td>
                                    <td>{warn.reason}</td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </Row>
                <Row style={{ justifyContent: "center" }}>
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
                </Row>
            </Container>
        );
    }
}
