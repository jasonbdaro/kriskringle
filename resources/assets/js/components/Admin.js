import React from 'react'
import {
	ButtonToolbar,
	Button,
	Row,
	Col,
	Form,
	FormGroup,
	ControlLabel,
	FormControl,
	Panel,
	Alert,
	HelpBlock,
	Checkbox,
	Table,
	ButtonGroup,
	Label,
	Pagination,
	ListGroup,
	ListGroupItem
} from 'react-bootstrap'
import Grid from './Grid'
import axios from 'axios'
import {rounds_grid_options} from './../config/rounds_grid_options'

const insert = (arr, index, newItem) => [
	...arr.slice(0, index),
	newItem,
	...arr.slice(index)
]

function isObjectEmpty(obj) {
	for (var key in obj) {
		if (obj.hasOwnProperty(key)) {
			return false
		}
	}
	return true
}

const initialValidation = {
	validation: {
		name: {
			state: null,
			message: '',
			changed: false
		},
		current: {
			state: null,
			message: '',
			changed: false
		},
		lock: {
			state: null,
			message: '',
			changed: false
		}
	}
}

const initialState = {
	form: {
		id: 0,
		name: '',
		current: 0,
		lock: 0,
		submitted: false,
	},
	dirtyFields: {},
	...initialValidation,
	alert: {
		visible: false,
		style: 'info',
		content: 'Lorem ipsum dolor sit amet.'
	},
	buttons: {
		new: true,
		save: true,
		cancel: false,
		delete: false
	},
	selected: '',
	rowEdited: 0,
	isEditing: false,
	roundDirtyFields: {},
	roundAlert: {
		visible: false,
		style: 'info',
		content: 'Lorem ipsum dolor sit amet.'
	},
}

class Admin extends React.Component {

	constructor() {
		super()
		this.state = {
			seasonData: [],
			roundData: [],
			...initialState
		}
	}

	componentDidMount() {
		this.loadSeason()
	}

	loadSeason() {
		axios.get('seasons')
		.then(r => this.setState({seasonData: r.data}))
	}

	_handleSeasonRowSelect(id) {
		const {name, current, lock} = this.state.seasonData.find(d => d.id === id)
		const form = {...this.state.form, id, name, current, lock}
		const buttons = {...this.state.buttons, cancel:  true, delete: true}
		const roundAlert = {...this.state.roundAlert, visible: false}
		const alert = {...this.state.alert, visible: false}
		this.setState({form, buttons, roundAlert, alert})

		axios.get('seasons-rounds', {params: {id}})
		.then(r => this.setState({roundData: r.data}))
	}

	_handleInputChange(e) {
		const id = this.state.form.id
		const target = e.target
		const name = target.name
		const val = target.type === 'checkbox' ? target.checked ? 1 : 0 : target.value
		const newObj = {id, [name]: val}
		const dirtyFields = Object.assign(this.state.dirtyFields, newObj)
		this.setState({dirtyFields})
	}

	alertSuccessMessage(cb, content, speed) {
		const alert = {...this.state.alert,
			visible: true,
			style: 'success',
			content
		}
		this.setState({alert})
		setTimeout(cb, speed)
	}

	_handleFormCreate() {
		this.name.value = ''
		this.current.checked = false
		this.lock.checked = false
		this.setState({...initialState, dirtyFields: {}})
	}

	_handleFormSubmit(e) {
		e.preventDefault()

		if (!isObjectEmpty(this.state.dirtyFields)) {
			this.setState({form: {...this.state.form, submitted: true}})

			const id = this.state.form.id
			let fields, url
			if (id === 0) {
				url = 'create-season'
				fields = {
					id,
					name: this.name.value,
					current: this.current.checked ? 1 : 0,
					lock: this.lock.checked ? 1 : 0
				}
			} else {
				url = 'update-season'
				fields = this.state.dirtyFields
			}

			axios.post(url, fields)
			.then(r => {
				const {id, name, current, lock} = r.data.target

				if (url === 'create-season')
					this.setState({roundData: []})

				this.setState({
					alert: {...this.state.alert, 
						visible: true,
						style: 'success',
						content: 'Data has been successfully saved.'
					},
					seasonData: r.data.data.original,
					form: {...this.state.form, id, name, current, lock, submitted: false},
					dirtyFields: {},
					buttons: {...this.state.buttons, cancel:  true, delete: true},
					validation: initialValidation.validation
				})
			})
			.catch(error => {
				if (error.response) {
					const data = error.response.data
					let errors
					for (let i in data) {
						const entry = Object.entries(data[i])
						const message = entry[0][1][0]
						errors = Object.assign({}, 
							errors, 
							{[entry[0][0]]: {state: 'error', message, changed: true}}
						)
					}
					const validation = Object.assign({}, this.state.validation, errors)
					this.setState({
						validation,
						form: {...this.state.form, submitted: false}
					})
				}
			})
		}
	}

