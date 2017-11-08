import React from 'react'
import {
	Navbar,
	Nav,
	NavItem,
	NavDropdown,
	MenuItem,
	Alert
} from 'react-bootstrap'
import axios from 'axios'
import jwt from 'jsonwebtoken'
import {
	HashRouter as Router,
	Route,
	Link,
	Redirect,
	Switch,
	withRouter
} from 'react-router-dom'
import { IndexLinkContainer } from 'react-router-bootstrap'

import Login from './Login'
import Registration from './Registration'
import Home from './Home'
import Pick from './Pick'
import Admin from './Admin'

import {
	verifyToken, 
	generateToken
} from './../helper/auth'

const checkAuth = () => {
	return verifyToken(localStorage.getItem('jwt-auth'))
}

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={props => (
    checkAuth() ? (
 		<Component {...props}/>    	
    ) : (
      <Redirect to={{
        pathname: '/login',
        state: { from: props.location }
      }}/>
    )
  )}/>
)

const AdminRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={props => (
    checkAuth() ? (
    	checkAuth().agent.is_admin ? (
 			<Component {...props}/>    	
 		) : (
	 		<Redirect to={{
	        pathname: '/home',
	        state: { from: props.location }
	      }}/>
 		)
    ) : (
      <Redirect to={{
        pathname: '/login',
        state: { from: props.location }
      }}/>
    )
  )}/>
)

const NoMatch = ({ location }) => (
	<div className="container">
		<Alert bsStyle='warning'>
			Sorry, the page you are looking for could not be found.
		</Alert>
	</div>
)

const logout = cb => {
	localStorage.removeItem('jwt-auth')
	setTimeout(cb, 100)
}

const AuthLink = withRouter(({ history }) => (
  checkAuth() ? (
  	<Nav pullRight>
		<NavDropdown 
			title={(
				<span>
					<span className="glyphicon glyphicon-user"></span>&nbsp;&nbsp;
		 			{checkAuth().agent.name}
				</span>
			 )} 
			id="basic-nav-dropdown"
		>
			{
				checkAuth().agent.is_admin ? (
					<MenuItem
						onClick={() => history.push('/admin')}
					>Admin
					</MenuItem>
				) : (null)
			}
			<MenuItem
				onClick={() => {logout(() => history.push('/'))}}
			>Logout
			</MenuItem>
		</NavDropdown>
	</Nav>
  ) : history.location.pathname === '/login' 
  	|| history.location.pathname === '/' ? (
		<Nav pullRight>
			<NavItem 
				onClick={() => history.push('/register')}
			>Sign Up</NavItem>
		</Nav>
  ) : (
    	<Nav pullRight>
			<NavItem 
				onClick={() => history.push('/login')}
			>Sign In</NavItem>
		</Nav>
  	)
))

const App = () => {
	return (
		<Router>
			<div>
				<Navbar collapseOnSelect>
					<Navbar.Header>
						<Navbar.Brand>
							<a href="/"><img src="./maple_logo_home_page.png" alt="Logo"/></a>
						</Navbar.Brand>
						<Navbar.Toggle />
					</Navbar.Header>
					<Navbar.Collapse>
						{/*<Nav>
							<IndexLinkContainer to="/home">
								<NavItem>Home</NavItem>
							</IndexLinkContainer>
							<IndexLinkContainer to="/login">
								<NavItem>Login</NavItem>
							</IndexLinkContainer>
							<IndexLinkContainer to="/register">
								<NavItem>Register</NavItem>
							</IndexLinkContainer>
							<IndexLinkContainer to="/pick">
								<NavItem>Pick</NavItem>
							</IndexLinkContainer>
							<IndexLinkContainer to="/no-pick">
								<NavItem>No Route</NavItem>
							</IndexLinkContainer>
						</Nav>*/}
						<AuthLink />
					</Navbar.Collapse>
				</Navbar>

				<Switch>
					<Route exact path="/" component={Login} />
					<Route exact path="/register" component={Registration} />
					<Route exact path="/login" component={Login} />
					<PrivateRoute path="/home" component={Home} />
					<PrivateRoute path="/pick" component={Pick} />
					<AdminRoute path="/admin" component={Admin} />
					<Route component={NoMatch} />
				</Switch>
			</div>
		</Router>
	)
}

export default App