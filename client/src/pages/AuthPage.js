import React, { useContext, useState, useEffect } from 'react'
import { useHttp } from '../hooks/http.hook'
import { Button, Card, InputGroup, FormControl } from 'react-bootstrap'
import { AuthContext } from '../context/AuthContext'

export const AuthPage = () => {
	const auth = useContext(AuthContext)
	const { loading, request, error, clearError } = useHttp()
	const [form, setForm] = useState({
		username: "", email: "", password: ""
	})
	useEffect(() => {
		clearError()
	}, [error, clearError])
	const changeHandler = event => {
		setForm({ ...form, [event.target.name]: event.target.value })
	}
	const registerHandler = async () => {
		try {
			await request('/api/auth/register', 'POST', { ...form })
		} catch (e) {
			console.log('ErrorData', e)
		}
	}
	const loginHandler = async () => {
		try {
			const data = await request('/api/auth/login', 'POST', { ...form })
			auth.login(data.token, data.userId, data.userStatus)
		} catch (e) {
			console.log('ErrorData', e)
		}
	}

	return (
		<Card style={{ width: '18rem' }}>
			<Card.Body>
				<Card.Title>Task Management System</Card.Title>
				<Card.Subtitle className="mb-2 text-muted">Авторизація</Card.Subtitle>

				<InputGroup className="mb-3">
					<FormControl
						placeholder="Enter nickname"
						name="username"
						id="username"
						onChange={changeHandler}
					/>
				</InputGroup>
				<InputGroup className="mb-3">
					<FormControl
						placeholder="Enter email"
						name="email"
						id="email"
						onChange={changeHandler}
					/>
				</InputGroup>
				<InputGroup className="mb-3">
					<FormControl
						placeholder="Password"
						type="password"
						name="password"
						id="password"
						onChange={changeHandler}
					/>
				</InputGroup>


				<Button variant="outline-primary"
					disabled={loading}
					onClick={loginHandler}
				>
					Увійти
				</Button>
				<Button variant="outline-secondary"
					onClick={registerHandler}
					disabled={loading}
				>
					Реєстрація
				</Button>
			</Card.Body>
		</Card>

	)
}