	_handleFormCancelChanges() {
		const {seasonData, form} = this.state
		const {name, current, lock} = seasonData.find(d => d.id === form.id)
		this.name.value = name
		this.current.checked = current
		this.lock.checked = lock
		const alert = {...this.state.alert, visible: false}
		this.setState({dirtyFields: {}, alert})
	}

	_handleFormDestroy() {
		if (confirm('Are you sure you want to delete this record?')) {
			const id = this.state.form.id
			axios.post('destroy-season', {id})
			.then(response => {
				const seasonData = this.state.seasonData.filter(d => d.id !== id)
				this.alertSuccessMessage(() => {
					this.name.value = ''
					this.current.checked = false
					this.lock.checked = false
					this.setState({
						seasonData,
						...initialState, dirtyFields: {}
					})
				}, 'Data has been successfully deleted.', 500)

			})
			.catch(error => {
				const alert = Object.assign({}, {
					visible: true,
					style: 'danger',
					content: 'Unable to delete data.'
				})

				this.setState({alert})
			})
		}
	}

	dismissMessage() {
		this.setState({alert: {...this.state.alert, visible: false}})
	}

	renderMessage() {
		let {visible, style, content} = this.state.alert
		if (visible) {
			return (
				<Alert 
					style={{
						marginBottom: '10px',
						paddingTop: '10px',
						paddingBottom: '10px',
						fontSize: '12px'
					}} 
					bsStyle={style}
					onDismiss={this.dismissMessage.bind(this)}
				>{content}
				</Alert>
			)
		}
	}

	renderForm() {
		const {submitted, name, current, lock} = this.state.form
		return (
			<div>
				<h4>{name ? name : 'Lorem'}</h4>
				{this.renderMessage()}
				<form onSubmit={this._handleFormSubmit.bind(this)}>
					<FormGroup 
						controlId="FormControlsName"
						validationState={this.state.validation.name.state}
						bsSize="small"
						style={{marginBottom: '5px'}}
					>
						<FormControl 
							name="name"
							type="text"
							placeholder="Enter name"
							disabled={submitted}
							defaultValue={name}
							key={name}
							inputRef={ref => this.name = ref}
							onChange={this._handleInputChange.bind(this)}
						></FormControl>
						<FormControl.Feedback />
						<HelpBlock>{this.state.validation.name.message}</HelpBlock>
					</FormGroup>
					
					<FormGroup 
						controlId="FormControlsCurrent"
						validationState={this.state.validation.current.state}
						bsSize="small"
						style={{marginBottom: '5px'}}
					>
						<Checkbox 
							name="current"
							inline
							disabled={submitted || current ? true : false}
							defaultChecked={current}
							key={current}
							inputRef={ref => this.current = ref}
							onChange={this._handleInputChange.bind(this)}
						>Current
						</Checkbox>
						<HelpBlock>{this.state.validation.current.message}</HelpBlock>
					</FormGroup>

					<FormGroup 
						controlId="FormControlsLock"
						validationState={this.state.validation.lock.state}
						bsSize="small"
						style={{marginBottom: '5px'}}
					>
						<Checkbox 
							name="lock"
							inline
							disabled={submitted}
							defaultChecked={lock}
							key={lock}
							inputRef={ref => this.lock = ref}
							onChange={this._handleInputChange.bind(this)}
						>Lock
						</Checkbox>
						<HelpBlock>{this.state.validation.lock.message}</HelpBlock>
					</FormGroup>

					<ButtonToolbar>
					{
						this.state.buttons.new && <Button 
							bsSize="small" 
							bsStyle="primary" 
							style={{width: '70px'}}
							disabled={submitted}
							onClick={this._handleFormCreate.bind(this)}
						>New
						</Button>
					}
					{
						this.state.buttons.save && <Button 
							type="submit"
							bsSize="small" 
							bsStyle="primary" 
							style={{width: '70px'}}
							disabled={submitted}
						>Save
						</Button>
					}
					{
						this.state.buttons.cancel && <Button 
							bsSize="small" 
							bsStyle="primary" 
							style={{width: '70px'}}
							disabled={submitted}
							onClick={this._handleFormCancelChanges.bind(this)}
						>Cancel
						</Button>
					}
					{
						this.state.buttons.delete && !current && <Button 
							bsSize="small" 
							bsStyle="primary" 
							style={{width: '70px'}}
							disabled={submitted}
							onClick={this._handleFormDestroy.bind(this)}
						>Delete
						</Button>
					}
					</ButtonToolbar>
				</form>
			</div>
		)
	}

