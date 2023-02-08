import * as React from "react";
import { Component } from "react";
import { Guild } from "../../../entities/guild";
import { Hardban } from "../../../entities/modLogEntities";
import {
    fetchHardban,
    fetchHardbans,
    updateHardban
} from "../../../endpoint/modLog";
import { ColumnType, EntityModal, ModLogList } from "./modLogList";
import { dashboardRoute, DashboardRouteProps } from "../dashboard";

type HardbanListRouteProps = DashboardRouteProps & {
    guild: Guild;
};
type HardbanListRouteState = {};

export class ActualHardbanListRoute extends Component<
    HardbanListRouteProps,
    HardbanListRouteState
> {
    state: HardbanListRouteState = {};
    onSelectHardban = (hardban: Hardban) =>
        this.props.navigate(
            `/dashboard/${this.props.guild.id}/hardbans/${hardban.id}`
        );
    onModalBack = () =>
        this.props.navigate(`/dashboard/${this.props.guild.id}/hardbans`);

    render() {
        const {
            guild,
            params
        } = this.props;

        const hardbanId = params.hardbanId;

        return (
            <>
                {hardbanId && (
                    <EntityModal
                        guild={guild}
                        id={hardbanId}
                        actionType="Hardban"
                        onClose={this.onModalBack}
                        fetchEntity={fetchHardban}
                        updateEntity={updateHardban}
                    />
                )}
                <ModLogList
                    guild={guild}
                    fetchEntities={fetchHardbans}
                    onSelectEntity={this.onSelectHardban}
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

export const HardbanListRoute = dashboardRoute(ActualHardbanListRoute);