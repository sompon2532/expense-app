import React from "react"

class Login extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
			email: '',
			password: ''
		}

		this.handleChange = this.handleChange.bind(this)
    	this.handleSubmit = this.handleSubmit.bind(this)
	}
	
	handleChange(event) {
		this.setState({
			[event.target.name]: event.target.value
		});
	}

	handleSubmit(event) {
		let email = this.state.email
		let password = this.state.password

		let user = firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
			// Handle Errors here.
			var errorCode = error.code
			var errorMessage = error.message
			// ...

			console.log(error)
		})

		event.preventDefault()
	}

    render() {
        return (
			<div>
				<h1>Login</h1>
				<form onSubmit={this.handleSubmit}>
					<label>
						Email: <input type="text" name="email" onChange={this.handleChange} />
					</label>
					<label>
						Password: <input type="password" name="password" onChange={this.handleChange} />
					</label>
					<input type="submit" value="Submit" />
				</form>
			</div>
        );
    }
}

export default Login