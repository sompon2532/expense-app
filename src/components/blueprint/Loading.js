import React from "react"
import { Spinner } from "@blueprintjs/core"

class Loading extends React.Component {
    render() {
        return (
            <div style={{ textAlign: "center", position: "absolute", top: "25%", left: "50%" }}>
                <h3>Loading</h3>
                <Spinner />
            </div>
        )
    }
}

export default Loading