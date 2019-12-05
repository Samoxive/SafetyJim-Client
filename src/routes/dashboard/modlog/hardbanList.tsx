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
import { RouteComponentProps } from "react-router";

type HardbanListRouteProps = RouteComponentProps<{ hardbanId?: string }> & {
    guild: Guild;
};
type HardbanListRouteState = {};

export class HardbanListRoute extends Component<
    HardbanListRouteProps,
    HardbanListRouteState
> {
    state: HardbanListRouteState = {};
    onSelectHardban = (hardban: Hardban) =>
        this.props.history.push(
            `/dashboard/${this.props.guild.id}/hardbans/${hardban.id}`
        );
    onModalBack = () =>
        this.props.history.push(`/dashboard/${this.props.guild.id}/hardbans`);

    render() {
        const {
            guild,
            match: {
                params: { hardbanId }
            }
        } = this.props;
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
