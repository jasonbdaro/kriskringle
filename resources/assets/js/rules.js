import React from 'react'
// import validator from 'validator'
import Validation from 'react-validation'

import {
	Navbar,
	Nav,
	NavItem,
	NavDropdown,
	MenuItem,
	Jumbotron,
	Button,
	Grid,
	Row,
	Col,
	FormGroup,
	ControlLabel,
	FormControl,
	Panel,
	Image,
	ListGroup,
	ListGroupItem,
	Label,
	Alert,
	Well,
	ButtonToolbar,
	HelpBlock,
	PageHeader
} from 'react-bootstrap'

Object.assign(Validation.rules, {
	required: {
		rule: value => {
			return value.toString().trim()
		},
		hint: () => {
			return (
				<div>
					<FormControl.Feedback />
					<HelpBlock>Required.</HelpBlock>
				</div>
			)
		}
	},
/*	alpha: {
		rule: value => validator.isAlpha(value),
		hint: () => {
			return (
				<div>
					<FormControl.Feedback />
					<HelpBlock>String should contain only letters</HelpBlock>
				</div>
			)
		}
	},*/
	password: {
		rule: (value, components) => {
			const password = components.password.state;
			const passwordConfirm = components.passwordConfirm.state;
			const isBothUsed = password 
				&& passwordConfirm
				&& password.isBothUsed
				&& passwordConfirm.isUsed;
			const isBothChanged = isBothUsed && password.isChanged && passwordConfirm.isChanged;

			if (!isBothUsed || !isBothChanged) {
				return true;
			}

			return password.value === passwordConfirm.value;
		}
	},
	hint: () => {
		return (
			<div>
				<FormControl.Feedback />
				<HelpBlock>Passwords should be equal</HelpBlock>
			</div>
		)
	}
})