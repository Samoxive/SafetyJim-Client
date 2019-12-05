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
import { RouteComponentProps } from "react-router";

type SoftbanListRouteProps = RouteComponentProps<{ softbanId?: string }> & {
    guild: Guild;
};
type SoftbanListRouteState = {};

export class SoftbanListRoute extends Component<
    SoftbanListRouteProps,
    SoftbanListRouteState
> {
    state: SoftbanListRouteState = {};
    onSelectSoftban = (softban: Softban) =>
        this.props.history.push(
            `/dashboard/${this.props.guild.id}/softbans/${softban.id}`
        );
    onModalBack = () =>
        this.props.history.push(`/dashboard/${this.props.guild.id}/softbans`);

    render() {
        const {
            guild,
            match: {
                params: { softbanId }
            }
        } = this.props;
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
