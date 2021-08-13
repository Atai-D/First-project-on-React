import { Button, Container, Modal } from "react-bootstrap";
import React, { useState } from "react";
import Input from "@material-ui/core/Input";

import "bootstrap/dist/css/bootstrap.min.css";
import { useAutho } from "../../contexts/AuthorizationContext";
import { ACTIONS, JSON_API_USERS } from "../../helpers/consts";
import {
    Grid,
    Typography,
    TextField,
    Button as ButtonUI,
    Snackbar,
} from "@material-ui/core";
import MuiAlert from "@material-ui/lab/Alert";
import axios from "axios";
import { Link } from "react-router-dom";

const LogIn = () => {
    const {
        setSignModal,
        logModal,
        setLogModal,
        // setLogged,
        changeLoggedUser,
        setSignName,
        users,
        logName,
        setLogName,
        logPassword,
        setLogPassword,
    } = useAutho();

    const [isInUsers, setIsInUsers] = useState(false);

    // const [open, setOpen] = useState({
    //     open: false,
    //     message: "",
    // });

    // const handleClick = () => {
    //     setOpen({ ...open, open: true });
    // };

    // const handleClose = (event, reason) => {
    //     if (reason === "clickaway") {
    //         return;
    //     }

    //     setOpen({ ...open, open: false });
    // };

    // function Alert(props) {
    //     return <MuiAlert elevation={6} variant="filled" {...props} />;
    // }

    const handleSubmit = async (e) => {
        e.preventDefault();

        let flag = false;

        const { data } = await axios(JSON_API_USERS);

        for (let i = 0; i < data.length; i++) {
            if (data[i].email.toLowerCase() === logName.toLowerCase()) {
                flag = true;
            }
        }

        if (!flag) {
            flag = false;
            setIsInUsers(true);
            return;
        } else {
            if (flag) {
                let authUser = "";
                let arr = await data.map((user) => {
                    if (user.email.toLowerCase() === logName.toLowerCase()) {
                        authUser = user;
                        authUser.isLogged = true;
                        localStorage.setItem("user", JSON.stringify(authUser));
                    }
                });
                if (
                    authUser.password.toLowerCase() ===
                    logPassword.toString().toLowerCase()
                ) {
                    if (authUser.isAdmin) {
                        // setOpen({
                        //     ...open,
                        //     message: "Добро пожаловать, админ",
                        // });
                        alert("Добро пожаловать, админ");
                    } else {
                        // setOpen({
                        //     ...open,
                        //     message: `Добро пожаловать, ${authUser.email}`,
                        // });
                        // console.log(open.message);
                        alert(`Добро пожаловать, ${authUser.email}`);
                    }
                    setLogName("");
                    setLogPassword("");
                    setLogModal(false);
                    setIsInUsers(false);
                    changeLoggedUser(authUser);
                } else {
                    alert("Ваши пароли не совпадают");
                }
            }
        }
    };

    return (
        <>
            {/* <Snackbar
                open={open.open}
                autoHideDuration={2000}
                onClose={handleClose}
            >
                <Alert onClose={handleClose} severity="success">
                    {open.message}
                </Alert>
            </Snackbar> */}
            <Modal
                size="lg"
                show={logModal}
                onHide={() => {
                    setLogModal(false);
                    setIsInUsers(false);
                }}
                style={{ color: "#bfe0c2", zIndex: "10000" }}
                aria-labelledby="example-modal-sizes-title-lg"
            >
                <Modal.Header closeButton>
                    <Modal.Title id="example-modal-sizes-title-lg">
                        Log In
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Container commponent="main" maxWidth="xs">
                        <form action="" onSubmit={handleSubmit}>
                            <Grid container>
                                <Typography
                                    component="h1"
                                    variant="h5"
                                    style={{
                                        marginLeft: "-15px",
                                        marginRight: "15px",
                                    }}
                                >
                                    Authorization
                                </Typography>
                                <Grid>
                                    <TextField
                                        name="email"
                                        variant="outlined"
                                        required
                                        label="Email address"
                                        type="text"
                                        value={logName}
                                        onChange={(e) =>
                                            setLogName(e.target.value)
                                        }
                                        style={{ margin: "10px 0" }}
                                    />
                                    <TextField
                                        name="password"
                                        variant="outlined"
                                        required
                                        label="Password"
                                        type="password"
                                        value={logPassword}
                                        onChange={(e) =>
                                            setLogPassword(e.target.value)
                                        }
                                        style={{ margin: "10px 0" }}
                                    />
                                </Grid>
                                <ButtonUI
                                    variant="contained"
                                    color="primary"
                                    type="submit"
                                    style={{
                                        backgroundColor: "#bfe0c2",
                                        color: "#fff",
                                        marginRight: "-15",
                                        marginTop: "10px",
                                    }}
                                >
                                    Log In
                                </ButtonUI>
                            </Grid>
                        </form>
                        {isInUsers ? (
                            <h5>
                                Пользователя с таким именем не существует.
                                <ButtonUI
                                    onClick={() => {
                                        setSignModal(true);
                                        setLogModal(false);
                                        setSignName(logName);
                                    }}
                                >
                                    {/* <Link exact to="/"> */}
                                    Хотите зарегистрироваться?
                                    {/* </Link> */}
                                </ButtonUI>
                            </h5>
                        ) : (
                            ""
                        )}
                    </Container>
                </Modal.Body>
            </Modal>
        </>
    );
};

export default LogIn;
