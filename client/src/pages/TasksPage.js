import React from 'react'
import Child from '../components/Child'
// import { Button } from 'react-bootstrap'


// export const TasksPage = () => {


// 	return (
// 		<>
// 			<h1>hello world</h1>
// 		</>
// 	);
// }
class TasksPage extends React.Component {
	useDataFromChild = (value) => {
		console.log(value)
	}

	render() {
		return (
			<div>
				<Child name="Option: Little" onReceiveData={this.useDataFromChild} />
				<Child name="Option: Many" onReceiveData={this.useDataFromChild} />
			</div>
		)
	}
}
export default TasksPage