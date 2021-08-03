import { NavLink } from "react-router-dom";
import { Button, Modal } from "react-bootstrap";
import React, { useState } from "react";

import "bootstrap/dist/css/bootstrap.min.css";
import { useAutho } from "../../contexts/AuthorizationContext";

export default function Navbar() {
    const { signModal, setSignModal, user, setUser, logged, setLogged } =
        useAutho();

    const handleClick = () => {
        is();
    };

    return (
        <div style={{ display: "flex" }}>
            <NavLink exact to="/">
                Go home /
            </NavLink>
            <Button onClick={() => setSignModal(true)}>Sign Up</Button>
            <h3>{user}</h3>

            {/* Modal window for sign up */}

            <Modal
                size="lg"
                show={signModal}
                onHide={() => setSignModal(false)}
                aria-labelledby="example-modal-sizes-title-lg"
            >
                <Modal.Header closeButton>
                    <Modal.Title id="example-modal-sizes-title-lg">
                        Large Modal
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form>
                        <input
                            type="text"
                            placeholder="username"
                            value={signName}
                            onChange={() => setSignName(e.target.value)}
                        />
                        <input
                            type="password"
                            placeholder="password"
                            value={signPassword}
                            onChange={() => setSignName(e.target.value)}
                        />
                        <input
                            type="password"
                            placeholder="repeat password"
                            value={signCheckPassword}
                            onChange={() => setSignName(e.target.value)}
                        />
                        <button onClick={handleClick}>Sign Up</button>
                    </form>
                </Modal.Body>
            </Modal>
        </div>
    );
}
