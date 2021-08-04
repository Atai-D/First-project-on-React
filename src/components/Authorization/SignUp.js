import { Button, Modal } from "react-bootstrap";
import React, { useState } from "react";
// import Input from "@material-ui/core/Input";

import "bootstrap/dist/css/bootstrap.min.css";
import { useAutho } from "../../contexts/AuthorizationContext";

const SignUp = () => {
    const { signModal, setSignModal } = useAutho();

    return (
        <>
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
                        <input placeholder="username" />
                        <input placeholder="password" />
                        <input placeholder="repeat password" />
                    </form>
                </Modal.Body>
            </Modal>
        </>
    );
};

export default SignUp;
