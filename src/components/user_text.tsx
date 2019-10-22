import * as React from "react";
import { User } from "../entities/user";
import { OverlayTrigger, Tooltip, Button } from "react-bootstrap";

type UserTextProps = {
    user: User;
};

export const UserText = ({ user }: UserTextProps) => (
    <OverlayTrigger
        overlay={
            <Tooltip id={user.id + Math.random()}>{`ID: ${user.id}`}</Tooltip>
        }
    >
        {user.username}
    </OverlayTrigger>
);
