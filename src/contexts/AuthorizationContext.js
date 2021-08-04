import React, { useContext, useReducer, useState } from "react";
import { ACTIONS } from "../helpers/consts";

export const AuthorizationContext = React.createContext();

export const useAutho = () => {
    return useContext(AuthorizationContext);
};

const AuthorizationContextProvider = ({ children }) => {
    const [signModal, setSignModal] = useState(false);
    const [user, setUser] = useState("");
    const [logged, setLogged] = useState(false);
    const [signName, setSignName] = useState("");
    const [signPassword, setSignPassword] = useState("");
    const [signCheckPassword, setSignCheckPassword] = useState("");

    const INIT_STATE = {
        users: [],
        blogs: [],
    };

    const reducer = (state = INIT_STATE, action) => {
        switch (action.type) {
            case ACTIONS.SET_USER:
                let newState = { ...state };
                newState.users.push(action.payload);
                console.log(state);
                return newState;
        }
    };

    const [state, dispatch] = useReducer(reducer, INIT_STATE);

    const value = {
        signModal,
        setSignModal,
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
    };

    return (
        <AuthorizationContext.Provider value={value}>
            {children}
        </AuthorizationContext.Provider>
    );
};

export default AuthorizationContextProvider;
