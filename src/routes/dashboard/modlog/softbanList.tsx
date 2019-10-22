import * as React from "react";
import { Component } from "react";
import { Guild } from "../../../entities/guild";
import { Softbans } from "../../../entities/modLogEntities";
import { fetchSoftbans } from "../../../endpoint/modLog";
import { Loading } from "../../../components/loading/loading";
import { Table, Image, Container, Row, Pagination } from "react-bootstrap";
import { UserText } from "../../../components/user_text";

type SoftbanListRouteState = { softbans?: Softbans };

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

    onPrev = () => {
        fetchSoftbans(
            this.props.guild,
            this.state.softbans!!.currentPage - 1
        ).then(softbans => this.setState({ softbans }));
    };

    onNext = () => {
        fetchSoftbans(
            this.props.guild,
            this.state.softbans!!.currentPage + 1
        ).then(softbans => this.setState({ softbans }));
    };

    render() {
        const { softbans } = this.state;
        if (!softbans) {
            return <Loading />;
        }

        const { entries, currentPage, totalPages } = softbans;

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
                            {entries.map(softban => (
                                <tr key={softban.id}>
                                    <td>{softban.id}</td>
                                    <td>
                                        <Image
                                            src={softban.user.avatarUrl}
                                            rounded
                                            width="32px"
                                            style={{ marginRight: "4px" }}
                                        />
                                        <UserText user={softban.user} />
                                    </td>
                                    <td>
                                        <Image
                                            src={
                                                softban.moderatorUser.avatarUrl
                                            }
                                            rounded
                                            width="32px"
                                            style={{ marginRight: "4px" }}
                                        />
                                        <UserText
                                            user={softban.moderatorUser}
                                        />
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
