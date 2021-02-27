import { Card, Button, Accordion } from "react-bootstrap";
import * as React from "react";
import "./commands.css";
import { commands } from "./commands_resource";
import { MetaTag } from "../../components/meta_tag";

export const Commands = () => (
    <div style={{ margin: "8px 8px 8px 8px" }} className="commands">
        <MetaTag
            title="Safety Jim - Commands"
            description="Commands and stuff"
        />
        {commands
            .sort((a, b) => a.name.localeCompare(b.name))
            .map((command) => {
                const usagesAccordion = (
                    <Accordion>
                        <Accordion.Toggle
                            as={Button}
                            variant="link"
                            eventKey={`usages-popover-${command.name}`}
                        >
                            Usages
                        </Accordion.Toggle>
                        <Accordion.Collapse
                            eventKey={`usages-popover-${command.name}`}
                        >
                            <ul>
                                {command.usages.map((usage, i) => (
                                    <li key={i}>
                                        <code>{usage}</code>
                                    </li>
                                ))}
                            </ul>
                        </Accordion.Collapse>
                    </Accordion>
                );
                const examplesAccordion = (
                    <Accordion>
                        <Accordion.Toggle
                            as={Button}
                            variant="link"
                            eventKey={`examples-popover-${command.name}`}
                        >
                            Examples
                        </Accordion.Toggle>
                        <Accordion.Collapse
                            eventKey={`examples-popover-${command.name}`}
                        >
                            <ul>
                                {command.examples.map((example, i) => (
                                    <li key={i}>
                                        <code>{example}</code>
                                    </li>
                                ))}
                            </ul>
                        </Accordion.Collapse>
                    </Accordion>
                );
                return (
                    <Card key={command.name} className="command">
                        <Card.Body>
                            <Card.Title>{command.name}</Card.Title>
                            <Card.Subtitle className="mb-2 text-muted">
                                {command.tooltip}
                            </Card.Subtitle>
                            <Card.Text>{command.description}</Card.Text>
                            {usagesAccordion}
                            {examplesAccordion}
                        </Card.Body>
                    </Card>
                );
            })}
    </div>
);
