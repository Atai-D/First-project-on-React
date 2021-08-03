import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import SignUp from "../components/Authorization/SignUp";
import Home from "../components/Home/Home";
import Navbar from "../components/Navbar/Navbar";

const Routes = () => {
    return (
        <BrowserRouter>
            <Navbar />
            <Switch>
                <Route exact path="/" component={Home} />
                <Route path="/signup" component={SignUp} />
            </Switch>
        </BrowserRouter>
    );
};

export default Routes;
