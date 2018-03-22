import React, { Component } from "react"
import firebase from "../../base"

class ListTeacher extends Component {
    constructor(props) {
        super(props)
        this.state = {
            teacher: []
        }
    }

    componentDidMount() {
        firebase.database().ref('teacher').once('value').then(function (snapshot) {
            
        });
    }

    render() {
        return (
            <div>
                <h3>Teacher List</h3>
                <ul>
                    <li>teacher 1</li>
                    <li>teacher 2</li>
                </ul>
            </div>
        )
    }
}

export default ListTeacher