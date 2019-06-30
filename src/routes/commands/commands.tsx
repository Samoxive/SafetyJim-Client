import { Card, Popover, OverlayTrigger, Button } from "react-bootstrap";
import * as React from "react";
import "./commands.css";
import { commands } from "./commands_resource";

export const Commands = (props: {}) => (
    <div style={{ margin: "8px 8px 8px 8px" }} className="commands">
        {commands
            .sort((a, b) => a.name.localeCompare(b.name))
            .map(command => {
                const usagesOverlay = (
                    <Popover id={`usages-popover-${command.name}`}>
                        <ul>
                            {command.usages.map((usage, i) => (
                                <li key={i}>
                                    <code>{usage}</code>
                                </li>
                            ))}
                        </ul>
                    </Popover>
                );
                const examplesOverlay = (
                    <Popover id={`examples-popover-${command.name}`}>
                        <ul>
                            {command.examples.map((example, i) => (
                                <li key={i}>
                                    <code>{example}</code>
                                </li>
                            ))}
                        </ul>
                    </Popover>
                );
                return (
                    <Card key={command.name} className="command">
                        <Card.Body>
                            <Card.Title>{command.name}</Card.Title>
                            <Card.Subtitle className="mb-2 text-muted">
                                {command.tooltip}
                            </Card.Subtitle>
                            <Card.Text>{command.description}</Card.Text>
                            <OverlayTrigger
                                trigger="focus"
                                placement="top"
                                overlay={usagesOverlay}
                            >
                                <Card.Link>
                                    <Button variant="outline-primary">
                                        Usages
                                    </Button>
                                </Card.Link>
                            </OverlayTrigger>
                            <OverlayTrigger
                                trigger="focus"
                                placement="top"
                                overlay={examplesOverlay}
                            >
                                <Card.Link>
                                    <Button variant="outline-primary">
                                        Examples
                                    </Button>
                                </Card.Link>
                            </OverlayTrigger>
                        </Card.Body>
                    </Card>
                );
            })}
    </div>
);
