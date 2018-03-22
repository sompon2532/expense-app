import React from "react"
import { BrowserRouter, Route, Redirect, Link, Switch } from "react-router-dom"
import Loading from "./blueprint/Loading"
import firebase from "../base"

import Login from "./auth/Login"
import Register from "./auth/Register"
import Logout from "./auth/Logout"
import Home from "./home/Home"
import Expense from "./expense/Expense"
import Teacher from "./teacher/Teacher"

const AuthenticatedRoute = ({ component: Component, authenticated, ...rest }) => {
    return (
        <Route
            render={(props) => authenticated == true
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
            return (<Loading />)
        }

        return (
            <div>
                <h1>App</h1>
                <BrowserRouter>
                    <div>
                        <ul>
                            <li><Link to="/">Home</Link></li>
                            <li><Link to="/expense">Expense</Link></li>
                            <li><Link to="/teacher">Teacher</Link></li>
                            <li><Link to="/login">Login</Link></li>
                            <li><Link to="/register">Register</Link></li>
                            <li><Link to="/logout">Logout</Link></li>
                        </ul>

                        <Switch>
                            <Route exact path="/" component={Home}/>
                            <Route path="/login" render={(props) => {
                                return <Login setCurrentUser={this.setCurrentUser} {...props} />
                            }} />
                            <Route path="/register" render={(props) => {
                                return <Register {...props} />
                            }} />
                            <Route path="/logout" component={Logout} />
                            <AuthenticatedRoute
                                path="/expense"
                                authenticated={this.state.authenticated}
                                component={Expense}
                            />
                            <AuthenticatedRoute
                                path="/teacher"
                                authenticated={this.state.authenticated}
                                component={Teacher}
                            />
                        </Switch>
                    </div>
                </BrowserRouter>
            </div>
        )
    }
}

export default App