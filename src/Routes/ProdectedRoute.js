import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useAutho } from "../contexts/AuthorizationContext";

const ProdectedRoute = ({ component: Component, ...rest }) => {
    const { logged, setLogModal } = useAutho();

    return (
        <Route
            {...rest}
            render={({ location }) => {
                if (logged.isLogged) {
                    return <Component />;
                } else {
                    setLogModal(true);
                    return (
                        <Redirect
                            to={{ pathname: "/", state: { from: location } }}
                        />
                    );
                }
            }}
        />
    );
};

export default ProdectedRoute;
