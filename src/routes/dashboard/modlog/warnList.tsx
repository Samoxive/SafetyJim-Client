import * as React from "react";
import { Component } from "react";
import { Guild } from "../../../entities/guild";
import { Warn } from "../../../entities/modLogEntities";
import { fetchWarns } from "../../../endpoint/modLog";
import { ModLogList, ColumnType } from "./modLogList";

type WarnListRouteState = {};

export class WarnListRoute extends Component<
    { guild: Guild },
    WarnListRouteState
> {
    state: WarnListRouteState = {};
    onSelectWarn = (warn: Warn) => console.log(warn);

    render() {
        const { guild } = this.props;
        return (
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
        );
    }
}
