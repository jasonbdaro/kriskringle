import React from 'react'
import {
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
	Label,
	Clearfix,
	Well,
	Nav,
	NavItem,
	ListGroup,
	ListGroupItem
} from 'react-bootstrap'
import axios from 'axios'
import jwt from 'jsonwebtoken'
import {
	verifyToken, 
	generateToken
} from './../helper/auth'

import {
  EditorState, 
  convertToRaw,
  convertFromRaw
} from 'draft-js'
import Editor from 'draft-js-plugins-editor'
import createLinkifyPlugin from 'draft-js-linkify-plugin'
import Draft from './Draft'
import List from './List'

const linkifyPlugin = createLinkifyPlugin()

String.prototype.capitalized = function() {
	return this.charAt(0).toUpperCase() + this.slice(1)
}

const session = () => verifyToken(localStorage.getItem('jwt-auth'))

class Home extends React.Component {
	constructor() {
		super()

		this.state = {
			current_season_id: 0,
			current_round_id: 0,
			current_round_desc: '',
			seasons: [],
			rounds: [],
			users: [],
			secret: '',
			_pick_prompt: false,
			_pick_loader: false,
			_pick_status: 'processing | success | error',
			_key: '',
			_dirty_post_text: false,
			_post_updated: false,
			editorState: EditorState.createEmpty(),
			_post_text: ''
		}
	}

	componentDidMount() {
		axios.get('home-load', {params: {id: session().agent.id}})
		.then(response => {
			const data = response.data
			const {
				current_season_id, 
				current_round_id
			} = data

			const current_user = session().agent
			const _post_text = data.view_users.find(
				d => d.user_id === (current_user.is_admin ? 0 : current_user.id)
			)

			const current_round = data.rounds.find(
				d => d.season_id === current_season_id && d.id === current_round_id
			)

			this.setState({
				current_season_id,
				current_round_id,
				rounds: data.rounds,
				users: data.view_users,
				seasons: data.seasons,
				_key: data._key,
				_post_text: _post_text ? _post_text.description : '',
				current_round_desc: current_round ? current_round.description : ''
			})
		})
	}

	_handleNavClick(nav_click, key) {
		const {rounds, current_season_id} = this.state
		let params
		if (nav_click == 'seasons') {
			const round = rounds.find(d => d.season_id === key && d.current)
			const current_round_id = round ? round.id : 0
			const current_round_desc = round ? round.description : ''
			params = {
				season: key,
				round: current_round_id,
				current_round_desc 
			}
		} else {
			const round = rounds.find(
				d => d.season_id === current_season_id && d.id === key
			)
			const current_round_desc = round ? round.description : ''

			params = {
				season: current_season_id,
				round: key,
				current_round_desc
			}
		}

		this.setState({
			current_season_id: params.season,
			current_round_id: params.round,
			_post_updated: false,
			_pick_prompt: false,
			current_round_desc: params.current_round_desc
		})

		axios.get('home-get', {params})
		.then(response => {
			this.setState({users: response.data})
		})
		.catch(error => {
			if (error.response) {
				this.setState({
					current_season_id: params.season,
					current_round_id: params.round
				})
				alert('An error has occured. Please try again.')
			}
		})
	}

	renderSeasons() {
		const {seasons, current_season_id} = this.state
		return seasons.length > 0 &&
			<Nav 
				bsStyle="tabs" 
				activeKey={current_season_id}
				onSelect={this._handleNavClick.bind(this, 'seasons')}
			>
			{
				seasons.map((item, index) => 
					<NavItem key={item.id} eventKey={item.id} href="#">
						{item.name}&nbsp;
						{item.current && <Label bsStyle="success">Current</Label>}
					</NavItem>
				)
			}
			</Nav>
	}

	renderRounds() {
		const {
			seasons,
			rounds, 
			current_round_id, 
			current_season_id, 
			current_round_desc
		} = this.state
		const season = seasons.find(d => d.id === current_season_id)
		const season_rounds = rounds.filter(d => d.season_id === current_season_id)

		return season_rounds.length > 0 &&
			<div>
				<Nav 
					bsStyle="tabs" 
					activeKey={current_round_id}
					onSelect={this._handleNavClick.bind(this, 'rounds')}
				>
				{
					season_rounds.map((item, index) => 
						<NavItem key={item.id} eventKey={item.id} href="#">
							{item.name}&nbsp;
							{(season.current && item.current) && <Label bsStyle="success">Current</Label>}
						</NavItem>
					)
				}
				</Nav>
				{
					current_round_desc && 
					<Well style={{marginTop: '10px', marginBottom: '-10px'}}>{current_round_desc}</Well>
				}
			</div>
	}

