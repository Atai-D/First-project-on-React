import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import AddBlog from "../components/Blog/AddBlog";
import BlogDetails from "../components/Blog/BlogDetails";
import BlogList from "../components/Blog/BlogList";
import MyBlog from "../components/Blog/MyBlog";
import Home from "../components/Home/Home";
import Navbar from "../components/Navbar/Navbar";
import Payment from "../components/Payment/Payment";
import MyPromotions from "../components/Promotion/MyPromotions";
import Promotion from "../components/Promotion/Promotion";
import BlogContextProvider from "../contexts/BlogContext";

import ProdectedRoute from "./ProdectedRoute";

const Routes = () => {
    return (
        <BrowserRouter>
            <BlogContextProvider>
                <Navbar />
                <Switch>
                    <Route exact path="/" component={Home} />
                    <Route exact path="/bloglist" component={BlogList} />
                    <ProdectedRoute exact path="/addblog" component={AddBlog} />
                    <ProdectedRoute exact path="/myblog" component={MyBlog} />
                    <Route exact path="/blog/:id" component={BlogDetails} />
                    <Route exact path="/payment" component={Payment} />
                    <ProdectedRoute
                        exact
                        path="/promotion"
                        component={Promotion}
                    />
                    <ProdectedRoute
                        exact
                        path="/mypromotions"
                        component={MyPromotions}
                    />
                </Switch>
            </BlogContextProvider>
        </BrowserRouter>
    );
};

export default Routes;
