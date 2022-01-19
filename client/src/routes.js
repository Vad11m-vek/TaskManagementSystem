import React from "react"
import { Switch, Route, Redirect } from "react-router-dom"
import TasksPage from "./pages/TasksPage"
import { CreatePage } from "./pages/CreatePage"
import { AuthPage } from "./pages/AuthPage"
import { DetailPage } from './pages/DetailPage'

export const useRoutes = isAuthenticated => {
	if (!isAuthenticated) {
		return (
			<Switch>
				<Route exact path="/create">
					<CreatePage />
				</Route>
				<Route exact path="/task">
					<TasksPage />
				</Route>
			</Switch>
		)
	}
	return (
		<Switch>
			<Route path="/" exact>
				<AuthPage />
			</Route>
			<Route exact path="/confirm/:confirmationCode">
				<DetailPage />
			</Route>
			<Redirect to="/" />
		</Switch>
	)
}