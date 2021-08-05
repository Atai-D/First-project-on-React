import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import SignUp from "../components/Authorization/SignUp";
import AddBlog from "../components/Blog/AddBlog";
import Home from "../components/Home/Home";
import Navbar from "../components/Navbar/Navbar";
import AuthorizationContextProvider from "../contexts/AuthorizationContext";
import BlogContextProvider from "../contexts/BlogContext";

const Routes = () => {
    return (
        <BrowserRouter>
            <AuthorizationContextProvider>
                <BlogContextProvider>
                    <Navbar />
                    <Switch>
                        <Route exact path="/" component={Home} />
                        <Route path="/blogList" />
                        <Route path="/addblog" component={AddBlog} />
                    </Switch>
                </BlogContextProvider>
            </AuthorizationContextProvider>
        </BrowserRouter>
    );
};

export default Routes;
