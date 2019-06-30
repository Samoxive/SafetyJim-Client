import * as React from "react";
import { Accordion, Card, Button } from "react-bootstrap";
import { faqs } from "./faq_resource";
import Markdown from "react-markdown";

export const FAQ = (props: {}) => (
    <div style={{ margin: "8px 8px 8px 8px" }}>
        <Accordion>
            {faqs.map((faq, i) => (
                <Card key={i}>
                    <Card.Header>
                        <Accordion.Toggle
                            as={Button}
                            variant="link"
                            eventKey={`${i}`}
                        >
                            {faq.title}
                        </Accordion.Toggle>
                    </Card.Header>
                    <Accordion.Collapse eventKey={`${i}`}>
                        <Card.Body>
                            <Markdown source={faq.description} />
                        </Card.Body>
                    </Accordion.Collapse>
                </Card>
            ))}
        </Accordion>
    </div>
);
