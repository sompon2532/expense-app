import React from "react"
import { BrowserRouter as Router, Route, Redirect, Switch } from "react-router-dom"
import { Spinner } from "@blueprintjs/core"
import firebase from "./base"

import Login from "../components/auth/Login"
import Register from "../components/auth/Register"
import Logout from "../components/auth/Logout"
import Expense from "../components/expense/Expense"

const AuthenticatedRoute = ({ component: Component, authenticated, ...rest }) => {
    return (
        <Route
            render={(props) => authenticated === true
                ? <Component {...props} {...rest} />
                : <Redirect to={{ pathname: '/login', state: { from: props.location } }} />} />
    )
}

class App extends React.Component {
    constructor() {
        super()
        this.setCurrentUser = this.setCurrentUser.bind(this)
        this.state = {
            authenticated: false,
            currentUser: null,
            loading: true
        }
    }

    setCurrentUser(user) {
        if (user) {
            this.setState({
                currentUser: user,
                authenticated: true,
            })
        } else {
            this.setState({
                currentUser: null,
                authenticated: false
            })
        }
    }

    componentWillMount() {
        this.removeAuthListener = firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                this.setState({
                    authenticated: true,
                    currentUser: user,
                    loading: false,
                })
            } else {
                this.setState({
                    authenticated: false,
                    currentUser: null,
                    loading: false,
                })
            }
        })
    }

    componentDidMount() {
        // this.removeAuthListener()
    }

    render() {
        if (this.state.loading === true) {
            return (
                <div style={{ textAlign: "center", position: "absolute", top: "25%", left: "50%" }}>
                    <h3>Loading</h3>
                    <Spinner />
                </div>
            )
        }

        return (
            <div>
                <h1>Expense app</h1>
                <Router>
                    <Switch>
                        <Route exact path="/login" render={(props) => {
                            return <Login setCurrentUser={this.setCurrentUser} {...props} />
                        }} />
                        <Route exact path="/register" render={(props) => {
                            return <Register {...props} />
                        }} />
                        <Route exact path="/logout" component={Logout} />
                        <AuthenticatedRoute
                            exact
                            path="/expense"
                            authenticated={this.state.authenticated}
                            component={Expense}
                        />
                    </Switch>
                </Router>
            </div>
        )
    }
}

export default App