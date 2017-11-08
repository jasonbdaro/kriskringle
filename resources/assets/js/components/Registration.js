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

class Registration extends React.Component {

	constructor() {
		super()

		this.state = {
			name: '',
			username: '',
			password: '',
			password_confirmation: '',
			validation: {
				name: {
					state: null,
					message: '',
					changed: false
				},
				username: {
					state: null,
					message: '',
					changed: false
				},
				password: {
					state: null,
					message: '',
					changed: false
				},
				password_confirmation: {
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

	componentDidMount() {
	}

	_handleTextValidation({target, val, min, max}) {
		const length = val.length
		let state = null, message, changed = true
		
		if (length === 0) {
			state = 'error'
			message = `The ${target} field is required.`
		} else if (length < min) {
			state = 'error'
			message = `The ${target} must be at least ${min} characters.`
		} else if (length > max) {
			state = 'error'
			message = `The ${target} may not be greater than ${max} characters.`
		} else {
			if (target === 'username') {
				if (val.indexOf(' ') !== -1) {
					state = 'error'
					message = `The ${target} must not have spaces.`
				} else {
					state = 'success'
				}
			} else {
				state = 'success'
			}
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

	_handlePasswords({target, val, min, max}) {
		const length = val.length
		let state = null, message, changed = true, 
			pcSet = false, pcState, pcMessage, passwordConfirm = 'password_confirmation',
			validation = null

		if (length === 0) {
			state = 'error'
			message = `The ${target} field is required.`
		} else if (length < min) {
			state = 'error'
			message = `The ${target} must be at least ${min} characters.`
		} else if (length > max) {
			state = 'error'
			message = `The ${target} may not be greater than ${max} characters.`
		} else {
			state = 'success'
			const passwordConfirmChanged = this.state.validation.password_confirmation.changed

			if (passwordConfirmChanged) {
				pcSet = true
				if (this.state.password_confirmation !== val) {
					pcState = 'error'
					pcMessage = 'The password confirmation and password must match.'
				} else {
					state = 'success'
					pcState = 'success'
					pcMessage = ''
				}
			}
		}

		if (pcSet) {
			validation = Object.assign({},
				this.state.validation, {
					[target]: {state, message, changed},
					[passwordConfirm]: {state: pcState, message: pcMessage, changed: true}
				}
			)
		} else {
			validation = Object.assign({},
				this.state.validation, {
					[target]: {state, message, changed}
				}
			)
		}


		this.setState({[target]: val, validation}, () => {
			this.renderButton()
		})
	}

	_handleNameChange(e) {
		const target = e.target
		this._handleTextValidation({
			target: target.name,
			val: target.value,
			min: 4,
			max: 50
		})
	}

	_handleUserNameChange(e) {
		const target = e.target
		this._handleTextValidation({
			target: target.name,
			val: target.value,
			min: 4,
			max: 25
		})
	}

	_handlePasswordChange(e) {
		const target = e.target
		this._handlePasswords({
			target: target.name,
			val: target.value,
			min: 4,
			max: 25
		})
	}

	_handlePasswordConfirmChange(e) {
		const target = e.target
		const name = target.name
		const val = target.value
		let state = null, message, changed = true
		
		if (this.state.validation.password.changed) {
			if (this.state.password !== '') {				
				if (this.state.password !== val) {
					state = 'error'
					message = 'The password confirmation and password must match.'
				} else {
					state = 'success'
					message = ''
				}
			}
		}	

		const validation = Object.assign({},
			this.state.validation, {
				[name]: {state, message, changed}
			}
		)

		this.setState({[name]: val, validation}, () => {
			this.renderButton()
		})
	}

	registrationSuccess(cb) {
		const alert = Object.assign({}, {
   		visible: true, 
   		style: 'success',
   		content: 'Registration successful.'
   	})
		this.setState({alert})
		setTimeout(cb, 500)
	}

	_handleSubmit(e) {
		e.preventDefault()

		this.setState({isSubmitted: true})

		const {name, username, password, password_confirmation} = this.state
		axios.post('create-user', {
			name,
			username,
			password,
			password_confirmation
		})
		.then(response => {
			this.registrationSuccess(() => {
				const token = generateToken(response.data)
				localStorage.removeItem('jwt-auth')
				localStorage.setItem('jwt-auth', token)
				this.setState({alert, isSubmitted: false})
			})
		})
		.catch(error => {
			if (error.response) {
			  const data = error.response.data

		      if (error.response.status === 499) {
		      	console.log(data)
		      	const alert = Object.assign({}, {
			   		visible: true, 
			   		style: 'danger',
			   		content: data.error.messages
			   	})
				this.setState({alert, isSubmitted: false})
		      } else {		      	
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
		      }
		   }
	   })
	}

	renderButton() {
		const entries = Object.entries(this.state.validation)
		const state = !entries.some((e) => e[1].state !== 'success')
		const changed = entries.every((e) => e[1].changed)
		const buttonEnable = state && changed

		if (buttonEnable) {
			return (
				<Button 					
					type="submit" 
					bsStyle="success" 
					bsSize="small" 
					block active
					disabled={this.state.isSubmitted}
				>{this.state.isSubmitted ? 'Creating...' : 'Create an account'}
				</Button>
			)
		} else {
			return (
				<Button 					
					type="submit" 
					bsStyle="success" 
					bsSize="small" 
					block disabled
				>Create an account
				</Button>
			)
		}
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

	render() {
		if (verifyToken(localStorage.getItem('jwt-auth'))) {
			return <Redirect to="/home" />
		}

		return (
			<div className="container">
				<Row>
					<Col md={4} mdOffset={4}>
						<h3 style={{ textAlign: 'center' }}>
						Join Kris Kringle
						</h3>
						<br/>
						<Panel>
							{this.renderAlert()}
							<form action="" onSubmit={this._handleSubmit.bind(this)}>
								<FormGroup 
									controlId="formControlsName" 
									validationState={this.state.validation.name.state}
									bsSize="small"
								>
									<ControlLabel>Name</ControlLabel>
									<FormControl 
										name="name"
										type="text" 
										placeholder="Enter name" 
										disabled={this.state.isSubmitted}
										value={this.state.name}
										onChange={this._handleNameChange.bind(this)}
										onBlur={this._handleNameChange.bind(this)}
									/>
									<FormControl.Feedback />
									<HelpBlock>
										{this.state.validation.name.message}
									</HelpBlock>
								</FormGroup>

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
										onChange={this._handleUserNameChange.bind(this)}
										onBlur={this._handleUserNameChange.bind(this)}
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
										placeholder="Enter password" 
										value={this.state.password}
										disabled={this.state.isSubmitted}
										onChange={this._handlePasswordChange.bind(this)}
										onBlur={this._handlePasswordChange.bind(this)}
									/>
									<FormControl.Feedback />
									<HelpBlock>
										{this.state.validation.password.message}
									</HelpBlock>
								</FormGroup>

								<FormGroup 
									controlId="formControlsConfirmPassword" 
									validationState={this.state.validation.password_confirmation.state}
									bsSize="small"
								>
									<ControlLabel>Confirm Password</ControlLabel>
									<FormControl 
										name="password_confirmation"
										type="password" 
										placeholder="Enter password confirmation" 
										value={this.state.password_confirmation}
										disabled={this.state.isSubmitted}
										onChange={this._handlePasswordConfirmChange.bind(this)}
										onBlur={this._handlePasswordConfirmChange.bind(this)}
									/>
									<FormControl.Feedback />
									<HelpBlock>
										{this.state.validation.password_confirmation.message}
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

export default Registration