	renderUsers() {
		const {users} = this.state
		return users.length > 0 ? (
			<div>			
				<p style={{fontWeight: 'bold'}}>Users Participated</p>
				<ListGroup>
				{
					users.map((item, index) =>
						<ListGroupItem key={item.user_id}>
						{
							item.user_id == session().agent.id ?
							<b>{item.user_name}</b> :
							(item.user_name)
						}
						{
							item.has_pick &&
							(item.current_round && item.current_season) ? (
								<Label bsStyle="success" style={{float: 'right'}}>Picked</Label>
							) : (
								<Label bsStyle="success" style={{float: 'right'}}>{item.user_picked}</Label>
							)
						}
						</ListGroupItem>
					)
				}
				</ListGroup>
			</div>
		) : (
			<Well className="text-center">No data available</Well>
		) 
	}


	renderLists() {
		const {users} = this.state
		const lists = users.filter(d => d.description)

		lists.sort((a, b) => new Date(b.updated) - new Date(a.updated))

		return lists.length > 0 ? (
			<div>
			{
				lists.map((item, index) => 
					<Col md={12} key={item.user_id}>
						<Panel bsSize="small" 
							header={(
								<p style={{fontSize: '14px'}}>
									<b>{item.user_name}</b>
									{
										item.has_pick &&
										(item.current_round && item.current_season) ? null : (
											<span>
												&nbsp;&nbsp;
												<Label bsStyle="danger">Secret Santa: {item.user_picked_by}</Label>
											</span>
										)
									}
									<span style={{float: 'right'}}>{item.updated_ago}</span>
								</p>
						)}>
							<List content={item.description} />
						</Panel>
					</Col>
				)
			}
			</div>
		) : (
			<Col md={12}>
				<Well className="text-center">Others have not posted yet.</Well>
			</Col>
		)
	}

	_handlePickSuccessCallback(cb) {
		this.setState({_pick_status: 'success'})
		setTimeout(cb, 500)
	}

	_handlePickYesClick() {
		this.setState({_pick_prompt: false, _pick_loader: true, _pick_status: 'processing'})
		axios.post('pick', {id: session().agent.id})
		.then(response => {
			this._handlePickSuccessCallback(
				() => this.setState({users: response.data._data, _key: response.data._key})
			)
		})
		.catch(error => {
			if (error.response) {
				this.setState({_pick_status: 'error'})
			}
		})
	}

	renderPickLoader() {
		const {_pick_loader, _pick_status} = this.state
		return _pick_status === 'processing' ? (
			<div>
				{'Processing...'}
				<span 
					className="pull-right glyphicon glyphicon-refresh glyphicon-refresh-animate"
					style={{marginRight: '14px'}}
				></span>
			</div>
		) : (
			_pick_status === 'success' ? (
				<div style={{color: 'green'}}>
					<span 
						className="glyphicon glyphicon-ok"
						style={{marginRight: '3px'}}
					></span>
					{'Success'}
				</div>
			) : (
				_pick_status === 'error' && 
				<div style={{color: 'red'}}>
					<span 
						className="glyphicon glyphicon-remove"
						style={{marginRight: '3px'}}
					></span>
					{'Error'}
					<Button 
						style={{width: '61px'}} 
						className="pull-right" 
						bsStyle="primary" 
						bsSize="xsmall"
						onClick={() => this.setState({_pick_loader: false})}
					>Ok
					</Button>
				</div>
			)
		)
	}

	renderPickButton() {
		const {_pick_prompt, _pick_loader} = this.state
		return _pick_prompt ? (
			<div>
				{'Do you want to continue?'}
				<Button 
					style={{width: '61px'}} 
					className="pull-right" 
					bsStyle="danger" 
					bsSize="xsmall"
					onClick={() => this.setState({_pick_prompt: false})}
				>No
				</Button>
				<Button 
					style={{width: '61px', marginRight: '4px'}} 
					className="pull-right" 
					bsStyle="primary" 
					bsSize="xsmall"
					onClick={this._handlePickYesClick.bind(this)}
				>Yes
				</Button>
			</div>
		) : (
			<div>
			{
				_pick_loader ? (this.renderPickLoader()) : (
					<div>
						{'Who will you buy a gift?'}
						<Button 
							style={{width: '61px'}} 
							className="pull-right" 
							bsStyle="primary" 
							bsSize="xsmall"
							onClick={() => this.setState({_pick_prompt: true})}
						>Pick
						</Button>
					</div>
				)
			}
			</div>
		)
	}

	_handleTriggerHide(cb) {
		axios.get('show', {params: {_key: this.state._key, t: new Date() / 1000}})
		.then(response => this.setState({secret: response.data}))
		setTimeout(cb, 500)
	}

	_handleShowButtonClick() {
		axios.get('show', {params: {_key: this.state._key, t: new Date() / 1000}})
		.then(response => this.setState({secret: response.data}))
	}

