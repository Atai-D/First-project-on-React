import { Button } from "react-bootstrap";
import React from "react";
import { NavLink } from "react-router-dom";
import { useAutho } from "../../contexts/AuthorizationContext";

export default function Navbar() {
    const { signModal, setSignModal, user, setUser } = useAutho();

    return (
        <div style={{ display: "flex" }}>
            <NavLink exact to="/">
                Go home /
            </NavLink>
            <NavLink to="/signup">
                <Button onClick={() => setSignModal(true)}>Sign Up</Button>
            </NavLink>
            <h3>{user}</h3>
        </div>
    );
}
