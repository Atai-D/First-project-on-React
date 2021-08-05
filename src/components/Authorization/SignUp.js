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
} from "@material-ui/core";
import axios from "axios";
import { Link } from "react-router-dom";

const SignUp = () => {
    const {
        signModal,
        setSignModal,
        logModal,
        setLogModal,
        user,
        setUser,
        logged,
        setLogged,
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

    const handleSubmit = async (e) => {
        e.preventDefault();

        let flag = false;

        const { data } = await axios(JSON_API_USERS);

        console.log(data);
        for (let i = 0; i < data.length; i++) {
            if (data[i].email.toLowerCase() === signName.toLowerCase()) {
                setIsInUsers(true);
                flag = true;
            }
        }

        if (flag) {
            console.log(users);
            flag = false;
            return;
        } else {
            if (
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
                alert("Вы успешно зарегистрировались");
                setSignName("");
                setSignPassword("");
                setSignCheckPassword("");
                setSignModal(false);
                setIsInUsers(false);
                newUser.isLogged = true;
                setLogged(newUser);
            } else if (
                !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(signName)
            ) {
                alert("Вы неверно ввели свою почту");
            } else if (
                signPassword.toLowerCase() !== signCheckPassword.toLowerCase()
            ) {
                alert("Вы неверно ввели пароль, пожалуйста, проверьте данные");
            }
        }
    };

    return (
        <>
            <Modal
                size="lg"
                show={signModal}
                onHide={() => {
                    setSignModal(false);
                    setIsInUsers(false);
                }}
                aria-labelledby="example-modal-sizes-title-lg"
            >
                <Modal.Header closeButton>
                    <Modal.Title id="example-modal-sizes-title-lg">
                        Sign Up
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Container commponent="main" maxWidth="xs">
                        <form action="" onSubmit={handleSubmit}>
                            <Grid container>
                                <Typography
                                    component="h1"
                                    variant="h5"
                                    style={{ marginBottom: "10px" }}
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
                                        placeholder="email"
                                        value={signName}
                                        onChange={(e) =>
                                            setSignName(e.target.value)
                                        }
                                    />
                                    <TextField
                                        name="password"
                                        variant="outlined"
                                        required
                                        label="Password"
                                        type="password"
                                        placeholder="password"
                                        value={signPassword}
                                        onChange={(e) =>
                                            setSignPassword(e.target.value)
                                        }
                                    />
                                    <TextField
                                        variant="outlined"
                                        required
                                        label="Password again"
                                        type="password"
                                        placeholder="repeat password"
                                        value={signCheckPassword}
                                        onChange={(e) =>
                                            setSignCheckPassword(e.target.value)
                                        }
                                    />
                                </Grid>
                                <ButtonUI
                                    variant="contained"
                        
                                    type="submit"
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
                                    {/* <Link exact to="/"> */}
                                    Хотите войти?
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

export default SignUp;
