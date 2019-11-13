import * as React from "react";
import { Col, Form } from "react-bootstrap";
import { GuildSettingsConstants } from "../../../entities/guildSettings";
import { IntegerInput, IntegerSelect } from "../../../components/form_components";

const C = GuildSettingsConstants;

type ModActionSelectProps = {
    defaultAction: number;
    defaultDuration: number;
    defaultDurationType: number;
    onAction: (action: number) => void;
    onDuration: (duration: number) => void;
    onDurationType: (type: number) => void;
};

export class ModActionSelect extends React.Component<ModActionSelectProps> {
    onAction = (action: number) => {
        this.props.onAction(action);
    };

    onDuration = (duration: number) => {
        this.props.onDuration(duration);
    };

    onDurationType = (type: number) => {
        this.props.onDurationType(type);
    };

    render() {
        const {
            defaultAction,
            defaultDuration,
            defaultDurationType
        } = this.props;

        const isActionTimed =
            defaultAction === C.ACTION_BAN || defaultAction === C.ACTION_MUTE;

        const durationPicker = isActionTimed ? (
            <>
                <IntegerSelect
                    label="Time Unit"
                    defaultOption={defaultDurationType}
                    options={[
                        [C.DURATION_TYPE_SECONDS, "Seconds"],
                        [C.DURATION_TYPE_MINUTES, "Minutes"],
                        [C.DURATION_TYPE_HOURS, "Hours"],
                        [C.DURATION_TYPE_DAYS, "Days"]
                    ]}
                    onSelect={this.onDurationType}
                />
                <IntegerInput
                    label="Duration"
                    defaultValue={defaultDuration}
                    onChange={this.onDuration}
                />
            </>
        ) : (
            <>
                <Form.Group as={Col} />
                <Form.Group as={Col} />
            </>
        );

        return (
            <>
                <IntegerSelect
                    label="Action"
                    defaultOption={defaultAction}
                    options={[
                        [C.ACTION_NOTHING, "Nothing"],
                        [C.ACTION_WARN, "Warning"],
                        [C.ACTION_MUTE, "Mute"],
                        [C.ACTION_KICK, "Kick"],
                        [C.ACTION_BAN, "Ban"],
                        [C.ACTION_SOFTBAN, "Softban"],
                        [C.ACTION_HARDBAN, "Hardban"]
                    ]}
                    onSelect={this.onAction}
                />
                {durationPicker}
            </>
        );
    }
}

type PrivacySelectProps = {
    label: string;
    defaultPrivacy: number;
    onPrivacy: (mode: number) => void;
};

export class PrivacySelect extends React.Component<PrivacySelectProps> {
    onPrivacy = (mode: number) => {
        this.props.onPrivacy(mode);
    };

    render() {
        const { label, defaultPrivacy } = this.props;
        return (
            <IntegerSelect
                label={label}
                defaultOption={defaultPrivacy}
                onSelect={this.onPrivacy}
                options={[
                    [C.PRIVACY_EVERYONE, "Everyone"],
                    [C.PRIVACY_STAFF_ONLY, "Staff only"],
                    [C.PRIVACY_ADMIN_ONLY, "Administrators only"]
                ]}
            />
        );
    }
}
