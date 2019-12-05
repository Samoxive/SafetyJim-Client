import * as React from "react";
import { Component } from "react";
import { Guild } from "../../../entities/guild";
import { Mute } from "../../../entities/modLogEntities";
import { ColumnType, EntityModal, ModLogList } from "./modLogList";
import { fetchMute, fetchMutes, updateMute } from "../../../endpoint/modLog";
import { RouteComponentProps } from "react-router";

type MuteListRouteProps = RouteComponentProps<{ muteId?: string }> & {
    guild: Guild;
};
type MuteListRouteState = {};

export class MuteListRoute extends Component<
    MuteListRouteProps,
    MuteListRouteState
> {
    state: MuteListRouteState = {};
    onSelectMute = (mute: Mute) =>
        this.props.history.push(
            `/dashboard/${this.props.guild.id}/mutes/${mute.id}`
        );
    onModalBack = () =>
        this.props.history.push(`/dashboard/${this.props.guild.id}/mutes`);

    render() {
        const {
            guild,
            match: {
                params: { muteId }
            }
        } = this.props;
        return (
            <>
                {muteId && (
                    <EntityModal
                        guild={guild}
                        id={muteId}
                        actionType="Mute"
                        onClose={this.onModalBack}
                        fetchEntity={fetchMute}
                        updateEntity={updateMute}
                        expirationKey="unmuted"
                        expires
                        pardonable
                    />
                )}
                <ModLogList
                    guild={guild}
                    fetchEntities={fetchMutes}
                    onSelectEntity={this.onSelectMute}
                    columnKeys={[
                        "id",
                        "user",
                        "moderatorUser",
                        "actionTime",
                        "expirationTime",
                        "unmuted",
                        "reason"
                    ]}
                    columnNames={[
                        "#id",
                        "User",
                        "Moderator",
                        "Issued on",
                        "Expires on",
                        "Expired",
                        "Reason"
                    ]}
                    columnTypes={[
                        ColumnType.ID,
                        ColumnType.USER,
                        ColumnType.USER,
                        ColumnType.DATE,
                        ColumnType.DATE,
                        ColumnType.EXPIRES,
                        ColumnType.REASON
                    ]}
                />
            </>
        );
    }
}
