import React from "react"
import { Redirect } from 'react-router-dom'
import Loading from "../blueprint/Loading"
import firebase from "../../base"

class Login extends React.Component {
    constructor(props) {
		super(props)
        this.state = {
			email: '',
			password: '',
			redirectToReferrer: false,
			loading: false,
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
		
		this.setState({
			loading: true
		})

		let user = firebase.auth().signInWithEmailAndPassword(email, password)
		.then((user) => {
			this.setState({
				['loading']: true
			})

			this.props.setCurrentUser(user)

			this.setState({
				['redirectToReferrer']: true,
			})

		})
		.catch(function(error) {
			// Handle Errors here.
			var errorCode = error.code
			var errorMessage = error.message
			// ...

			console.log(error)
		})

		event.preventDefault()
	}

    render() {
		const { from } = this.props.location.state || { from: { pathname: "/" } };

		
		if (this.state.redirectToReferrer === true) {
			return (<Redirect to={from} />)
		}

		if (this.state.loading === true) {
			return (<Loading />)
		}
		
        return (
			<div>
				<h1>Login</h1>
				<form onSubmit={this.handleSubmit}>
					<div>
						<label>
							Email: <input type="text" name="email" onChange={this.handleChange} />
						</label>
					</div>
					<div>
						<label>
							Password: <input type="password" name="password" onChange={this.handleChange} />
						</label>
					</div>
					<div>
						<input type="submit" value="Submit" />
					</div>
				</form>
			</div>
        )
    }
}

export default Login