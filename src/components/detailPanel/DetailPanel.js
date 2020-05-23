import React from 'react';

import { Row, Col, Form, Button, ListGroup, InputGroup, ButtonGroup } from 'react-bootstrap';
import Trip from '../../common/Trip';
import Constant from '../../common/Constant';
import CalendarWidget from './CalendarWidget';
import './DetailPanel.css';

const { CATEGORY } = Constant;

class DetailPanel extends React.Component {
	constructor(props) {
		super(props);

		const { tripData } = this.props;

		this.state = {
			trip: new Trip(tripData || {}),
		};
	}

	// Cancel editing the current form
	onClickCancel = () => {
		const { onCancelEdit } = this.props;
		if (onCancelEdit) {
			onCancelEdit();
		}
	};

	render() {
		const { trip } = this.state;

		return (
			<div className="detail-panel d-flex">
				<Form onSubmit={this.onSubmit}>
					<h4>Trip Detail</h4>
					<Form.Group>
						<Row>
							<Col>
								<Form.Label>Title</Form.Label>
								<Form.Control size="sm" type="text" placeholder="Title" />
							</Col>
							<Col>
								<Form.Label>Category</Form.Label>
								<Form.Control as="select" size="sm" value="Choose a category">
									{Object.keys(CATEGORY).map((category) => (
										<option key={category} value={category}>
											{CATEGORY[category]}
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
								/>
							</Col>
							<Col>
								<Form.Label>Description</Form.Label>
								<Form.Control
									size="sm"
									type="text"
									placeholder="Enter description"
								/>
							</Col>
						</Row>
					</Form.Group>
					<Form.Group>
						<Row>
							<Col>
								<Form.Label>Start</Form.Label>
								<CalendarWidget />
							</Col>
							<Col>
								<Form.Label>End</Form.Label>
								<CalendarWidget />
							</Col>
						</Row>
					</Form.Group>
					<Form.Group>
						<Form.Label>Todo Items</Form.Label>
						<ListGroup varient="flush">
							{trip.todos.map((todo, index) => (
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
						<CalendarWidget showTime />
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
