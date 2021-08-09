import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import SignUp from "../components/Authorization/SignUp";
import AddBlog from "../components/Blog/AddBlog";
import BlogDetails from "../components/Blog/BlogDetails";
import BlogList from "../components/Blog/BlogList";
import MyBlog from "../components/Blog/MyBlog";
import Home from "../components/Home/Home";
import Navbar from "../components/Navbar/Navbar";
import AuthorizationContextProvider from "../contexts/AuthorizationContext";
import BlogContextProvider from "../contexts/BlogContext";

import ProdectedRoute from "./ProdectedRoute";


const Routes = () => {
    return (
        <BrowserRouter>
            <BlogContextProvider>
                <Navbar />
                <Switch>
                    <Route exact path="/" component={Home} />
                    <Route path="/bloglist" component={BlogList} />
                    <ProdectedRoute path="/addblog" component={AddBlog} />
                    <ProdectedRoute path="/myblog" component={MyBlog} />
                    <Route path="/blog/:id" component={BlogDetails} />
                </Switch>
            </BlogContextProvider>
        </BrowserRouter>
    );
};

export default Routes;
