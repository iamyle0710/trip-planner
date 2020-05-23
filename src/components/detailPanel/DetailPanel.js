import React from 'react';
import { Row, Col, Form, Button, ListGroup, InputGroup, ButtonGroup, Badge } from 'react-bootstrap';

import Constant from '../../common/Constant';
import CalendarWidget from './CalendarWidget';
import './DetailPanel.css';

const { CATEGORY, TRIP_STATUS } = Constant;

class DetailPanel extends React.Component {
	constructor(props) {
		super(props);

		const { trip } = this.props;

		this.state = {
			id: trip.id,
			title: trip.title || '',
			category: trip.category || CATEGORY.NONE,
			destination: trip.destination || '',
			description: trip.description || '',
			startDate: trip.startDate || new Date(),
			endDate: trip.endDate,
			reminder: trip.reminder,
			status: trip.status || TRIP_STATUS.CREATED,
			todos: trip.todos.map(({ id, name, isComplete }) => ({
				id,
				name,
				isComplete,
			})),
		};
	}

	// Add a new todo item
	onAddTodo = () => {
		this.setState(
			({ todos }) => ({
				todos: [
					...todos,
					{
						id: new Date().getTime().toString(),
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
	onChangeField = ({ target }) => {
		const { name, value } = target;

		this.setState({
			[name]: value,
		});
	};

	// Change date of the trip form
	onChangeDate = (name, value) => {
		this.setState({
			[name]: value,
		});
	};

	// Change todo item name
	onChangeTodoName = ({ target }) => {
		const { value } = target;
		const index = +target.getAttribute('data-index');

		this.setState(({ todos }) => ({
			todos: todos.map((todo, i) => {
				if (i === index) {
					return {
						...todo,
						name: value,
					};
				}
				return { ...todo };
			}),
		}));
	};

	// Change todo item status
	onChangeTodoStatus = ({ target }) => {
		const { checked } = target;
		const index = +target.getAttribute('data-index');
		this.setState(
			({ todos }) => ({
				todos: todos.map((todo, i) => {
					if (i === index) {
						return {
							...todo,
							isComplete: checked,
						};
					}
					return { ...todo };
				}),
			}),
			this.updateTripState
		);
	};

	// Remove the todo item
	onRemoveTodo = ({ target }) => {
		const index = +target.getAttribute('data-index');
		this.setState(
			({ todos }) => ({
				todos: todos.filter((todo, i) => i !== index),
			}),
			this.updateTripState
		);
	};

	// Save the current form
	onSave = (event) => {
		event.preventDefault();

		const { onSaveEdit } = this.props;

		if (onSaveEdit) {
			onSaveEdit(this.state);
		}
	};

	// Update states of the trip
	updateTripState = () => {
		const { todos } = this.state;
		const total = todos.length;
		const completed = todos.filter((todo) => todo.isComplete).length;

		let status = TRIP_STATUS.CREATED;
		status = total !== 0 && completed === total ? TRIP_STATUS.READY : TRIP_STATUS.IN_PROGRESS;

		this.setState({
			status,
		});
	};

	render() {
		const {
			title,
			category,
			destination,
			description,
			startDate,
			endDate,
			reminder,
			todos,
			status,
		} = this.state;

		return (
			<div className="detail-panel d-flex">
				<Form onSubmit={this.onSave}>
					<h4>
						Trip Detail
						<Badge className="ml-2" variant="warning">
							{status}
						</Badge>
					</h4>
					<Form.Group>
						<Row>
							<Col>
								<Form.Label>Title</Form.Label>
								<Form.Control
									size="sm"
									type="text"
									placeholder="Title"
									value={title}
									name="title"
									onChange={this.onChangeField}
								/>
							</Col>
							<Col>
								<Form.Label>Category</Form.Label>
								<Form.Control
									as="select"
									size="sm"
									value={category}
									name="category"
									onChange={this.onChangeField}
								>
									{Object.keys(CATEGORY).map((type) => (
										<option key={type} value={type}>
											{CATEGORY[type]}
										</option>
									))}
								</Form.Control>
							</Col>
						</Row>
					</Form.Group>
					<Form.Group>
						<Row>
							<Col>
								<Form.Label>Destination</Form.Label>
								<Form.Control
									size="sm"
									type="text"
									placeholder="Enter your destination"
									value={destination}
									name="destination"
									onChange={this.onChangeField}
								/>
							</Col>
							<Col>
								<Form.Label>Description</Form.Label>
								<Form.Control
									size="sm"
									type="text"
									placeholder="Enter description"
									value={description}
									name="description"
									onChange={this.onChangeField}
								/>
							</Col>
						</Row>
					</Form.Group>
					<Form.Group>
						<Row>
							<Col>
								<Form.Label>Start</Form.Label>
								<CalendarWidget
									name="startDate"
									value={startDate}
									onChange={this.onChangeDate}
								/>
							</Col>
							<Col>
								<Form.Label>End</Form.Label>
								<CalendarWidget
									name="endDate"
									value={endDate}
									onChange={this.onChangeDate}
								/>
							</Col>
						</Row>
					</Form.Group>
					<Form.Group>
						<Form.Label>Todo Items</Form.Label>
						<ListGroup varient="flush">
							{todos.map((todo, index) => (
								<ListGroup.Item
									key={index}
									className="detail-panel-trip-form-todoListItem"
								>
									<InputGroup>
										<InputGroup.Prepend>
											<InputGroup.Checkbox
												aria-label="Checkbox for following text input"
												checked={todo.isComplete}
												data-index={index}
												onChange={this.onChangeTodoStatus}
											/>
										</InputGroup.Prepend>
										<Form.Control
											size="sm"
											type="text"
											placeholder="Enter todo item"
											data-index={index}
											onChange={this.onChangeTodoName}
										/>
										<InputGroup.Append>
											<Button
												size="sm"
												variant="danger"
												data-index={index}
												onClick={this.onRemoveTodo}
											>
												<i
													className="fa fa-trash-o"
													style={{ color: '#fff' }}
												/>
											</Button>
										</InputGroup.Append>
									</InputGroup>
								</ListGroup.Item>
							))}
							<ListGroup.Item>
								<Button variant="outline-primary" onClick={this.onAddTodo}>
									Add Todo Item
								</Button>
							</ListGroup.Item>
						</ListGroup>
					</Form.Group>
					<Form.Group>
						<Form.Label>Set Reminder</Form.Label>
						<CalendarWidget
							showTime
							name="reminder"
							value={reminder}
							onChange={this.onChangeDate}
						/>
					</Form.Group>
					<Form.Group>
						<ButtonGroup>
							<Button type="submit">Save</Button>
							<Button onClick={this.onClickCancel}>Cancel</Button>
							<Button>Delete</Button>
						</ButtonGroup>
					</Form.Group>
				</Form>
			</div>
		);
	}
}

export default DetailPanel;