	renderSeasonItems() {
		const {seasonData} = this.state
		return seasonData.length > 0 ? seasonData.map((d, i) => (
			<tr 
				key={d.id} 
				onClick={this._handleSeasonRowSelect.bind(this, d.id)}
				className={this.state.form.id === d.id ? 'grid-row-selected' : ''}
			>
				<td>{d.name}</td>
				<td>{d.created_at}</td>
				<td>
					{
						d.current ? (
							<span>
								<Label bsStyle="success">Current</Label>
								&nbsp;
							</span>
						) : (null)
					}
					{
						d.lock ? (
							<Label bsStyle="danger">Locked</Label>
						) : (null)
					}
				</td>
			</tr>
		)): (
			<tr>
				<td 
					colSpan={3}
					style={{ textAlign: 'center' }}
				>No data available.
				</td>
			</tr>
		)
	}

	_handleRoundInputChange(e) {
		const target = e.target
		const name = target.name
		const val = target.type === 'checkbox' ? target.checked ? 1 : 0 : target.value

		let newObj
		if (this.state.roundData.length === 1) {
			newObj = {
				id: this.state.rowEdited, 
				season_id: this.state.form.id,
				[name]: val,
				current: 1
			}
		} else {
			newObj = {
				id: this.state.rowEdited, 
				season_id: this.state.form.id,
				[name]: val
			}
		}

		const roundDirtyFields = Object.assign(this.state.roundDirtyFields, newObj)
		this.setState({roundDirtyFields})
	}

	_handleRoundEditCommand(rowEdited) {
		this.setState({rowEdited, isEditing: true})
	}

	_handleRoundDeleteCommand(id) {
		if (confirm('Are you sure you want to delete this record?')) {
			const clonedData = [...this.state.roundData]
			axios.post('destroy-round', {id})
			.then(response => {
				const newData = clonedData.filter(d => d.id !== id)
				const roundAlert = Object.assign({}, {
					visible: true,
					style: 'success',
					content: 'Data has been succesfully deleted.'
				})
				this.setState({roundData: newData, roundAlert})
			}).catch(error => {
				const roundAlert = Object.assign({}, {
					visible: true,
					style: 'danger',
					content: 'Unable to delete data.'
				})

				this.setState({roundAlert})
			})
		}
	}

	renderRoundItems() {
		const {roundData} = this.state
		return roundData.length > 0 ? roundData.map((d, i) => (
			<tr key={d.id}>
				<td>
				{
					this.state.rowEdited === d.id ? (
						<input 
							name="name"
							ref={ref => this.round_name = ref}
							defaultValue={d.name}
							type="text"
							style={{width: '100%'}}
							onChange={this._handleRoundInputChange.bind(this)}
						/>
					) : (d.name)
				}
				</td>
				<td>
				{
					this.state.rowEdited === d.id ? (
						<input 
							name="description"
							ref={ref => this.round_description = ref}
							defaultValue={d.description}
							type="text"
							style={{width: '100%'}}
							onChange={this._handleRoundInputChange.bind(this)}
						/>
					) : (d.description)
				}
				</td>
				<td>{d.created_at}</td>
				<td>
				{
					this.state.rowEdited === d.id && !d.current ? (
						<input 
							name="current"
							ref={ref => this.round_current = ref}
							defaultChecked={d.current || (this.state.roundData.length === 1 ? 1 : 0)}
							type="checkbox"
							onChange={this._handleRoundInputChange.bind(this)}
							disabled={this.state.roundData.length === 1}
						/>
					) : (
						d.current ? (
							<Label bsStyle="success">Current</Label>
						) : (null)						
					)
				}
				</td>
				<td>
				{
					this.state.isEditing && this.state.rowEdited === d.id ? (
						<span>
							<Button
								bsSize="xsmall"
								bsStyle="primary"
								onClick={this._handleToolbarSaveChanges.bind(this)}
							>Update
							</Button>&nbsp;
							<Button 
								bsSize="xsmall"
								bsStyle="primary"
								onClick={this._handleToolbarCancelChanges.bind(this)}
							>Cancel
							</Button>
						</span>
					) : (
						<span>
							<Button 
								bsSize="xsmall" 
								bsStyle="primary"
								onClick={this._handleRoundEditCommand.bind(this, d.id)}
							>Edit
							</Button>
							&nbsp;
							{
								!d.current || roundData.length === 1 ? (
									<Button 
										bsSize="xsmall" 
										bsStyle="primary"
										onClick={this._handleRoundDeleteCommand.bind(this, d.id)}
									>Delete
									</Button>
								) : (null)
							}
						</span>
					)
				}
				</td>
			</tr>
		)) : (
			<tr>
				<td 
					colSpan={4}
					style={{ textAlign: 'center' }}
				>No data available.
				</td>
			</tr>
		)
	}

