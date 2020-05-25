import React from 'react';
import { Row, Col, Form, Button, ListGroup, ButtonGroup, Badge } from 'react-bootstrap';
import { v4 as uuidv4 } from 'uuid';

import Constant from '../../common/Constant';
import { isValidDate } from '../../utils/helper';
import FormDateField from './FormDateField';
import FormField from './FormField';
import FormTodo from './FormTodo';
import './DetailPanel.css';

const { CATEGORY, TRIP_STATUS } = Constant;

class DetailPanel extends React.Component {
	constructor(props) {
		super(props);

		const { trip } = this.props;
		this.formRef = React.createRef();
		this.state = {
			id: trip.id,
			title: trip.title || '',
			category: trip.category || CATEGORY.NONE,
			destination: trip.destination || '',
			description: trip.description || '',
			startDate: trip.startDate,
			endDate: trip.endDate,
			reminder: trip.reminder > new Date() ? trip.reminder : null,
			status: trip.status || TRIP_STATUS.CREATED,
			todos: trip.todos.map(({ id, name, isComplete }) => ({
				id,
				name,
				isComplete,
			})),
			isValidated: false,
		};
	}

	// return boolean
	validate = (field, value) => {
		const data = this.state;

		switch (field) {
			case 'title':
			case 'category':
			case 'destination':
			case 'description':
			case 'todo':
				return value !== '';
			case 'startDate':
			case 'reminder':
				return isValidDate(data[field]) && data[field] > new Date();
			case 'endDate':
				return isValidDate(data[field]) && data[field] > data.startDate;
			default:
				return true;
		}
	};

	// return a data object
	processFormData = () => {
		const data = { ...this.state };

		delete data.isValidated;

		return data;
	};

	// Add a new todo item
	onAddTodo = () => {
		this.setState(
			({ todos }) => ({
				todos: [
					...todos,
					{
						id: uuidv4(),
						name: '',
						isComplete: false,
					},
				],
			}),
			this.updateTripState
		);
	};

	// Cancel editing the current form
	onClickCancel = () => {
		const { onCancelEdit } = this.props;
		if (onCancelEdit) {
			onCancelEdit();
		}
	};

	// Change field of the trip form
	onChangeField = (key, value) => {
		this.setState({
			[key]: value,
		});
	};

	// Change todo item name and status
	onChangeTodo = (id, key, value) => {
		this.setState(
			({ todos }) => ({
				todos: todos.map((todo) => {
					if (todo.id === id) {
						return {
							...todo,
							[key]: value,
						};
					}
					return todo;
				}),
			}),
			this.updateTripState
		);
	};

	// Remove the todo item
	onRemoveTodo = (id) => {
		this.setState(
			({ todos }) => ({
				todos: todos.filter((todo) => todo.id !== id),
			}),
			this.updateTripState
		);
	};

	// Save the current form
	onSave = () => {
		const form = this.formRef ? this.formRef.current : null;
		const { onSaveEdit } = this.props;
		const isFormValid = form ? form.checkValidity() : false;

		if (isFormValid && onSaveEdit) {
			const formData = this.processFormData({ ...this.state });
			onSaveEdit(formData);
		}

		this.setState({
			isValidated: true,
		});
	};

	// Update states of the trip
	updateTripState = () => {
		const { todos } = this.state;
		const total = todos.length;
		const completed = todos.filter((todo) => todo.isComplete).length;

		if (completed === 0) {
			this.setState({ status: TRIP_STATUS.CREATED });
		} else if (completed === total) {
			this.setState({ status: TRIP_STATUS.READY });
		} else {
			this.setState({ status: TRIP_STATUS.IN_PROGRESS });
		}
	};

	render() {
		const {
			id,
			title,
			category,
			destination,
			description,
			startDate,
			endDate,
			reminder,
			todos,
			status,
			isValidated,
		} = this.state;
		const isNewTrip = id === undefined;

		return (
			<div className="detail-panel d-flex">
				<Form noValidate validated={isValidated} ref={this.formRef}>
					<h4>
						Trip Detail
						<Badge className="ml-2" variant="warning">
							{status}
						</Badge>
					</h4>
					<Form.Group>
						<Row>
							<Col>
								<FormField
									required
									as="input"
									type="text"
									label="Title"
									placeholder="Type your trip title"
									name="title"
									value={title}
									onChangeField={this.onChangeField}
									invalidMessage="Please type a title"
								/>
							</Col>
							<Col>
								<FormField
									as="select"
									label="Category"
									name="category"
									value={category}
									onChangeField={this.onChangeField}
								>
									{Object.keys(CATEGORY).map((type) => (
										<option key={type} value={CATEGORY[type]}>
											{CATEGORY[type]}
										</option>
									))}
								</FormField>
							</Col>
						</Row>
					</Form.Group>
					<Form.Group>
						<Row>
							<Col>
								<FormField
									required
									as="input"
									type="text"
									label="Destination"
									placeholder="Enter your destination"
									name="destination"
									value={destination}
									onChangeField={this.onChangeField}
									invalidMessage="Please enter a destination"
								/>
							</Col>
							<Col>
								<FormField
									required
									as="input"
									type="text"
									label="Description"
									placeholder="Enter the trip description"
									name="description"
									value={description}
									onChangeField={this.onChangeField}
									invalidMessage="Please enter a description"
								/>
							</Col>
						</Row>
					</Form.Group>
					<Form.Group>
						<Row>
							<Col>
								<FormDateField
									required
									label="Start Date"
									name="startDate"
									value={startDate}
									minDate={new Date(new Date().toLocaleDateString())}
									onChangeField={this.onChangeField}
									invalidMessage="Select a date"
								/>
							</Col>
							<Col>
								<FormDateField
									required
									label="End Date"
									name="endDate"
									value={this.validate('endDate', endDate) ? endDate : null}
									minDate={startDate}
									onChangeField={this.onChangeField}
									invalidMessage="it needs to be later than the start date"
								/>
							</Col>
						</Row>
					</Form.Group>
					<Form.Group>
						<Form.Label>Todo Items</Form.Label>
						<ListGroup varient="flush">
							{todos.map((todo) => (
								<FormTodo
									key={todo.id}
									{...todo}
									placeholder="Enter todo item"
									onChangeTodo={this.onChangeTodo}
									onRemoveTodo={this.onRemoveTodo}
								/>
							))}
							<ListGroup.Item>
								<Button variant="outline-primary" onClick={this.onAddTodo}>
									Add Todo Item
								</Button>
							</ListGroup.Item>
						</ListGroup>
					</Form.Group>
					<Form.Group>
						<FormDateField
							showTime
							label="Set Reminder"
							name="reminder"
							value={this.validate('reminder', reminder) ? reminder : null}
							minDate={new Date()}
							onChangeField={this.onChangeField}
						/>
					</Form.Group>
					<Form.Group>
						<ButtonGroup>
							<Button onClick={this.onSave}>Save</Button>
							<Button onClick={this.onClickCancel}>Cancel</Button>
							{isNewTrip ? null : <Button>Delete</Button>}
						</ButtonGroup>
					</Form.Group>
				</Form>
			</div>
		);
	}
}

export default DetailPanel;
