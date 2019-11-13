import * as React from "react";
import { Component } from "react";
import { Guild } from "../../../entities/guild";
import { Ban } from "../../../entities/modLogEntities";
import { fetchBans, fetchBan } from "../../../endpoint/modLog";
import { ModLogList, ColumnType, EntityModal } from "./modLogList";
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
    onSelectBan = (ban: Ban) => console.log(ban);

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
                        onClose={() => console.log("close")}
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
