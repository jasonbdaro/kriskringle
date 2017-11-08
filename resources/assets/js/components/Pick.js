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

String.prototype.capitalized = function() {
	return this.charAt(0).toUpperCase() + this.slice(1)
}

class Pick extends React.Component {

	constructor() {
		super()

		this.state = {
		}
	}

	_handleSubmit(e) {
		e.preventDefault()

		console.log('Submitted')

/*		this.setState({isSubmitted: true})

		const {name, username, password, password_confirmation} = this.state
		axios.post('create-user', {
			name,
			username,
			password,
			password_confirmation
		})
		.then(response => {
			const token = this.generateToken(response.data)
			localStorage.removeItem('jwt-auth')
			localStorage.setItem('jwt-auth', token)

			const alert = Object.assign({}, {
      		visible: true, 
      		style: 'success',
      		content: 'Registration successful.'
      	})
			this.setState({alert, isSubmitted: false})
		})
		.catch(error => {
			if (error.response) {
		      const data = error.response.data
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
	   })*/
	}

	render() {
		return (
			<div className="container">
				<Row>
					<Col md={4} mdOffset={4}>
						<Panel>
							<form action="">
								<FormGroup 
									controlId="formControlsName" 
									bsSize="small"
									validationState={'error'}
								>
									<ControlLabel>Lorem ipsum dolor sit amet.</ControlLabel>
									<FormControl 
										name="name"
										type="password" 
										value={'Lorem ipsum dolor sit amet.'}
										placeholder="Enter name"
									/>
									<FormControl.Feedback />
									<HelpBlock>{'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nisi, eligendi.'}</HelpBlock>
								</FormGroup>

								<Button 
									type="submit" 
									bsStyle="success" 
									bsSize="small" 
									block disabled
								>{false ? 'Show' : 'Pick' }
								</Button>
							</form>
						</Panel>
					</Col>
				</Row>
			</div>
		)
	}
}

export default Pick