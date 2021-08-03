import { Button, Modal } from "react-bootstrap";
import React, { useState } from "react";
import Input from "@material-ui/core/Input";

import "bootstrap/dist/css/bootstrap.min.css";

const SignUp = () => {
    // const [smShow, setSmShow] = useState(false);
    const [lgShow, setLgShow] = useState(false);

    return (
        <>
            {/* <Button onClick={() => setSmShow(true)}>Small modal</Button> */}
            <Button onClick={() => setLgShow(true)}>Large modal</Button>
            {/* <Modal
                size="sm"
                show={smShow}
                onHide={() => setSmShow(false)}
                aria-labelledby="example-modal-sizes-title-sm"
            >
                <Modal.Header closeButton>
                    <Modal.Title id="example-modal-sizes-title-sm">
                        Small Modal
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>...</Modal.Body>
            </Modal> */}
            <Modal
                size="lg"
                show={lgShow}
                onHide={() => setLgShow(false)}
                aria-labelledby="example-modal-sizes-title-lg"
            >
                <Modal.Header closeButton>
                    <Modal.Title id="example-modal-sizes-title-lg">
                        Large Modal
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Input className="MuiInput-fullWidth" />
                </Modal.Body>
            </Modal>
        </>
    );
};

export default SignUp;
