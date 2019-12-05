import * as React from "react";
import { Component } from "react";
import { Guild } from "../../../entities/guild";
import { Kick } from "../../../entities/modLogEntities";
import { fetchKick, fetchKicks, updateKick } from "../../../endpoint/modLog";
import { ColumnType, EntityModal, ModLogList } from "./modLogList";
import { RouteComponentProps } from "react-router";

type KickListRouteProps = RouteComponentProps<{ kickId?: string }> & {
    guild: Guild;
};
type KickListRouteState = {};

export class KickListRoute extends Component<
    KickListRouteProps,
    KickListRouteState
> {
    state: KickListRouteState = {};
    onSelectKick = (kick: Kick) =>
        this.props.history.push(
            `/dashboard/${this.props.guild.id}/kicks/${kick.id}`
        );
    onModalBack = () =>
        this.props.history.push(`/dashboard/${this.props.guild.id}/kicks`);

    render() {
        const {
            guild,
            match: {
                params: { kickId }
            }
        } = this.props;
        return (
            <>
                {kickId && (
                    <EntityModal
                        guild={guild}
                        id={kickId}
                        actionType="Kick"
                        onClose={this.onModalBack}
                        fetchEntity={fetchKick}
                        updateEntity={updateKick}
                        pardonable
                    />
                )}
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
            </>
        );
    }
}
