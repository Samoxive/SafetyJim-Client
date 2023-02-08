import * as React from "react";
import { Component } from "react";
import { Guild } from "../../../entities/guild";
import { Warn } from "../../../entities/modLogEntities";
import { fetchWarn, fetchWarns, updateWarn } from "../../../endpoint/modLog";
import { ColumnType, EntityModal, ModLogList } from "./modLogList";
import { dashboardRoute, DashboardRouteProps } from "../dashboard";

type WarnListRouteProps = DashboardRouteProps & {
    guild: Guild;
};
type WarnListRouteState = {};

export class ActualWarnListRoute extends Component<
    WarnListRouteProps,
    WarnListRouteState
> {
    state: WarnListRouteState = {};
    onSelectWarn = (warn: Warn) =>
        this.props.navigate(
            `/dashboard/${this.props.guild.id}/warns/${warn.id}`
        );
    onModalBack = () =>
        this.props.navigate(`/dashboard/${this.props.guild.id}/warns`);

    render() {
        const {
            guild,
            params
        } = this.props;

        const warnId = params.warnId;
        
        return (
            <>
                {warnId && (
                    <EntityModal
                        guild={guild}
                        id={warnId}
                        actionType="Warn"
                        onClose={this.onModalBack}
                        fetchEntity={fetchWarn}
                        updateEntity={updateWarn}
                        pardonable
                    />
                )}
                <ModLogList
                    guild={guild}
                    fetchEntities={fetchWarns}
                    onSelectEntity={this.onSelectWarn}
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

export const WarnListRoute = dashboardRoute(ActualWarnListRoute);
