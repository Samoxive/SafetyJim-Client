import * as React from "react";
import { Component } from "react";
import { Guild } from "../../../entities/guild";
import { Hardban } from "../../../entities/modLogEntities";
import { fetchHardbans } from "../../../endpoint/modLog";
import { ColumnType, ModLogList } from "./modLogList";

type HardbanListRouteState = {};

export class HardbanListRoute extends Component<
    { guild: Guild },
    HardbanListRouteState
> {
    state: HardbanListRouteState = {};
    onSelectHardban = (hardban: Hardban) => console.log(hardban);

    render() {
        const { guild } = this.props;
        return (
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
        );
    }
}
