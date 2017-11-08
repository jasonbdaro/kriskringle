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
	Table,
	ButtonGroup,
	Label,
	Pagination
} from 'react-bootstrap'
import axios from 'axios'

const insert = (arr, index, newItem) => [
	...arr.slice(0, index),
	newItem,
	...arr.slice(index)
]

const type = type => {
	switch (type.toLowerCase()) {
		case "string":
			return "text"
			break
		case "boolean":
			return "checkbox"
			break
		default:
			return "text"
			break
	}
}

function isObjectEmpty(obj) {
	for (var key in obj) {
		if (obj.hasOwnProperty(key)) {
			return false
		}
	}
	return true
}

class Grid2 extends React.Component {

	constructor(props) {
		super(props)

		this.state = {
			data: [],
			selected: '',
			rowEdited: 0,
			dirtyFields: {},
			isEditing: false,
			activePage: 1,
			alert: {
				visible: false,
				style: 'info',
				content: 'Lorem ipsum dolor sit amet.'
			},
		}
	}

	componentDidMount() {
		this.props._render()
		// axios.get(this.props.dataSource.read.url)
		// .then(response => this.setState({data: response.data}))
		// .catch(error => console.log(error))
	}

	_handlePaginationSelect(activePage) {
		// this.setState({activePage})
		this.props._handlePaginationSelect(activePage)
	}

	_handleRowSelect(selected) {
		// this.setState({selected})
		this.props._handleRowSelect(selected)
	}

	_handleDeleteCommand(id) {
		if (confirm('Are you sure you want to delete this record?')) {
			const {pagination, dataSource, schema} = this.props
			const {data, activePage} = this.state

			const clonedData = [...data]

			axios.post(dataSource.destroy.url, {
				[schema.model.id]: id
			})
			.then(response => {
				const newData = clonedData.filter(d => d.id !== id)
				const alert = Object.assign({}, {
					visible: true,
					style: 'success',
					content: 'Data has been succesfully deleted.'
				})
				if (this.state.data.length === 1) {
					this.setState({data: newData, alert})
				} else {
					const pagination = this.props.pagination
					const data = this.state.data
					const lastPage = activePage === this.getLastPage()
					const oneLeftInLastPage = this.view()[activePage - 1].length === 1

					if (lastPage && oneLeftInLastPage) {
						const currentPage = activePage
						this.setState({activePage: currentPage - 1}, () => {
							this.setState({data: newData, alert})
						})
					} else {
						if (data.length === 1) {
							this.setState({data: newData, alert})
						} else {

							this.setState({data: newData, alert})
						}
					}
				}				
			}).catch(error => {
				const alert = Object.assign({}, {
					visible: true,
					style: 'danger',
					content: 'Unable to delete data.'
				})

				this.setState({alert})
			})
		}
	}

	_handleEditCommand(id) {
		this.setState({rowEdited: id, isEditing: true})
	}

	_handleToolbarCreate() {
		const items = this.props.pagination
		const activePage = this.state.activePage
		const schema_id = this.props.schema.model.id

      const entries = Object.entries(this.props.schema.model.fields)
      let newData, dirtyFields
      for (let i in entries) {
      	const entry = entries[i], 
      			key = entry[0], 
      			type = entry[1].type, 
      			defaultValue = entry[1].defaultValue, 
      			editable = entry[1].editable === undefined || entry[1].editable

      	const val = (defaultValue && defaultValue !== undefined) ? defaultValue : 
      	(key === schema_id ? 0 : type === 'boolean' ? 0 : '')

      	newData = Object.assign({}, 
      		newData, 
      		{[key]: val}
   		)

      	if (editable) {
	   		const newObj = {[schema_id]: this.state.rowEdited, [key]: val}
	      	dirtyFields = Object.assign(this.state.dirtyFields, newObj)
      	}
      }

		if (this.state.data.length === 0) {
			this.setState({
				data: [newData],
				dirtyFields
			})
		} else {
			const view = [...this.view()[activePage - 1]]
			const data = insert(
				this.state.data, 
				(items * activePage) - items,
				newData
			)
			const hasFound = this.state.data.find(d => d.id === 0)

			if (!hasFound) {
				this.setState({
					data, 
					isEditing: true,
					dirtyFields
				})
			}
		}
	}

