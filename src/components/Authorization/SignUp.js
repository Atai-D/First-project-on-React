import { Button, Container, Modal } from "react-bootstrap";
import React, { useState } from "react";
// import Input from "@material-ui/core/Input";

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
                newUser.id = data.id;
                changeLoggedUser(newUser);
                localStorage.setItem("user", JSON.stringify(newUser));
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
                style={{color: "#bfe0c2", zIndex: "10000"}}
                aria-labelledby="example-modal-sizes-title-lg"
            >
                <Modal.Header closeButton>
                    <Modal.Title id="example-modal-sizes-title-lg">
                        Sign Up
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body boxSizing="none">
                    <Container commponent="main" maxWidth="xs">
                        <form action="" onSubmit={handleSubmit}>
                            <Grid container>
                                <Typography
                                    component="h1"
                                    variant="h5"
                                    style={{ marginLeft: "-15px", marginRight: "15px"}}
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
                
                                    />
                                    <TextField
                                        name="password"
                                        variant="outlined"
                                        required
                                        label="Password"
                                        type="password"
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
                                        value={signCheckPassword}
                                        onChange={(e) =>
                                            setSignCheckPassword(e.target.value)
                                        }
                                    />
                                </Grid>
                                <ButtonUI variant="contained" type="submit"
                                        style={{backgroundColor: "#bfe0c2", color: "#fff"}}>
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
