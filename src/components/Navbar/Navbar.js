import { NavLink } from "react-router-dom";
import { Button, Modal } from "react-bootstrap";
import React, { useState } from "react";

import "bootstrap/dist/css/bootstrap.min.css";
import { useAutho } from "../../contexts/AuthorizationContext";
import SignUp from "../Authorization/SignUp";

export default function Navbar() {
    const { setSignModal, user } = useAutho();

    return (
        <div style={{ display: "flex" }}>
            <NavLink exact to="/">
                Go home /
            </NavLink>
            <Button onClick={() => setSignModal(true)}>Sign Up</Button>
            <h3>{user}</h3>
            <SignUp />
        </div>
    );
}
