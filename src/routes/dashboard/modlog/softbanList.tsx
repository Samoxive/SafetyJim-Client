import * as React from "react";
import { Component } from "react";
import { Guild } from "../../../entities/guild";
import {
    fetchSoftban,
    fetchSoftbans,
    updateSoftban
} from "../../../endpoint/modLog";
import { ColumnType, EntityModal, ModLogList } from "./modLogList";
import { Softban } from "../../../entities/modLogEntities";
import { dashboardRoute, DashboardRouteProps } from "../dashboard";

type SoftbanListRouteProps = DashboardRouteProps & {
    guild: Guild;
};
type SoftbanListRouteState = {};

export class ActualSoftbanListRoute extends Component<
    SoftbanListRouteProps,
    SoftbanListRouteState
> {
    state: SoftbanListRouteState = {};
    onSelectSoftban = (softban: Softban) =>
        this.props.navigate(
            `/dashboard/${this.props.guild.id}/softbans/${softban.id}`
        );
    onModalBack = () =>
        this.props.navigate(`/dashboard/${this.props.guild.id}/softbans`);

    render() {
        const {
            guild,
            params
        } = this.props;

        const softbanId = params.softbanId;

        return (
            <>
                {softbanId && (
                    <EntityModal
                        guild={guild}
                        id={softbanId}
                        actionType="Softban"
                        onClose={this.onModalBack}
                        fetchEntity={fetchSoftban}
                        updateEntity={updateSoftban}
                        pardonable
                    />
                )}
                <ModLogList
                    guild={guild}
                    fetchEntities={fetchSoftbans}
                    onSelectEntity={this.onSelectSoftban}
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

export const SoftbanListRoute = dashboardRoute(ActualSoftbanListRoute);
