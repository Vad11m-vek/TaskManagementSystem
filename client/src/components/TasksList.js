import React from "react";
import { Table } from 'react-bootstrap'

export const TasksList = () => {

	return (
		<Table striped bordered hover variant="dark">
			<thead>
				<tr>
					<th>#</th>
					<th>First Name</th>
					<th>Last Name</th>
					<th>Username</th>
				</tr>
			</thead>
			<tbody>
				<tr>
					<td>1</td>
					<td>Mark</td>
					<td>Otto</td>
					<td>@mdo</td>
				</tr>
			</tbody>
		</Table>
	)

}