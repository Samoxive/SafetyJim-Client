import * as React from "react";
import { Component } from "react";
import { Guild } from "../../../entities/guild";
import { Mutes } from "../../../entities/modLogEntities";
import { fetchMutes } from "../../../endpoint/modLog";
import { Loading } from "../../../components/loading/loading";
import { Table, Image, Container, Row, Pagination } from "react-bootstrap";

type MuteListRouteState = { mutes?: Mutes };

export class MuteListRoute extends Component<
    { guild: Guild },
    MuteListRouteState
> {
    state: MuteListRouteState = {
        mutes: undefined
    };

    componentDidMount() {
        fetchMutes(this.props.guild).then(mutes => this.setState({ mutes }));
    }

    onPrev = () => {
        fetchMutes(this.props.guild, this.state.mutes!!.currentPage - 1).then(
            mutes => this.setState({ mutes })
        );
    };

    onNext = () => {
        fetchMutes(this.props.guild, this.state.mutes!!.currentPage + 1).then(
            mutes => this.setState({ mutes })
        );
    };

    render() {
        const { mutes } = this.state;
        if (!mutes) {
            return <Loading />;
        }

        const { entries, currentPage, totalPages } = mutes;

        return (
            <Container>
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
                            {entries.map(mute => (
                                <tr key={mute.id}>
                                    <td>{mute.id}</td>
                                    <td>
                                        <Image
                                            src={mute.user.avatarUrl}
                                            rounded
                                            width="32px"
                                            style={{ marginRight: "4px" }}
                                        />
                                        {mute.user.username}
                                    </td>
                                    <td>
                                        <Image
                                            src={mute.moderatorUser.avatarUrl}
                                            rounded
                                            width="32px"
                                            style={{ marginRight: "4px" }}
                                        />
                                        {mute.moderatorUser.username}
                                    </td>
                                    <td>
                                        {new Date(
                                            mute.actionTime * 1000
                                        ).toUTCString()}
                                    </td>
                                    <td>
                                        {mute.expirationTime
                                            ? new Date(
                                                  mute.expirationTime * 1000
                                              ).toUTCString()
                                            : "-"}
                                    </td>
                                    <td>{mute.unmuted ? "✔" : "✘"}</td>
                                    <td>{mute.reason}</td>
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
                        disabled={currentPage > totalPages}
                    />
                </Row>
            </Container>
        );
    }
}
