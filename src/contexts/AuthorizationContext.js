import React, { useContext, useReducer, useState } from "react";
import { ACTIONS } from "../helpers/consts";

export const AuthorizationContext = React.createContext();

export const useAutho = () => {
    return useContext(AuthorizationContext);
};

const AuthorizationContextProvider = ({ children }) => {
    const [signModal, setSignModal] = useState(false);
    const [logModal, setLogModal] = useState(false);

    // let user = JSON.parse(localStorage.getItem("user"));
    // const [logged, setLogged] = useState({
    //     isLogged: false,
    //     email: "",
    // });

    const [loading, setLoading] = useState(false);
    const [signName, setSignName] = useState("");
    const [signPassword, setSignPassword] = useState("");
    const [signCheckPassword, setSignCheckPassword] = useState("");
    const [logName, setLogName] = useState("");
    const [logPassword, setLogPassword] = useState("");

    const INIT_STATE = {
        users: [],
        blogs: [],
        logged: JSON.parse(localStorage.getItem("user")) || {
            isLogged: false,
            email: "",
        },
        // loading: true,
    };

    const reducer = (state = INIT_STATE, action) => {
        switch (action.type) {
            case ACTIONS.SET_USER:
                let newUsers = [...state.users];
                newUsers.push(action.payload);
                return { ...state, users: newUsers };
            case ACTIONS.CHANGE_LOGGED:
                return { ...state, logged: action.payload };
        }
    };

    const [state, dispatch] = useReducer(reducer, INIT_STATE);

    const changeLoggedUser = (user) => {
        dispatch({
            type: ACTIONS.CHANGE_LOGGED,
            payload: user,
        });
    };

    const value = {
        signModal,
        setSignModal,
        logModal,
        setLogModal,
        // logged,
        // setLogged,
        signName,
        setSignName,
        signPassword,
        setSignPassword,
        signCheckPassword,
        setSignCheckPassword,
        state,
        dispatch,
        users: state.users,
        logName,
        setLogName,
        logPassword,
        setLogPassword,
        setLoading,
        logged: state.logged,
        changeLoggedUser,
    };

    return (
        <AuthorizationContext.Provider value={value}>
            {children}
        </AuthorizationContext.Provider>
    );
};

export default AuthorizationContextProvider;
