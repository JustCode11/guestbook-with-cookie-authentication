import React from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Layout from "../components/Layout";

import Home from './home';
import Register from "./register";

const Pages = () => {
    return (
        <>
            <Router>
                <Layout>
                    <Switch>
                        <Route exact path="/">
                            <Home />
                        </Route>
                        <Route exact path="/register">
                            <Register />
                        </Route>
                    </Switch>
                </Layout>
            </Router>
        </>
    )
};

export default Pages;