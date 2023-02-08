import * as React from "react";
import { Component } from "react";
import { Guild } from "../../../entities/guild";
import { Ban } from "../../../entities/modLogEntities";
import { fetchBan, fetchBans, updateBan } from "../../../endpoint/modLog";
import { ColumnType, EntityModal, ModLogList } from "./modLogList";
import { dashboardRoute, DashboardRouteProps } from "../dashboard";

type BanListRouteProps = DashboardRouteProps & {
    guild: Guild;
};
type BanListRouteState = {};

export class ActualBanListRoute extends Component<
    BanListRouteProps,
    BanListRouteState
> {
    state: BanListRouteState = {};
    onSelectBan = (ban: Ban) =>
        this.props.navigate(
            `/dashboard/${this.props.guild.id}/bans/${ban.id}`
        );
    onModalBack = () =>
        this.props.navigate(`/dashboard/${this.props.guild.id}/bans`);

    render() {
        const {
            guild,
            params
        } = this.props;

        const banId = params.banId;

        return (
            <>
                {banId && (
                    <EntityModal
                        guild={guild}
                        id={banId}
                        actionType="Ban"
                        expires
                        expirationKey="unbanned"
                        fetchEntity={fetchBan}
                        updateEntity={updateBan}
                        onClose={this.onModalBack}
                    />
                )}
                <ModLogList
                    guild={guild}
                    fetchEntities={fetchBans}
                    onSelectEntity={this.onSelectBan}
                    columnKeys={[
                        "id",
                        "user",
                        "moderatorUser",
                        "actionTime",
                        "expirationTime",
                        "unbanned",
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

export const BanListRoute = dashboardRoute(ActualBanListRoute)
