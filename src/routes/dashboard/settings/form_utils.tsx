import * as React from "react";
import { Form, Col } from "react-bootstrap";
import { GuildSettingsConstants } from "../../../entities/guildSettings";

const C = GuildSettingsConstants;

type CheckboxProps = {
    label: string;
    defaultValue: boolean;
    onChange: (value: boolean) => void;
};

export class Checkbox extends React.Component<CheckboxProps> {
    onChange = (e: any) => {
        this.props.onChange(e.target.checked);
    };

    render() {
        const { label, defaultValue } = this.props;
        return (
            <Form.Group as={Col}>
                <Form.Label>{label}</Form.Label>
                <Form.Check
                    type="checkbox"
                    defaultChecked={defaultValue}
                    onChange={this.onChange}
                />
            </Form.Group>
        );
    }
}

type SelectProps<T = string | number> = {
    label: string;
    defaultOption: T;
    options: Array<[T, string]>;
    onSelect: (key: T) => void;
};

export class StringSelect extends React.Component<SelectProps<string>> {
    onSelect = (e: any) => {
        this.props.onSelect(e.target.value);
    };

    render() {
        const { label, defaultOption, options } = this.props;
        return (
            <Form.Group as={Col}>
                <Form.Label>{label}</Form.Label>
                <Form.Control
                    as="select"
                    onChange={this.onSelect}
                    value={defaultOption}
                >
                    {options.map(option => (
                        <option key={option[0]} value={option[0]}>
                            {option[1]}
                        </option>
                    ))}
                </Form.Control>
            </Form.Group>
        );
    }
}

export class IntegerSelect extends React.Component<SelectProps<number>> {
    onSelect = (e: any) => {
        this.props.onSelect(Math.floor(parseInt(e.target.value)));
    };

    render() {
        const { label, defaultOption, options } = this.props;
        return (
            <Form.Group as={Col}>
                <Form.Label>{label}</Form.Label>
                <Form.Control
                    as="select"
                    onChange={this.onSelect}
                    value={defaultOption.toString()}
                >
                    {options.map(option => (
                        <option key={option[0]} value={option[0]}>
                            {option[1]}
                        </option>
                    ))}
                </Form.Control>
            </Form.Group>
        );
    }
}

type TextInputProps = {
    label: string;
    defaultValue: string;
    placeholder?: string;
    onChange: (value: string) => void;
};

export class TextArea extends React.Component<
    TextInputProps & { rows?: number }
> {
    onChange = (e: any) => {
        this.props.onChange(e.target.value);
    };

    render() {
        const { label, defaultValue, placeholder = "", rows = 1 } = this.props;

        return (
            <Form.Group as={Col}>
                <Form.Label>{label}</Form.Label>
                <Form.Control
                    as="textarea"
                    rows={rows}
                    value={defaultValue}
                    placeholder={placeholder}
                    onChange={this.onChange}
                />
            </Form.Group>
        );
    }
}

export class TextInput extends React.Component<TextInputProps> {
    onChange = (e: any) => {
        this.props.onChange(e.target.value);
    };

    render() {
        const { label, defaultValue, placeholder = "" } = this.props;

        return (
            <Form.Group as={Col}>
                <Form.Label>{label}</Form.Label>
                <Form.Control
                    placeholder={placeholder}
                    value={defaultValue}
                    onChange={this.onChange}
                />
            </Form.Group>
        );
    }
}

type IntegerInputProps = {
    label: string;
    defaultValue: number;
    onChange: (value: number) => void;
};

export class IntegerInput extends React.Component<IntegerInputProps> {
    onChange = (e: any) => {
        this.props.onChange(Math.floor(parseInt(e.target.value || 0)));
    };

    render() {
        const { label, defaultValue } = this.props;

        return (
            <Form.Group as={Col}>
                <Form.Label>{label}</Form.Label>
                <Form.Control
                    type="number"
                    value={defaultValue.toString()}
                    onChange={this.onChange}
                    min={0}
                />
            </Form.Group>
        );
    }
}

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
                    label="Type"
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