	_handleToolbarSaveChanges() {
		if (!isObjectEmpty(this.state.dirtyFields)) {
			const rowEdited = this.state.rowEdited
			const dataSource = this.props.dataSource
			axios.post(
				rowEdited === 0 ? 
				dataSource.create.url : dataSource.update.url,
				this.state.dirtyFields
			).then(response => {
				const res = response.data, 
						data = res.data.original,
						newData = res.target

				const alert = {
					visible: true, 
					style: 'success',
					content: 'Data has been succesfully saved.'
				};

				this.setState({
					data,
					alert,
					rowEdited: 0,
					dirtyFields: {},
					isEditing: false,
					selected: newData[this.props.schema.model.id]
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

				const alert = Object.assign({}, {
					visible: true,
					style: 'danger',
					content
				})

				this.setState({alert})
			})
		}
	}

	_handleToolbarCancelChanges() {
		const data = this.state.data.filter(d => d.id !== 0)
		const alert = Object.assign({}, {visible: false})
		this.setState({
			data, rowEdited: 0, 
			dirtyFields: {}, 
			isEditing: false,
			alert
		})
	}

	_handleInputChange(e) {
		const schema_id = this.props.schema.model.id
		const target = e.target
		const name = target.name
		const val = target.type === 'checkbox' ? target.checked ? 1 : 0 : target.value
		const newObj = {[schema_id]: this.state.rowEdited, [name]: val}
		const dirtyFields = Object.assign(this.state.dirtyFields, newObj)
		this.setState({dirtyFields})
	}

	_handleAlertDismiss() {
		const alert = Object.assign({}, {visible: false})
		this.setState({alert})
	}

	view() {
		const data = this.state.data
		const pagination = this.props.pagination
		const view =  data.reduce((ar, it, i) => {
			const ix = Math.floor(i / pagination.items)

			if (!ar[ix]) {
				ar[ix] = []
			}

			ar[ix].push(it)

			return ar

		}, [])

		return view
	}
	
	renderItems() {
		const {pagination, columns, schema} = this.props
		const {data, isEditing, activePage} = this.state

		if (data.length < 1) {
			return (
				<tr >
					<td 
						colSpan={columns.length}
						style={{ textAlign: 'center' }}
					>No data available.
					</td>
				</tr>
			)
		}

		const items = this.view()[activePage - 1].map(d => (
			<tr
				className={this.state.selected === d[schema.model.id] ? 'grid-row-selected' : ''}
				key={d[schema.model.id]}
				onClick={this._handleRowSelect.bind(this, d[schema.model.id])}
			>
			{
				columns.map((col, colId) => (
					<td key={colId}>
						{
							!col.command 
							&& this.state.rowEdited === d[schema.model.id] 
							&& (schema.model.fields[col.field].editable === undefined
								|| schema.model.fields[col.field].editable === true
								) ? (
								schema.model.fields[col.field].type === 'boolean' ?
								(
									<input 
										name={col.field}
										ref={input => this[col.field] = input}
										defaultChecked={d[col.field]}
										type={'checkbox'}
										onChange={this._handleInputChange.bind(this)}
									/>
								) : (
									<input 
										name={col.field}
										ref={input => this[col.field] = input}
										defaultValue={d[col.field]}
										type={type(schema.model.fields[col.field].type)}
										onChange={this._handleInputChange.bind(this)}
									/>
								)
							) : (
								col.template ? (
									<div style={col.style}>
										{col.template(d)}
									</div>
								) : (
									<div style={col.style}>
										{d[col.field]}
									</div>
								)
							)
						}

						{
							col.command ? ( 
								isEditing && this.state.rowEdited === d[schema.model.id] ? (
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
									col.command.map((cm, buttonId) => (
										<span key={buttonId}>
											<Button 												
												bsSize="xsmall"
												bsStyle="primary"
												onClick={
													cm === 'destroy' ? 
													this._handleDeleteCommand.bind(this, d[schema.model.id]) : 
													this._handleEditCommand.bind(this, d[schema.model.id])
												}
											>{cm === 'destroy' ? 'Delete' : 'Edit'}
											</Button>&nbsp;
										</span>
									))
								)
							) : ( null )
						}
					</td>
				))
			}
			</tr>
		))

		return items
	}

	renderHeaders() {
		const {columns} = this.props
		const th = columns.map((col, i) => (
			<td key={i}>{col.title}</td>
		))

		return th
	}

	renderFooter() {
		const {data, activePage} = this.state
		const columns = this.props.columns
		const items = this.props.pagination.items
		let details = ''

		if (data.length === 0) {
			details = 'No items to display'
		} else {
			if (activePage === 1) {
				details += '1'
			} else {
				details += (items * activePage) - (items - 1)
			}
			details += ' - '
			if (activePage === this.getLastPage()) {
				details += data.length
			} else {
				details += activePage * items
			}
			details += ` of ${data.length} items`
		}

		return (
			<tfoot>
				<tr>
					<td
						colSpan={columns.length}
						style={{
							textAlign: 'right',
							fontSize: '12px'
						}}
					>{details}
					</td>
				</tr>
			</tfoot>
		)
	}

	renderToolbar() {
		if (!this.props.toolbar) {
			return null
		}
		return (
			<caption>
				<ButtonGroup>
				{
					this.props.toolbar.map((t, i) => (
						<Button 
							key={i}
							href="#"
							bsStyle="default"
							bsSize="small"
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
				</ButtonGroup>
			</caption>
		)
	}	

	renderMessages() {
		const {visible, style, content} = this.state.alert
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
					onDismiss={this._handleAlertDismiss.bind(this)}
				>{content}
				</Alert>
			)
		}
	}

	render() {
		return (
			<div>
				{this.renderMessages()}
				<Table 					
					bordered 
					condensed
					responsive
					hover
				>
					{this.renderToolbar()}
					<thead style={{background: '#337ab7', color: '#fff'}}>
						<tr>{this.renderHeaders()}</tr>
					</thead>
					<tbody>
						{this.renderItems()}
					</tbody>
					{this.renderFooter()}
				</Table>
				<Pagination
					prev
		        	next
		        	first
		        	last
		        	ellipsis
		        	boundaryLinks
		        	items={this.getLastPage()}
		        	maxButtons={this.props.pagination.maxButtons}
		        	activePage={this.state.activePage}
		        	onSelect={this._handlePaginationSelect.bind(this)}
	        	/>
			</div>
		)
	}
}

export default Grid2