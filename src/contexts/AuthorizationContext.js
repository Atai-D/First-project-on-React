import React, { useContext, useReducer, useState } from "react";
import { ACTIONS } from "../helpers/consts";

export const AuthorizationContext = React.createContext();

export const useAutho = () => {
    return useContext(AuthorizationContext);
};

const AuthorizationContextProvider = ({ children }) => {
    const [signModal, setSignModal] = useState(false);
    const [logModal, setLogModal] = useState(false);
    const [user, setUser] = useState("");
    const [logged, setLogged] = useState({
        isLogged: false,
        email: "",
        id: "",
    });
    const [signName, setSignName] = useState("");
    const [signPassword, setSignPassword] = useState("");
    const [signCheckPassword, setSignCheckPassword] = useState("");
    const [logName, setLogName] = useState("");
    const [logPassword, setLogPassword] = useState("");

    const INIT_STATE = {
        users: [],
        blogs: [],
    };

    const reducer = (state = INIT_STATE, action) => {
        console.log(state.users);
        switch (action.type) {
            case ACTIONS.SET_USER:
                let newUsers = [...state.users];
                newUsers.push(action.payload);
                return { ...state, users: newUsers };
        }
    };

    const [state, dispatch] = useReducer(reducer, INIT_STATE);

    const value = {
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
        users: state.users,
        logName,
        setLogName,
        logPassword,
        setLogPassword,
    };

    return (
        <AuthorizationContext.Provider value={value}>
            {children}
        </AuthorizationContext.Provider>
    );
};

export default AuthorizationContextProvider;
