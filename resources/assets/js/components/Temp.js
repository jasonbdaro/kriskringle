import React, { Component } from 'react'
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
	ButtonToolbar
} from 'react-bootstrap'
import {
	BrowserRouter as Router,
	Route
} from 'react-router-dom'
import { IndexLinkContainer } from 'react-router-bootstrap'

import Login from './Login'


const A = () => (
	<div>
		<Grid>
			<Row className="show-grid">
				<Col md={12}>
					<Jumbotron>
						<Row>
							<Col md={8}>
								<h1>Lorem ipsum!</h1>
								<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Pariatur aut ad aliquam, maiores quibusdam cupiditate numquam, eligendi illum beatae debitis consectetur deserunt officia eaque esse magnam veritatis nihil. Soluta, provident!</p>
							</Col>
							<Col md={4}>
								<Login />
							</Col>
						</Row>
					</Jumbotron>
				</Col>
			</Row>
		</Grid>
	</div>
)

const align = {
	textAlign: 'justify'
}

const panelFooter = (
	<div style={{textAlign:'right'}}>
		<small>Test</small>
	</div>
	
)

const B = () => (
	<div>
		<Grid>
			<h3>Lorem ipsum.
			</h3>
			<Row className="show-grid">
				<Col md={8}>
					<Row className="show-grid">
						<Col md={11}>
							<Panel footer={panelFooter}>
								<p style={align}>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Praesentium quod, magnam, totam architecto molestiae ipsa libero quasi laboriosam quisquam facilis sed quae veritatis exercitationem commodi, dolorum unde consequatur obcaecati necessitatibus doloremque quia explicabo vitae dignissimos. Quos officia assumenda veniam eveniet amet repellat tempora laboriosam cum, eius quia laborum dolorem repudiandae, ad molestiae? Laudantium velit fugiat assumenda aliquid dolorem deserunt at alias voluptas natus nesciunt! Eaque optio distinctio, assumenda, error voluptatibus tempore quisquam natus. Ex aut atque eveniet, accusamus aliquid nulla distinctio mollitia delectus placeat beatae, necessitatibus ea aperiam fuga quos quia harum commodi eligendi dolore ipsam. Necessitatibus molestiae, repudiandae enim.
								</p>
							</Panel>
						</Col>
						<Col md={11}>
							<Panel footer={panelFooter}>
								<p style={align}>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Praesentium quod, magnam, totam architecto molestiae ipsa libero quasi laboriosam quisquam facilis sed quae veritatis exercitationem commodi, dolorum unde consequatur obcaecati necessitatibus doloremque quia explicabo vitae dignissimos. Quos officia assumenda veniam eveniet amet repellat tempora laboriosam cum, eius quia laborum dolorem repudiandae, ad molestiae? Laudantium velit fugiat assumenda aliquid dolorem deserunt at alias voluptas natus nesciunt! Eaque optio distinctio, assumenda, error voluptatibus tempore quisquam natus. Ex aut atque eveniet, accusamus aliquid nulla distinctio mollitia delectus placeat beatae, necessitatibus ea aperiam fuga quos quia harum commodi eligendi dolore ipsam. Necessitatibus molestiae, repudiandae enim.
								</p>
							</Panel>
						</Col>
						<Col md={11}>
							<Panel footer={panelFooter}>
								<p style={align}>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Praesentium quod, magnam, totam architecto molestiae ipsa libero quasi laboriosam quisquam facilis sed quae veritatis exercitationem commodi, dolorum unde consequatur obcaecati necessitatibus doloremque quia explicabo vitae dignissimos. Quos officia assumenda veniam eveniet amet repellat tempora laboriosam cum, eius quia laborum dolorem repudiandae, ad molestiae? Laudantium velit fugiat assumenda aliquid dolorem deserunt at alias voluptas natus nesciunt! Eaque optio distinctio, assumenda, error voluptatibus tempore quisquam natus. Ex aut atque eveniet, accusamus aliquid nulla distinctio mollitia delectus placeat beatae, necessitatibus ea aperiam fuga quos quia harum commodi eligendi dolore ipsam. Necessitatibus molestiae, repudiandae enim.
								</p>
							</Panel>
						</Col>
						<Col md={11}>
							<Panel footer={panelFooter}>
								<p style={align}>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Praesentium quod, magnam, totam architecto molestiae ipsa libero quasi laboriosam quisquam facilis sed quae veritatis exercitationem commodi, dolorum unde consequatur obcaecati necessitatibus doloremque quia explicabo vitae dignissimos. Quos officia assumenda veniam eveniet amet repellat tempora laboriosam cum, eius quia laborum dolorem repudiandae, ad molestiae? Laudantium velit fugiat assumenda aliquid dolorem deserunt at alias voluptas natus nesciunt! Eaque optio distinctio, assumenda, error voluptatibus tempore quisquam natus. Ex aut atque eveniet, accusamus aliquid nulla distinctio mollitia delectus placeat beatae, necessitatibus ea aperiam fuga quos quia harum commodi eligendi dolore ipsam. Necessitatibus molestiae, repudiandae enim.
								</p>
							</Panel>
						</Col>
						<Col md={11}>
							<Panel footer={panelFooter}>
								<Image src="http://lorempixel.com/400/200/animals" responsive></Image>
								<hr />
								<p style={align}>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Praesentium quod, magnam, totam architecto molestiae ipsa libero quasi laboriosam quisquam facilis sed quae veritatis exercitationem commodi, dolorum unde consequatur obcaecati necessitatibus doloremque quia explicabo vitae dignissimos. Quos officia assumenda veniam eveniet amet repellat tempora laboriosam cum, eius quia laborum dolorem repudiandae, ad molestiae? Laudantium velit fugiat assumenda aliquid dolorem deserunt at alias voluptas natus nesciunt! Eaque optio distinctio, assumenda, error voluptatibus tempore quisquam natus. Ex aut atque eveniet, accusamus aliquid nulla distinctio mollitia delectus placeat beatae, necessitatibus ea aperiam fuga quos quia harum commodi eligendi dolore ipsam. Necessitatibus molestiae, repudiandae enim.
								</p>
							</Panel>
						</Col>
					</Row>
				</Col>
				<Col md={4}>
					<Panel>
						<form action="/test">
							<FormGroup controlId="formControlsName">
								<ControlLabel>Lorem ipsum dolor sit amet.</ControlLabel>
								<FormControl componentClass="textarea" style={{height: '180px'}} />
							</FormGroup>
							<FormGroup controlId="formControlsName">
								<ControlLabel>Lorem ipsum dolor sit amet.</ControlLabel>
								<FormControl type="file" />
							</FormGroup>
							<Button type="submit" bsStyle="success">Submit</Button>
						</form>
					</Panel>
				</Col>
			</Row>
		</Grid>
	</div>
)

