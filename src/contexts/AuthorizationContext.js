import React, { useContext, useState } from "react";

export const AuthorizationContext = React.createContext();

export const useAutho = () => {
    return useContext(AuthorizationContext);
};

const AuthorizationContextProvider = ({ children }) => {
    const [signModal, setSignModal] = useState(false);
    const [user, setUser] = useState("");
    const [logged, setLogged] = useState(false);

    const value = {
        signModal,
        setSignModal,
        user,
        setUser,
        logged,
        setLogged,
    };

    return (
        <AuthorizationContext.Provider value={value}>
            {children}
        </AuthorizationContext.Provider>
    );
};

export default AuthorizationContextProvider;
