import React from 'react';

import { Row, Col, Form, Button, ListGroup, InputGroup, ButtonGroup } from 'react-bootstrap';
import Constant from '../../common/Constant';
import CalendarWidget from './CalendarWidget';
import './DetailPanel.css';

const { CATEGORY } = Constant;

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
			status: trip.status,
			todos: trip.todos.map(({ id, name, isComplete }) => ({
				id,
				name,
				isComplete,
			})),
		};
	}

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

	// Save the current form
	onSave = (event) => {
		event.preventDefault();

		const { onSaveEdit } = this.props;

		if (onSaveEdit) {
			onSaveEdit(this.state);
		}
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
		} = this.state;

		return (
			<div className="detail-panel d-flex">
				<Form onSubmit={this.onSave}>
					<h4>Trip Detail</h4>
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
											<InputGroup.Checkbox aria-label="Checkbox for following text input" />
										</InputGroup.Prepend>
										<Form.Control
											size="sm"
											type="text"
											placeholder="Enter todo item"
										/>
										<InputGroup.Append>
											<Button size="sm" variant="danger">
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
								<Button variant="outline-primary">Add Todo Item</Button>
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
