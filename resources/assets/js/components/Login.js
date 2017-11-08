import React from 'react'
import {
	Button,
	Row,
	Col,
	FormGroup,
	ControlLabel,
	FormControl,
	Panel,
	Alert,
	HelpBlock,
} from 'react-bootstrap'
import axios from 'axios'
import jwt from 'jsonwebtoken'
import { Redirect } from 'react-router-dom'
import { 
	generateToken, 
	verifyToken 
} from './../helper/auth'

String.prototype.capitalized = function() {
	return this.charAt(0).toUpperCase() + this.slice(1)
}

class Login extends React.Component {

	constructor() {
		super()

		this.state = {
			username: '',
			password: '',
			validation: {
				username: {
					state: null,
					message: '',
					changed: false
				},
				password: {
					state: null,
					message: '',
					changed: false
				}
			},			
			alert: {
				visible: false,
				style: 'info',
				content: 'Lorem ipsum dolor sit amet.'
			},
			isSubmitted: false
		}
	}

	_handleInputValidation({target, val}) {
		const length = val.length
		let state, message, changed = true
		if (length === 0) {
			state = 'error'
			message = `The ${target} field is required.`
		} else {
			state = 'success'
		}

		const validation = Object.assign({},
			this.state.validation, {
				[target]: {state, message, changed}
			}
		)
		
		this.setState({[target]: val, validation}, () => {
			this.renderButton()
		})
	}

	_handleInputChange(e) {
		const target = e.target
		this._handleInputValidation({
			target: target.name,
			val: target.value
		})
	}

	handleAlertDismiss() {
		const alert = Object.assign({}, {visible: false})
		this.setState({alert})
	}

	renderAlert() {
		let {visible, style, content} = this.state.alert
		if (visible) {
			return (
				<Alert 
					bsStyle={style}
					onDismiss={this.handleAlertDismiss.bind(this)}
				>{content}
				</Alert>
			)
		}
	}

	loginSuccess(cb) {
		const alert = Object.assign({}, {
   		visible: true, 
   		style: 'success',
   		content: 'Login successful.'
   	})
		this.setState({alert})
		setTimeout(cb, 500)
	}

	_handleSubmit(e) {
		e.preventDefault()

		this.setState({isSubmitted: true})

		const {username, password} = this.state
		axios.post('login', {username , password})
			.then(response => {
				this.loginSuccess(() => {
					const token = generateToken(response.data)
					localStorage.removeItem('jwt-auth')
					localStorage.setItem('jwt-auth', token)
					this.setState({isSubmitted: false})
				})
			})
			.catch(error => {
				if (error.response) {
			      const data = error.response.data
					if (error.response.status === 500) { // validation error
				      const entries = Object.entries(data)
				      let errors
				      for (let i in entries) {
				      	const key = entries[i][0]
				      	const message = entries[i][1][0]
				      	errors = Object.assign({}, 
				      		errors, 
				      		{[key]: {state: 'error', message, changed: true}}
			      		)
				      }

				      const validation = Object.assign({},
				      	this.state.validation, errors
			      	)

				      this.setState({
				      	validation,
				      	isSubmitted: false
				      })
					} else if (error.response.status === 499) { // invalid credentials
						const alert = Object.assign({}, {
				   		visible: true, 
				   		style: 'danger',
				   		content: error.response.data.error.messages
				   	})

						const errors = Object.assign({}, 
			      		errors, {
			      			username: {state: 'error', changed: true},
			      			password: {state: 'error', changed: true}
			      		}
		      		)

		      		const validation = Object.assign({},
				      	this.state.validation, errors
			      	)

						this.setState({alert, validation, isSubmitted: false})
					}
			   }
		   })
	}

	renderButton() {
		const entries = Object.entries(this.state.validation)
		const state = !entries.some((e) => e[1].state !== 'success')
		const changed = entries.every((e) => e[1].changed)
		const buttonEnable = state && changed

		return (
			<Button 
				type="submit" 
				bsStyle="success" 
				bsSize="small" 
				block active				
				// disabled={this.state.isSubmitted}
			>{this.state.isSubmitted ? 'Signing...' : 'Sign In'}
			</Button>
		)
		/*if (buttonEnable) {
			return (
				<Button 
					type="submit" 
					bsStyle="success" 
					bsSize="small" 
					block active
					disabled={this.state.isSubmitted}
				>{this.state.isSubmitted ? 'Signing...' : 'Sign In'}
				</Button>
			)
		} else {
			return (
				<Button 
					type="submit" 
					bsStyle="success" 
					bsSize="small" 
					block disabled
				>Sign In
				</Button>
			)
		}*/
	}

	render() {
		if (verifyToken(localStorage.getItem('jwt-auth'))) {
			return <Redirect to="home" />
		}

		return (
			<div className="container">
				<Row>
					<Col md={4} mdOffset={4}>
						<h3 style={{ textAlign: 'center' }}>
						Login
						</h3>
						<br/>
						<Panel>
							{this.renderAlert()}
							<form action="" onSubmit={this._handleSubmit.bind(this)}>
							{/*	<Alert bsStyle={'danger'}>Invalid username or password</Alert>
								<Alert bsStyle={'success'}>Login successful</Alert>*/}
								<FormGroup 
									controlId="formControlsUserName" 
									validationState={this.state.validation.username.state}
									bsSize="small"
								>
									<ControlLabel>Username</ControlLabel>
									<FormControl 
										name="username"
										type="text" 
										placeholder="Enter username"
										disabled={this.state.isSubmitted}
										value={this.state.username}
										onChange={this._handleInputChange.bind(this)}
										onBlur={this._handleInputChange.bind(this)}
									/>
									<FormControl.Feedback />
									<HelpBlock>
										{this.state.validation.username.message}
									</HelpBlock>
								</FormGroup>

								<FormGroup 
									controlId="formControlsPassword" 
									validationState={this.state.validation.password.state}
									bsSize="small"
								>
									<ControlLabel>Password</ControlLabel>
									<FormControl 
										name="password"
										type="password" 										
										disabled={this.state.isSubmitted}
										placeholder="Enter password" 
										value={this.state.password}
										onChange={this._handleInputChange.bind(this)}
										onBlur={this._handleInputChange.bind(this)}
									/>
									<FormControl.Feedback />
									<HelpBlock>
										{this.state.validation.password.message}
									</HelpBlock>
								</FormGroup>
								{this.renderButton()}
							</form>
						</Panel>
						<div className="text-center text-sm">
							<small>Muramoto Audio-Visual Philippines Inc. &copy; 2017. All rights reserved.</small>
						</div>
					</Col>
				</Row>
			</div>
		)
	}
}

export default Login