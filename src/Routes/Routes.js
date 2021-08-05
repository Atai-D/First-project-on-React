import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import SignUp from "../components/Authorization/SignUp";
import Home from "../components/Home/Home";
import Navbar from "../components/Navbar/Navbar";
import AuthorizationContext from "../contexts/AuthorizationContext";

const Routes = () => {
    return (
        <BrowserRouter>
            <AuthorizationContext>
                <Navbar />
                <Switch>
                    <Route exact path="/" component={Home} />
                    {/* <Route exact path="" */}
                </Switch>
            </AuthorizationContext>
        </BrowserRouter>
    );
};

export default Routes;
