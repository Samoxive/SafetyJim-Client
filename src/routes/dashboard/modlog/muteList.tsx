import * as React from "react";
import { Component } from "react";
import { Guild } from "../../../entities/guild";
import { Mute } from "../../../entities/modLogEntities";
import { ColumnType, ModLogList } from "./modLogList";
import { fetchMutes } from "../../../endpoint/modLog";

type MuteListRouteState = {};

export class MuteListRoute extends Component<
    { guild: Guild },
    MuteListRouteState
> {
    state: MuteListRouteState = {};
    onSelectMute = (mute: Mute) => console.log(mute);

    render() {
        const { guild } = this.props;
        return (
            <ModLogList
                guild={guild}
                fetchEntities={fetchMutes}
                onSelectEntity={this.onSelectMute}
                columnKeys={[
                    "id",
                    "user",
                    "moderatorUser",
                    "actionTime",
                    "expirationTime",
                    "unmuted",
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
        );
    }
}
