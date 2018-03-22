import React, {Component} from "react"
import { Redirect } from 'react-router-dom'
import firebase from "../../base"

class AddTeacher extends Component {
    constructor(props) {
        super(props)
        this.state = {
            value: '',
            redirectToReferrer: false,
        };

        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }
    handleChange(event) {
        this.setState({
            ['value']:  event.target.value
        })
    }

    handleSubmit(event) {
        event.preventDefault();
        firebase.database().ref('teacher').push({ name: this.state.value })

        this.setState({
            ['redirectToReferrer']: true
        })
    }

    render() {
        const { from } = this.props.location.state || { from: { pathname: "/teacher" } };

        if (this.state.redirectToReferrer === true ) {
            return (<Redirect to={from} />)
        }

        return (
            <div>
                <h3>Form add teacher</h3>
                <form onSubmit={this.handleSubmit}>
                    <label>
                        Teacher:
                        <input type="text" name="name" onChange={this.handleChange} />
                    </label>
                    <input type="submit" value="Add" />
                </form>
            </div>
        )
    }
}

export default AddTeacher