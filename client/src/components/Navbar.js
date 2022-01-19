import React, { useContext } from 'react'
import { useHistory, Link } from 'react-router-dom'
import { AuthContext } from "../context/AuthContext"
import { Navbar, Container, Nav } from 'react-bootstrap'


export const NavBar = () => {
	const history = useHistory()
	const auth = useContext(AuthContext)
	const logoutHandler = event => {
		event.preventDefault()
		auth.logout()
		history.push('/')
	}
	return (
		<div>
			<Navbar bg="dark" variant="dark">
				<Container>
					<Navbar.Brand>Task Management System</Navbar.Brand>
					<Nav className="me-auto">
						<Link to="/create">Створити</Link>
						<Link to="/task">Tasks</Link>
						<Link to="/" onClick={logoutHandler}>Вийти</Link>
					</Nav>
				</Container>

			</Navbar>
		</div>
	)
}