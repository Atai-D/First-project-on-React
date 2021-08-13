import { Button, Container, Modal } from "react-bootstrap";
import React, { useState } from "react";
// import Input from "@material-ui/core/Input";
import MuiAlert from "@material-ui/lab/Alert";
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
import axios from "axios";
// import { Link } from "react-router-dom";

const SignUp = () => {
    const {
        signModal,
        setSignModal,
        logModal,
        setLogModal,
        user,
        setUser,
        logged,
        // setLogged,
        changeLoggedUser,
        signName,
        setSignName,
        signPassword,
        setSignPassword,
        signCheckPassword,
        setSignCheckPassword,
        state,
        dispatch,
        users,
        setLogName,
    } = useAutho();

    const [isInUsers, setIsInUsers] = useState(false);

    const [open, setOpen] = useState(false);

    const handleClick = () => {
        setOpen(true);
    };

    const handleClose = (event, reason) => {
        if (reason === "clickaway") {
            return;
        }

        setOpen(false);
    };

    function Alert(props) {
        return <MuiAlert elevation={6} variant="filled" {...props} />;
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        let flag = false;

        const { data } = await axios(JSON_API_USERS);

        // console.log(data);
        for (let i = 0; i < data.length; i++) {
            if (data[i].email.toLowerCase() === signName.toLowerCase()) {
                setIsInUsers(true);
                flag = true;
            }
        }

        if (flag) {
            // console.log(users);
            flag = false;
            return;
        } else {
            if (
                signPassword.length >= 6 &&
                signPassword.toLowerCase() ===
                    signCheckPassword.toLowerCase() &&
                /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(signName)
            ) {
                let newUser = {
                    email: signName,
                    password: signPassword,
                    isLogged: false,
                    isAdmin: false,
                    usersBlogs: [],
                    favourites: [],
                    promotionBlogs: [],
                };
                if (
                    newUser.email.toLowerCase() === "ataydjirgalbaev@gmail.com"
                ) {
                    newUser.isAdmin = true;
                }
                dispatch({
                    type: ACTIONS.SET_USER,
                    payload: newUser,
                });
                const { data } = await axios.post(JSON_API_USERS, newUser);
                setOpen(true);
                setSignName("");
                setSignPassword("");
                setSignCheckPassword("");
                setSignModal(false);
                setIsInUsers(false);
                newUser.isLogged = true;
                newUser.id = data.id;
                changeLoggedUser(newUser);
                localStorage.setItem("user", JSON.stringify(newUser));
            } else if (
                !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(signName)
            ) {
                alert("Вы неверно ввели свою почту");
            } else if (signPassword.length < 6) {
                alert("Ваш пароль должен быть больше шести символов");
            } else if (
                signPassword.toLowerCase() !== signCheckPassword.toLowerCase()
            ) {
                alert("Вы неверно ввели пароль, пожалуйста, проверьте данные");
            }
        }
    };

    return (
        <>
            <Snackbar open={open} autoHideDuration={2000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="success">
                    Вы успешно авторизовались
                </Alert>
            </Snackbar>
            <Modal
                size="lg"
                show={signModal}
                onHide={() => {
                    setSignModal(false);
                    setIsInUsers(false);
                }}
                style={{
                    color: "#8ab584",
                    fontFamily: "nunito",
                    zIndex: "10000",
                    backgroundColor: "rgba(191, 224, 194,0.2)",
                }}
                aria-labelledby="example-modal-sizes-title-lg"
            >
                <Modal.Header
                    closeButton
                    style={{
                        backgroundColor: "rgba(191, 224, 194,0.7)",
                        display: "flex",
                        // alignItems: "center",
                        // justifyContent: "center"
                    }}
                >
                    <Modal.Title
                        id="example-modal-sizes-title-lg"
                        style={{
                            // display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                        }}
                    >
                        Sign Up
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body boxSizing="none">
                    <Container commponent="main" maxWidth="xs">
                        <form action="" onSubmit={handleSubmit}>
                            <Grid
                                style={{
                                    display: "flex",
                                    flexDirection: "column",
                                }}
                            >
                                <Typography
                                    component="h1"
                                    variant="h5"
                                    style={{
                                        // display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        marginBottom: "5px",
                                    }}
                                >
                                    Registration
                                </Typography>

                                <Grid>
                                    <TextField
                                        name="email"
                                        variant="outlined"
                                        required
                                        label="Email address"
                                        type="text"
                                        value={signName}
                                        onChange={(e) =>
                                            setSignName(e.target.value)
                                        }
                                        style={{
                                            marginBottom: "10px",
                                            fontFamily: "nunito",
                                            backgroundColor:
                                                "rgba(191, 224, 194,0.2)",
                                        }}
                                    />

                                    <TextField
                                        // fullWidth={720}
                                        name="password"
                                        variant="outlined"
                                        required
                                        label="Password"
                                        type="password"
                                        value={signPassword}
                                        onChange={(e) =>
                                            setSignPassword(e.target.value)
                                        }
                                        style={{
                                            backgroundColor:
                                                "rgba(191, 224, 194,0.2)",
                                            marginBottom: "10px",
                                            fontFamily: "nunito",
                                        }}
                                    />

                                    <TextField
                                        // fullWidth={600}
                                        variant="outlined"
                                        required
                                        label="Password again"
                                        type="password"
                                        value={signCheckPassword}
                                        onChange={(e) =>
                                            setSignCheckPassword(e.target.value)
                                        }
                                        style={{
                                            backgroundColor:
                                                "rgba(191, 224, 194,0.2)",
                                            marginBottom: "10px",
                                            fontFamily: "nunito",
                                        }}
                                    />
                                </Grid>
                                <ButtonUI
                                    // variant="contained"
                                    type="submit"
                                    style={{
                                        backgroundColor: "#bfe0c2",
                                        marginTop: "10px",
                                        color: "#fff",
                                        // display: "flex",
                                        // alignItems: "left",
                                        // justifyContent: "center"
                                    }}
                                >
                                    Sign Up
                                </ButtonUI>
                            </Grid>
                        </form>
                        {isInUsers ? (
                            <h5>
                                Пользователь с таким именем уже существует.
                                <ButtonUI
                                    onClick={() => {
                                        setSignModal(false);
                                        setLogModal(true);
                                        setLogName(signName);
                                        setSignName("");
                                        setSignPassword("");
                                        setSignCheckPassword("");
                                    }}
                                >
                                    Хотите войти?
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

export default SignUp;