const C = () => (
	<div>
		<Grid>
			<Row className="show-grid">
				<Col xsOffset={4} xs={5}>
					<Panel>
						<form action="/test">
							<FormGroup controlId="formControlsEmail">
								<ControlLabel>Email Address</ControlLabel>
								<FormControl type="email" placeholder="Enter email" />
							</FormGroup>
							<FormGroup controlId="formControlsPassword">
								<ControlLabel>Password</ControlLabel>
								<FormControl type="password" placeholder="Enter password" />
							</FormGroup>
							<Button type="submit" bsStyle="success">Submit</Button>
						</form>
					</Panel>
				</Col>
			</Row>
		</Grid>
	</div>
)

const D = () => (
	<div>
		<Grid>
			<Row className="show-grid">
				<Col md={5}>
					<Button bsStyle="primary">Lorem ipsum.</Button>
					<Alert bsStyle="danger">
						<strong>Holy guacamole!</strong> Best check yo self, you're not looking too good.
					</Alert>
				</Col>
			</Row>
			<br />
			<Row className="show-grid">
				<Col md={5}>
					<ListGroup>
						<ListGroupItem>
							Item 1
							<span style={{float: 'right'}}>
								<Label bsStyle="danger">Danger</Label>
							</span>
						</ListGroupItem>
						<ListGroupItem>
							Item 2
							<span style={{float: 'right'}}>
								<Label bsStyle="success">Success</Label>
							</span>
						</ListGroupItem>						
					</ListGroup>
				</Col>
			</Row>
		</Grid>
	</div>
)

const E = () => (
	<div>
		<Grid>
			<Row className="show-grid">
				<Col xsOffset={3} xs={6}>
					<Alert bsStyle="warning">
						<h3>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nihil, laudantium?</h3>
						<ButtonToolbar>
							<Button bsStyle="primary" bsSize="large">Lorem ipsum.</Button>
							<Button bsSize="large">Lorem ipsum.</Button>
						</ButtonToolbar>
					</Alert>
				</Col>
			</Row>
		</Grid>
	</div>
)

class App extends Component {
	render() {
		return (
			<Router>
				<div>
					<Navbar>
						<Navbar.Header>
							<Navbar.Brand>
								<a href="#">Lorem ipsum.</a>
							</Navbar.Brand>
						</Navbar.Header>
						<Nav>
							<IndexLinkContainer to="/">
								<NavItem>Lorem ipsum.</NavItem>
							</IndexLinkContainer>
							<IndexLinkContainer to="/b">
								<NavItem>Lorem ipsum.</NavItem>
							</IndexLinkContainer>
							<IndexLinkContainer to="/d">
								<NavItem>Lorem ipsum.</NavItem>
							</IndexLinkContainer>
							<IndexLinkContainer to="/e">
								<NavItem>Lorem ipsum.</NavItem>
							</IndexLinkContainer>
						</Nav>
						<Nav pullRight>
							<IndexLinkContainer to="/c">
								<NavItem>Login</NavItem>
							</IndexLinkContainer>
						</Nav>
					</Navbar>
					
					<Route exact path="/" component={A} />
					<Route path="/b" component={B} />
					<Route path="/c" component={C} />
					<Route path="/d" component={D} />
					<Route path="/e" component={E} />
				</div>
			</Router>
		)
	}
}

export default App