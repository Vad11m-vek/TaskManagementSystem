import React from "react"
import { Switch, Route, Redirect } from "react-router-dom"
import { TasksPage } from "./pages/TasksPage"
import { CreatePage } from "./pages/CreatePage"
import { AuthPage } from "./pages/AuthPage"
import Welcome from "./components/Welcome"
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
				<Route exact path="/confirm/:confirmationCode">
					<DetailPage />
				</Route>
			</Switch>
		)
	}
	return (
		<Switch>
			<Route path="/" exact>
				<AuthPage />
			</Route>
			<Redirect to="/" />
		</Switch>
	)
}