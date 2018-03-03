import React from "react"
import { Redirect } from "react-router-dom"
import { Spinner } from '@blueprintjs/core'
import firebase from "../base"

class Logout extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            redirectToReferrer: false
        }
    }

    componentWillMount() {
        firebase.auth().signOut().then(() => {
            // Sign-out successful.
            this.setState({
                ['redirectToReferrer']: true
            })
        }).catch((error) => {
            // An error happened.
        })
    }

    render() {
        if (this.state.redirectToReferrer === true) {
            return (<Redirect to="/" />)
        }

        return (
            <div style={{ textAlign: "center", position: "absolute", top: "25%", left: "50%" }}>
                <h3>Logging Out</h3>
                <Spinner />
            </div>
        )
    }
}

export default Logout