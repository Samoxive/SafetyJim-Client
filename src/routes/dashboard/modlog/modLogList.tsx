import * as React from "react";
import { Component } from "react";
import { ModLogEntity, ModLogResponse } from "../../../entities/modLogEntities";
import { Guild } from "../../../entities/guild";
import { Loading } from "../../../components/loading/loading";
import {
    Button,
    Container,
    Form,
    Image,
    Modal,
    Pagination,
    Row,
    Table
} from "react-bootstrap";
import { User } from "../../../entities/user";
import { UserText } from "../../../components/user_text";
import { Checkbox, TextArea } from "../../../components/form_components";
import { DateTimePicker } from "react-widgets";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./modLogList.css";

const TextColumn = ({ text }: { text: string }) => <>{text}</>;
const BooleanColumn = ({ value }: { value: boolean }) => (
    <>{value ? "✔" : "✘"}</>
);
const DateColumn = ({ timestamp }: { timestamp?: number }) => (
    <>{timestamp ? new Date(timestamp * 1000).toUTCString() : "-"}</>
);
const UserColumn = ({ user }: { user: User }) => (
    <>
        <Image
            src={user.avatarUrl}
            rounded
            width="32px"
            style={{ marginRight: "4px" }}
        />
        <UserText user={user} />
    </>
);

export enum ColumnType {
    ID,
    USER,
    DATE,
    EXPIRES,
    REASON
}

function matchKeyToColumn(entity: ModLogEntity, key: string, type: ColumnType) {
    const e = entity as any;
    switch (type) {
        case ColumnType.ID:
            return <TextColumn text={e[key] as string} />;
        case ColumnType.USER:
            return <UserColumn user={e[key] as User} />;
        case ColumnType.DATE:
            return <DateColumn timestamp={e[key] as number | undefined} />;
        case ColumnType.EXPIRES:
            return <BooleanColumn value={e[key] as boolean} />;
        case ColumnType.REASON:
            return <TextColumn text={e[key] as string} />;
    }
}

type ActionType = "Ban" | "Hardban" | "Softban" | "Kick" | "Mute" | "Warn";

type EntityModalProps<EntityT extends ModLogEntity> = {
    guild: Guild;
    id: string;
    actionType: ActionType;
    onClose: () => void;
    fetchEntity: (guild: Guild, id: number) => Promise<EntityT | undefined>;
    updateEntity: (guild: Guild, updatedEntity: EntityT) => Promise<boolean>;
    expires?: boolean;
    expirationKey?: string;
    pardonable?: boolean;
};

type EntityModalState<EntityT extends ModLogEntity> = {
    entity?: EntityT;
};

export class EntityModal<EntityT extends ModLogEntity> extends Component<
    EntityModalProps<EntityT>,
    EntityModalState<EntityT>