	_handleToolbarCreate() {
      const newData = {
      	id: 0,
      	season_id: this.state.form.id,
      	name: '',
      	current: 0,
      	created_at: ''
      }

      const roundDirtyFields = {...newData}

		if (this.state.roundData.length === 0) {
			this.setState({
				roundData: [newData],
				roundDirtyFields
			})
		} else {
			const data = insert(this.state.roundData, 0, newData)
			const hasFound = this.state.roundData.find(d => d.id === 0)

			if (!hasFound) {
				this.setState({
					roundData: data, 
					isEditing: true,
					roundDirtyFields
				})
			}
		}
	}

	_handleToolbarSaveChanges() {
		if (!isObjectEmpty(this.state.roundDirtyFields)) {
			const rowEdited = this.state.rowEdited
			axios.post(
				rowEdited === 0 ? 
				'create-round' : 'update-round',
				this.state.roundDirtyFields
			).then(response => {
				const res = response.data, 
						roundData = res.data.original,
						newData = res.target

				const roundAlert = {
					visible: true, 
					style: 'success',
					content: 'Data has been succesfully saved.'
				};

				this.setState({
					roundData,
					roundAlert,
					rowEdited: 0,
					roundDirtyFields: {},
					isEditing: false,
					selected: newData.id
				})
			}).catch(error => {
				const data = error.response.data
				let messages
				for (let i in data) {
					const key = Object.entries(data[i])
					messages = key[i][1]
				}

				const content = (
					<div>
					{
						messages.map(message => 
							<span>
								<span>{message}</span><br/>
							</span>
						)
					}
					</div>
				)

				const roundAlert = Object.assign({}, {
					visible: true,
					style: 'danger',
					content
				})

				this.setState({roundAlert})
			})
		}
	}

	_handleToolbarCancelChanges() {
		const roundData = this.state.roundData.filter(d => d.id !== 0)
		const roundAlert = Object.assign({}, {visible: false})
		this.setState({
			roundData, rowEdited: 0, 
			roundDirtyFields: {}, 
			isEditing: false,
			roundAlert
		})
	}

	renderRoundToolbar() {
		return <caption>
			<ButtonToolbar>
			{
				['create', 'save', 'cancel'].map((t, i) => (
					<Button 
						style={{width: '105px'}}
						key={i}
						href="#"
						bsStyle="primary"
						bsSize="xsmall"
						onClick=
						{
							t === 'create' ? this._handleToolbarCreate.bind(this) :
							t === 'save' ? this._handleToolbarSaveChanges.bind(this) :
							t === 'cancel' ? this._handleToolbarCancelChanges.bind(this) : null
						}
					>
					{
						t === 'create' ? 'Add New Record' :
						t === 'save' ? 'Save Changes' :
						t === 'cancel' ? 'Cancel Changes' : ''
					}
					</Button>
				))
			}
			</ButtonToolbar>
		</caption>
	}

	dismissRoundMessage() {
		this.setState({roundAlert: {...this.state.roundAlert, visible: false}})
	}

	renderRoundMessages() {
		const {visible, style, content} = this.state.roundAlert
		if (visible) {
			return (
				<Alert 
					style={{
						marginBottom: 0,
						paddingTop: '10px',
						paddingBottom: '10px',
						fontSize: '12px'
					}} 
					bsStyle={style}
					onDismiss={this.dismissRoundMessage.bind(this)}
				>{content}
				</Alert>
			)
		}
	}

	render() {
		return (
			<div className="container">
				<Row>
					<Col md={4}>
						<h4>Lorem</h4>
						<Table bordered condensed hover responsive className="tbl-admin">
							<thead style={{background: '#337ab7', color: '#fff'}}>
								<tr>
									<td>Name</td>
									<td>Encoded Date</td>
									<td>Status</td>
								</tr>
							</thead>
							<tbody>
							{this.renderSeasonItems()}
							</tbody>
						</Table>
					</Col>
					<Col md={8}>
						<Row>
							<Col md={5}>
								{this.renderForm()}
							</Col>
							{
								this.state.form.name && 
								<Col md={12} style={{marginTop: '20px'}}>
									<h4>Lorem</h4>
									{this.renderRoundMessages()}
									<Table bordered condensed hover responsive className="tbl-admin">
										{this.renderRoundToolbar()}
										<thead style={{background: '#337ab7', color: '#fff'}}>
											<tr>
												<td>Name</td>
												<td>Description</td>
												<td>Encoded Date</td>
												<td>Status</td>
												<td></td>
											</tr>
										</thead>
										<tbody>
										{this.renderRoundItems()}
										</tbody>
									</Table>
								</Col>
							}
						</Row>
					</Col>
				</Row>
			</div>
		)
	}
}

export default Admin