	renderShowButton() {
		return <div>
			{

				this.state.secret === '' ? (
					<div>
						You will buy a gift to...
						<Button 
							style={{width: '61px'}} 
							className="pull-right" 
							bsStyle="primary" 
							bsSize="xsmall"
							onClick={this._handleShowButtonClick.bind(this)}
						>Show
						</Button>
					</div>
				) : (
					<div>
						{this.state.secret}
						<Button 
							style={{width: '61px'}} 
							className="pull-right" 
							bsStyle="primary" 
							bsSize="xsmall"
							onClick={() => this.setState({secret: ''})}
						>Hide
						</Button>
					</div>
				)
			}
		</div>
	}

	renderPickPane() {
		const {users} = this.state
		const user = users.find(d => d.user_id === session().agent.id)
		const isCurrentSeasonAndRound = user ? 
			(user.current_season && user.current_round) : false
		const season = this.state.seasons.find(d => d.id === this.state.current_season_id)

		return (user && isCurrentSeasonAndRound) && 
		<div>
			<Panel>
			{
				season.lock ? (
					<div>{user.has_pick ? this.renderShowButton() : this.renderPickButton()}</div>
				) : (
					<div>Wait for others to join.</div>
				)
			}
			</Panel>
			<hr/>
		</div>
	}

	_handleFormSubmit(e) {
		e.preventDefault()

		const {_post_text, _dirty_post_text} = this.state

		if (_dirty_post_text) {
			axios.post('post', {
				id: session().agent.id,
				text: _post_text
			})
			.then(response => {
				this.setState({
					users: response.data, 
					_post_updated: false,
					_dirty_post_text: false
				})
			})
			.catch(error => {
				if (error.response) {
					this.setState({_post_updated: false})
					alert('An error has occured. Please try again.')
				}
			})
		}
	}

	_handleFormUpdateClick() {
		const {users} = this.state
		const current_user = session().agent
		const _post_text = users.find(
			d => d.user_id === (current_user.is_admin ? 0 : current_user.id)
		)

		let editorState
	   if (_post_text.description) {
	   	editorState = EditorState.createWithContent(convertFromRaw(JSON.parse(_post_text.description)))
	   } else {
	   	editorState = EditorState.createEmpty()
	   }

		this.setState({
			_post_updated: true,
			_post_text: _post_text ? _post_text.description : '',
			editorState
		})
	}

	_handleEditorChange(editorState) {
    const contentState = editorState.getCurrentContent()
    this.setState({
    	editorState, 
    	_dirty_post_text: true, 
    	_post_text: JSON.stringify(convertToRaw(contentState))
    })
	}

	renderFormPane() {
		const {users, _post_text, _post_updated, _dirty_post_text} = this.state
		const user = users.find(d => d.user_id === session().agent.id)
		const isCurrentSeasonAndRound = user ? 
			(user.current_season && user.current_round) : false
		const season = this.state.seasons.find(d => d.id === this.state.current_season_id)

		return (user && user.has_pick && isCurrentSeasonAndRound && season.lock) &&
		<div>
			{
				user.description && !_post_updated ? (
					<Panel>
						{'Your wish is already posted'}
						<Button 
							style={{width: '61px'}} 
							className="pull-right" 
							bsStyle="primary" 
							bsSize="xsmall"
							onClick={this._handleFormUpdateClick.bind(this)}
						>Update
						</Button>
					</Panel>
				) : (
					<form action="" onSubmit={this._handleFormSubmit.bind(this)}>
				      <div 
				        style={{
				          border: '1px solid #ddd', 
				          borderRadius: '4px',
				          padding: 12,
				          cursor: 'text',
				          minHeight: '80px',
				          marginBottom: '5px'
				        }}
				        onClick={() => this.refs.editor.focus()}
				      >
				        <Editor
				          editorState={this.state.editorState}
				          onChange={this._handleEditorChange.bind(this)}
				          plugins={[linkifyPlugin]}
				          ref="editor"
				        />
				      </div>
						<Button 
							type="submit"
							style={{width: '61px'}} 
							bsStyle="primary" 
							bsSize="xsmall"
							disabled={!_dirty_post_text}
						>Post
						</Button>
						{
							_post_updated && 
							<Button 
								style={{width: '61px', marginLeft: '4px'}} 
								bsStyle="danger" 
								bsSize="xsmall"
								onClick={() => this.setState({_post_updated: false})}
							>Cancel
							</Button>
						}
					</form>
				)
			}
			<hr/>
		</div>
	}

	render() {
		return (
			<div className="container">
				<Row>
					<Col md={12} style={{marginBottom: '20px'}}>
						{this.renderSeasons()}
					</Col>
					<Col md={4}>
						{this.renderFormPane()}
						{this.renderPickPane()}
						{this.renderUsers()}
					</Col>
					<Col md={8}>
						<Col md={12} style={{marginBottom: '20px'}}>
							{this.renderRounds()}
						</Col>
						{this.renderLists()}
					</Col>
				</Row>
			</div>
		)
	}
}

export default Home