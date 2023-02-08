import * as React from "react";
import { Component } from "react";
import { Guild } from "../../../entities/guild";
import { Kick } from "../../../entities/modLogEntities";
import { fetchKick, fetchKicks, updateKick } from "../../../endpoint/modLog";
import { ColumnType, EntityModal, ModLogList } from "./modLogList";
import { dashboardRoute, DashboardRouteProps } from "../dashboard";

type KickListRouteProps = DashboardRouteProps & {
    guild: Guild;
};
type KickListRouteState = {};

export class ActualKickListRoute extends Component<
    KickListRouteProps,
    KickListRouteState
> {
    state: KickListRouteState = {};
    onSelectKick = (kick: Kick) =>
        this.props.navigate(
            `/dashboard/${this.props.guild.id}/kicks/${kick.id}`
        );
    onModalBack = () =>
        this.props.navigate(`/dashboard/${this.props.guild.id}/kicks`);

    render() {
        const {
            guild,
            params
        } = this.props;

        const kickId = params.kickId;

        return (
            <>
                {kickId && (
                    <EntityModal
                        guild={guild}
                        id={kickId}
                        actionType="Kick"
                        onClose={this.onModalBack}
                        fetchEntity={fetchKick}
                        updateEntity={updateKick}
                        pardonable
                    />
                )}
                <ModLogList
                    guild={guild}
                    fetchEntities={fetchKicks}
                    onSelectEntity={this.onSelectKick}
                    columnKeys={[
                        "id",
                        "user",
                        "moderatorUser",
                        "actionTime",
                        "reason"
                    ]}
                    columnNames={[
                        "#id",
                        "User",
                        "Moderator",
                        "Issued on",
                        "Reason"
                    ]}
                    columnTypes={[
                        ColumnType.ID,
                        ColumnType.USER,
                        ColumnType.USER,
                        ColumnType.DATE,
                        ColumnType.REASON
                    ]}
                />
            </>
        );
    }
}

export const KickListRoute = dashboardRoute(ActualKickListRoute);