import * as React from "react";
import { Component } from "react";
import { Guild } from "../../../entities/guild";
import { fetchSoftbans } from "../../../endpoint/modLog";
import { ModLogList, ColumnType } from "./modLogList";
import { Softban } from "../../../entities/modLogEntities";

type SoftbanListRouteState = {};

export class SoftbanListRoute extends Component<
    { guild: Guild },
    SoftbanListRouteState
> {
    state: SoftbanListRouteState = {};
    onSelectSoftban = (softban: Softban) => console.log(softban);

    render() {
        const { guild } = this.props;
        return (
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
        );
    }
}
