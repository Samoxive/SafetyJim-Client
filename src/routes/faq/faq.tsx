import * as React from "react";
import { Accordion, Card, Button } from "react-bootstrap";
import { faqs } from "./faq_resource";
import Markdown from "react-markdown";
import { MetaTag } from "../../components/meta_tag";

export const FAQ = () => (
    <div style={{ margin: "8px 8px 8px 8px" }}>
        <MetaTag
            title="Safety Jim - FAQ"
            description="Frequently asked questions about Safety Jim"
        />
        <Accordion>
            {faqs.map((faq, i) => (
                <Accordion.Item key={i} eventKey={`${i}`}>
                    <Accordion.Header>{faq.title}</Accordion.Header>
                    <Accordion.Body>
                        <Markdown children={faq.description} />
                    </Accordion.Body>
                </Accordion.Item>
            ))}
        </Accordion>
    </div>
);
