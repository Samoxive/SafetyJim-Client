import { Button, Card, Popover } from 'antd';
import * as React from 'react';
import './commands.css';
import { commands } from './commands_resource';

const { Meta } = Card;

export const Commands = (props: {}) => (
    <div style={{margin: '8px 8px 8px 8px'}} className="commands">
        {
            commands.sort((a, b) => a.name.localeCompare(b.name)).map((command) => {
                const actions = [
                    (
                        <Popover trigger="click" title="Usages" content={
                            <ul>
                                {command.usages.map((usage, i) => (<li key={i}>{usage}</li>))}
                            </ul>
                        }>
                            <Button>
                                Usages
                            </Button>
                        </Popover>
                    ),
                    (
                        <Popover trigger="click" title="Examples" content={
                            <ul>
                                {command.examples.map((example, i) => (<li key={i}>{example}</li>))}
                            </ul>
                        }>
                            <Button>
                                Examples
                            </Button>
                        </Popover>
                    )
                ]
                return (
                    <Card hoverable={true}
                          title={command.name}
                          key={command.name}
                          className="command"
                          actions={actions}>
                        <Meta title={command.tooltip} description={command.description} />
                    </Card>
                );
            })
        }
    </div>
);
