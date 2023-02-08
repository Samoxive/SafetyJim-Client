import * as React from "react";
import { Component } from "react";
import { Guild } from "../../../entities/guild";
import { Mute } from "../../../entities/modLogEntities";
import { ColumnType, EntityModal, ModLogList } from "./modLogList";
import { fetchMute, fetchMutes, updateMute } from "../../../endpoint/modLog";
import { dashboardRoute, DashboardRouteProps } from "../dashboard";

type MuteListRouteProps = DashboardRouteProps & {
    guild: Guild;
};
type MuteListRouteState = {};

export class ActualMuteListRoute extends Component<
    MuteListRouteProps,
    MuteListRouteState
> {
    state: MuteListRouteState = {};
    onSelectMute = (mute: Mute) =>
        this.props.navigate(
            `/dashboard/${this.props.guild.id}/mutes/${mute.id}`
        );
    onModalBack = () =>
        this.props.navigate(`/dashboard/${this.props.guild.id}/mutes`);

    render() {
        const {
            guild,
            params
        } = this.props;

        const muteId = params.muteId;

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

export const MuteListRoute = dashboardRoute(ActualMuteListRoute);