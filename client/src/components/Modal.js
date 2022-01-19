import React, { useState } from 'react'
import { Button, Modal, InputGroup, FormControl, Dropdown, DropdownButton, Form } from 'react-bootstrap'



export const MyVerticallyCenteredModal = (props, console) => {

	const [titleValue, setTitleValue] = useState()
	const [descriptionValue, setDescriptionValue] = useState()
	const [checkBoxValue, setCheckBoxValue] = useState('false')
	const [dropTitle, setDropTitle] = useState('0')
	const [dueDate, setDueDate] = useState()
	const [allValues, setAllValues] = useState({
		title: '',
		description: '',
		isDone: 'false',
		priority: '',
		dueDate: ''
	})
	const checkedHandler = e => {
		setCheckBoxValue(e.target.name = e.target.type === "checkbox" ? e.target.checked : e.target.value);
	}
	const AllValuesData = () => {
		setAllValues(
			{
				title: titleValue,
				description: descriptionValue,
				isDone: checkBoxValue,
				priority: dropTitle,
				dueDate: dueDate
			}
		)
	}


	return (

		< Modal
			{...props}
			{...AllValuesData}
			size="lg"
			aria-labelledby="contained-modal-title-vcenter"
			centered
		>
			<Modal.Header>
				<InputGroup size="lg" className="mb-3">
					<FormControl aria-label="Small" aria-describedby="inputGroup-sizing-mb" onBlur={e => setTitleValue(e.target.value)} />
				</InputGroup>
			</Modal.Header>
			<Modal.Body>
				<InputGroup>
					<InputGroup.Checkbox aria-label="Checkbox for following text input" onBlur={checkedHandler} />
					<FormControl as="textarea" aria-label="With textarea" onBlur={e => setDescriptionValue(e.target.value)} />
					<DropdownButton
						variant="outline-secondary"
						id="input-group-dropdown-2"
						align="end"
						title={`${dropTitle == null || dropTitle === '' ? '0' : dropTitle}`}
						value={`${dropTitle}`}
					>
						<Dropdown.Item href="#" onClick={() => setDropTitle('1')}>1</Dropdown.Item>
						<Dropdown.Item href="#" onClick={() => setDropTitle('2')}>2</Dropdown.Item>
						<Dropdown.Item href="#" onClick={() => setDropTitle('3')}>3</Dropdown.Item>
						<Dropdown.Item href="#" onClick={() => setDropTitle('4')}>4</Dropdown.Item>
						<Dropdown.Item href="#" onClick={() => setDropTitle('5')}>5</Dropdown.Item>
						<Dropdown.Item href="#" onClick={() => setDropTitle('6')}>6</Dropdown.Item>
						<Dropdown.Item href="#" onClick={() => setDropTitle('7')}>7</Dropdown.Item>
						<Dropdown.Item href="#" onClick={() => setDropTitle('8')}>8</Dropdown.Item>
						<Dropdown.Item href="#" onClick={() => setDropTitle('9')}>9</Dropdown.Item>
					</DropdownButton>
				</InputGroup>
				<Form.Group controlId="dob">
					<Form.Label>Select Date</Form.Label>
					<Form.Control type="date" name="dob" placeholder="Date of Birth" onBlur={e => setDueDate(e.target.value)} />
				</Form.Group>

			</Modal.Body>
			<Modal.Footer>
				<Button onClick={props.hide, props.onAdd}>Save</Button>
				<Button onClick={props.hide}>Close</Button>
				<Button onClick={props.console}>console</Button>
			</Modal.Footer>
		</Modal >
	)

}