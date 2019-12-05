import * as React from "react";
import { Component } from "react";
import { Guild } from "../../../entities/guild";
import { Ban } from "../../../entities/modLogEntities";
import { fetchBan, fetchBans, updateBan } from "../../../endpoint/modLog";
import { ColumnType, EntityModal, ModLogList } from "./modLogList";
import { RouteComponentProps } from "react-router";

type BanListRouteProps = RouteComponentProps<{ banId?: string }> & {
    guild: Guild;
};
type BanListRouteState = {};

export class BanListRoute extends Component<
    BanListRouteProps,
    BanListRouteState
> {
    state: BanListRouteState = {};
    onSelectBan = (ban: Ban) =>
        this.props.history.push(
            `/dashboard/${this.props.guild.id}/bans/${ban.id}`
        );
    onModalBack = () =>
        this.props.history.push(`/dashboard/${this.props.guild.id}/bans`);

    render() {
        const {
            guild,
            match: {
                params: { banId }
            }
        } = this.props;
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