> {
    state: EntityModalState<EntityT> = {
        entity: undefined
    };

    componentDidMount() {
        this.props
            .fetchEntity(this.props.guild, Number(this.props.id))
            .then(entity =>
                entity ? this.setState({ entity }) : this.props.onClose()
            );
    }

    onExpired = (expired: boolean) => {
        if (!this.props.expires) {
            return;
        }

        this.setState((state, props) => ({
            ...state,
            entity: {
                ...state.entity!,
                [props.expirationKey!!]: expired
            }
        }));
    };

    onExpirationTime = (date?: Date) => {
        if (!this.props.expires) {
            return;
        }

        if (!date) {
            return;
        }

        this.setState(state => ({
            ...state,
            entity: {
                ...state.entity!,
                expirationTime: (date.getTime() / 1000) | 0
            }
        }));
    };

    onResetExpirationTime = () => {
        this.setState(state => ({
            ...state,
            entity: {
                ...state.entity!,
                expirationTime: 0
            }
        }));
    };

    onPardoned = (pardoned: boolean) => {
        if (!this.props.pardonable) {
            return;
        }

        this.setState(state => ({
            ...state,
            entity: {
                ...state.entity!,
                pardoned
            }
        }));
    };

    onReason = (reason: string) => {
        this.setState(state => ({
            ...state,
            entity: {
                ...state.entity!,
                reason
            }
        }));
    };

    onUpdate = () => {
        this.props
            .updateEntity(this.props.guild, this.state.entity!!)
            .then(successful =>
                successful ? this.props.onClose() : undefined
            );
    };

    render() {
        const {
            id,
            actionType,
            onClose,
            expires,
            expirationKey,
            pardonable
        } = this.props;
        const { entity } = this.state;

        const idNumber = Number(id);
        if (isNaN(idNumber)) {
            onClose();
            return <></>;
        }

        if (entity == null) {
            return (
                <Modal centered show onHide={onClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>{`${actionType} - #${id}`}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Loading />
                    </Modal.Body>
                </Modal>
            );
        }

        const expirationTime = (entity as any).expirationTime as number;
        const expired = (entity as any)[expirationKey!!] as boolean;
        const pardoned = (entity as any).pardoned as boolean;

        return (
            <Modal centered show onHide={onClose}>
                <Modal.Header closeButton>
                    <Modal.Title>{`${actionType} - #${id}`}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Row>
                            <label>User</label>
                        </Form.Row>
                        <Form.Row>
                            <UserColumn user={entity.user} />
                        </Form.Row>
                        <Form.Row>
                            <label>Responsible Moderator</label>
                        </Form.Row>
                        <Form.Row className="modal-disable-padding">
                            <UserColumn user={entity.moderatorUser} />
                        </Form.Row>
                        <Form.Row>
                            <label>Issued on</label>
                        </Form.Row>
                        <Form.Row>
                            <DateColumn timestamp={entity.actionTime} />
                        </Form.Row>
                        {expires && (
                            <>
                                <Form.Row>
                                    <label>Expires on</label>
                                </Form.Row>
                                <Form.Row>
                                    <DateTimePicker
                                        date
                                        time
                                        value={
                                            expirationTime !== 0
                                                ? new Date(
                                                      expirationTime * 1000
                                                  )
                                                : undefined
                                        }
                                        onChange={this.onExpirationTime}
                                        disabled={expired}
                                    />
                                    <Button
                                        style={{ marginLeft: "8px" }}
                                        variant="outline-danger"
                                        onClick={this.onResetExpirationTime}
                                    >
                                        <FontAwesomeIcon icon="times-circle" />
                                    </Button>
                                </Form.Row>
                                <Form.Row className="modal-disable-padding">
                                    <Checkbox
                                        label="Expired"
                                        defaultValue={expired}
                                        onChange={this.onExpired}
                                        disabled={expired}
                                    />
                                </Form.Row>
                            </>
                        )}
                        <Form.Row className="modal-disable-padding">
                            {pardonable && (
                                <Checkbox
                                    label="Pardoned"
                                    defaultValue={pardoned}
                                    onChange={this.onPardoned}
                                    disabled={pardoned}
                                />
                            )}
                        </Form.Row>
                        <Form.Row className="modal-disable-padding">
                            <TextArea
                                label="Reason"
                                defaultValue={entity.reason}
                                placeholder="Reason"
                                rows={3}
                                onChange={this.onReason}
                            />
                        </Form.Row>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={this.onUpdate}>
                        Update
                    </Button>
                </Modal.Footer>
            </Modal>
        );
    }
}

type ModLogListProps<EntityT extends ModLogEntity> = {
    guild: Guild;
    fetchEntities: (
        guild: Guild,
        page?: number | undefined
    ) => Promise<ModLogResponse<EntityT> | undefined>;
    onSelectEntity: (entity: EntityT) => void;
    columnKeys: string[];
    columnNames: string[];
    columnTypes: ColumnType[];
};

type ModLogListState<EntityT> = {
    entities?: ModLogResponse<EntityT>;
};

export class ModLogList<EntityT extends ModLogEntity> extends Component<
    ModLogListProps<EntityT>,
    ModLogListState<EntityT>
> {
    state: ModLogListState<EntityT> = {
        entities: undefined
    };

    componentDidMount() {
        this.props
            .fetchEntities(this.props.guild)
            .then(entities => this.setState({ entities }));
    }

    onPrev = () => {
        this.props
            .fetchEntities(
                this.props.guild,
                this.state.entities!!.currentPage - 1
            )
            .then(entities => this.setState({ entities }));
    };

    onNext = () => {
        this.props
            .fetchEntities(
                this.props.guild,
                this.state.entities!!.currentPage + 1
            )
            .then(entities => this.setState({ entities }));
    };

    render() {
        const { entities } = this.state;
        if (!entities) {
            return <Loading />;
        }

        const {
            onSelectEntity,
            columnKeys,
            columnNames,
            columnTypes
        } = this.props;
        const { entries, currentPage, totalPages } = entities;
        return (
            <Container style={{ maxWidth: "none" }}>
                <Row>
                    <Table>
                        <thead>
                            <tr>
                                {columnNames.map((name, i) => (
                                    <th key={i}>{name}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {entries.map(entry => (
                                <tr
                                    key={entry.id}
                                    className={
                                        (entry as any)["pardoned"]
                                            ? "pardoned"
                                            : undefined
                                    }
                                    onClick={() => onSelectEntity(entry)}
                                >
                                    {columnKeys.map((key, i) => (
                                        <td key={i}>
                                            {matchKeyToColumn(
                                                entry,
                                                key,
                                                columnTypes[i]
                                            )}
                                        </td>
                                    ))}
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
