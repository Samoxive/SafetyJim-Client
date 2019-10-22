import * as React from "react";
import { Component } from "react";
import { Guild } from "../../../entities/guild";
import { Hardbans } from "../../../entities/modLogEntities";
import { fetchHardbans } from "../../../endpoint/modLog";
import { Loading } from "../../../components/loading/loading";
import { Table, Image, Container, Row, Pagination } from "react-bootstrap";
import { UserText } from "../../../components/user_text";

type HardbanListRouteState = { hardbans?: Hardbans };

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

    onPrev = () => {
        fetchHardbans(
            this.props.guild,
            this.state.hardbans!!.currentPage - 1
        ).then(hardbans => this.setState({ hardbans }));
    };

    onNext = () => {
        fetchHardbans(
            this.props.guild,
            this.state.hardbans!!.currentPage + 1
        ).then(hardbans => this.setState({ hardbans }));
    };

    render() {
        const { hardbans } = this.state;
        if (!hardbans) {
            return <Loading />;
        }

        const { entries, currentPage, totalPages } = hardbans;

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
                            {entries.map(hardban => (
                                <tr key={hardban.id}>
                                    <td>{hardban.id}</td>
                                    <td>
                                        <Image
                                            src={hardban.user.avatarUrl}
                                            rounded
                                            width="32px"
                                            style={{ marginRight: "4px" }}
                                        />
                                        <UserText user={hardban.user} />
                                    </td>
                                    <td>
                                        <Image
                                            src={
                                                hardban.moderatorUser.avatarUrl
                                            }
                                            rounded
                                            width="32px"
                                            style={{ marginRight: "4px" }}
                                        />
                                        <UserText
                                            user={hardban.moderatorUser}
                                        />
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
