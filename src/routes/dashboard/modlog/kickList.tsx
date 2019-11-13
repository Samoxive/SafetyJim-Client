import * as React from "react";
import { Component } from "react";
import { Guild } from "../../../entities/guild";
import { Kick } from "../../../entities/modLogEntities";
import { fetchKicks } from "../../../endpoint/modLog";
import { ModLogList, ColumnType } from "./modLogList";

type KickListRouteState = {};

export class KickListRoute extends Component<
    { guild: Guild },
    KickListRouteState
> {
    state: KickListRouteState = {};
    onSelectKick = (kick: Kick) => console.log(kick);

    render() {
        const { guild } = this.props;
        return (
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
        );
    }
}
