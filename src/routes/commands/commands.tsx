import { Card, Table } from "react-bootstrap";
import * as React from "react";
import "./commands.css";
import { slashCommands } from "./commands_resource";
import { MetaTag } from "../../components/meta_tag";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export const Commands = () => (
    <>
        <div style={{ margin: "8px 8px 0px 8px" }}>
            <FontAwesomeIcon icon="asterisk" size="xs" color="red" /> = required
            parameter
        </div>
        <div style={{ margin: "0px 8px 8px 8px" }} className="commands">
            <MetaTag
                title="Safety Jim - Commands"
                description="Commands and stuff"
            />

            {slashCommands
                .sort((a, b) => a.name.localeCompare(b.name))
                .map((command) => {
                    let parameterTable;
                    if (command.parameters.length > 0) {
                        parameterTable = (
                            <Table striped bordered hover>
                                <thead>
                                    <tr>
                                        <th>Parameter Name</th>
                                        <th>Description</th>
                                        <th>Example Value</th>
                                    </tr>
                                </thead>
                                {command.parameters.map((parameter) => {
                                    let optionalIcon =
                                        parameter.optional ? null : (
                                            <FontAwesomeIcon
                                                icon="asterisk"
                                                size="xs"
                                                color="red"
                                                style={{ marginLeft: "1px" }}
                                            />
                                        );

                                    return (
                                        <tr id={parameter.name}>
                                            <td>
                                                {parameter.name}
                                                {optionalIcon}
                                            </td>
                                            <td>{parameter.description}</td>
                                            <td>{parameter.example}</td>
                                        </tr>
                                    );
                                })}
                            </Table>
                        );
                    } else {
                        parameterTable = null;
                    }

                    return (
                        <Card key={command.name} className="command">
                            <Card.Body>
                                <Card.Title>{command.name}</Card.Title>
                                <Card.Subtitle className="mb-2 text-muted">
                                    {command.tooltip}
                                </Card.Subtitle>
                                {parameterTable}
                            </Card.Body>
                        </Card>
                    );
                })}
        </div>
    </>
);
