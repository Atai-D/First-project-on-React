import React, { useEffect, useState } from "react";
import { Route, Redirect } from "react-router-dom";
import { useAutho } from "../contexts/AuthorizationContext";

const ProdectedRoute = ({ component: Component, ...rest }) => {
    const { logged, setLogModal } = useAutho();
    // const [flag, setFlag] = useState(logged.isLogged);

    // useEffect(() => {
    //     const user = JSON.parse(localStorage.getItem("user"));
    //     if (!user) {
    //         setFlag(false);
    //     } else {
    //         setFlag(true);
    //     }
    // }, [logged]);

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
