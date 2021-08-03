import React, { useContext } from "react";

export const useAutho = () => {
    return useContextt(AuthorizationContext);
};

const AuthorizationContext = ({ children }) => {
    return (
        <AuthorizationContext.Provider>
            {children}
        </AuthorizationContext.Provider>
    );
};

export default AuthorizationContext;
