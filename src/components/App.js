import React from "react"
import Router from "./routes"

class App extends React.Component {
    constructor(prop) {
        super(prop)
        this.state = {};
    }

    render() {
        return (
            <div>
                <h1>Expense app</h1>
                <Router />
            </div>
        )
    }
}

export default App