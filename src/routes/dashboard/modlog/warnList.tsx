import * as React from "react";
import { Component } from "react";
import { Guild } from "../../../entities/guild";
import { Warn } from "../../../entities/modLogEntities";
import { fetchWarn, fetchWarns, updateWarn } from "../../../endpoint/modLog";
import { ColumnType, EntityModal, ModLogList } from "./modLogList";
import { RouteComponentProps } from "react-router";

type WarnListRouteProps = RouteComponentProps<{ warnId?: string }> & {
    guild: Guild;
};
type WarnListRouteState = {};

export class WarnListRoute extends Component<
    WarnListRouteProps,
    WarnListRouteState
> {
    state: WarnListRouteState = {};
    onSelectWarn = (warn: Warn) =>
        this.props.history.push(
            `/dashboard/${this.props.guild.id}/warns/${warn.id}`
        );
    onModalBack = () =>
        this.props.history.push(`/dashboard/${this.props.guild.id}/warns`);

    render() {
        const {
            guild,
            match: {
                params: { warnId }
            }
        } = this.props;
        return (
            <>
                {warnId && (
                    <EntityModal
                        guild={guild}
                        id={warnId}
                        actionType="Warn"
                        onClose={this.onModalBack}
                        fetchEntity={fetchWarn}
                        updateEntity={updateWarn}
                        pardonable
                    />
                )}
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
            </>
        );
    }
}
