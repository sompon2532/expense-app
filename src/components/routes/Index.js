import React from "react"
import { BrowserRouter, Route, Link, Switch, Redirect } from "react-router-dom";

import Home from "../home/Home"
import Login from "../auth/Login"
import Register from "../auth/Register"
import Dashboard from "../dashboard/Dashboard";

const AuthCheck = () => {
    let user = firebase.auth().currentUser

    console.log(firebase.auth().currentUser)

    if (!user) {
        return false
    }

    return true
}


const AuthRoute = ({ component: Component }) => (
    <Route
        render = {
            props => AuthCheck() ? (<Component />) : (<Redirect to="/login"/>)
        }
    />
)
  

export default () => (
    <BrowserRouter>
        <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/login" component={Login} />
            <Route path="/register" component={Register} />
            <AuthRoute paht="/dashboard" component={Dashboard} />
        </Switch>
    </BrowserRouter>
);