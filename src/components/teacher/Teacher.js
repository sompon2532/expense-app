import React, {Component} from "react"
import { Route, Link } from "react-router-dom"

import AddTeacher from "./AddTeacher"

class Teacher extends Component {
    constructor(props) {
        super(props)
    }
    render() {
        return (
            <div>
                <h3>Teacher</h3>
                <ul>
                    <li><Link to="/teacher/add">Add teacher</Link></li>
                </ul>

                <Route exact path="/teacher/add" component={AddTeacher} />
            </div>
        )
    }
}

export default Teacher