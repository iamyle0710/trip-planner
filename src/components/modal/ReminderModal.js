import React from 'react';
import {
	Container,
	Button,
	Modal,
	Row,
	Col,
	ListGroup,
	Dropdown,
	DropdownButton,
	ButtonGroup,
} from 'react-bootstrap';

import Constant from '../../common/Constant';

const { SNOOZE } = Constant;

const ReminderModal = ({ trip, onHide, onClickDetailButton, snoozeTripReminder }) => (
	<Modal show size="lg" aria-labelledby="contained-modal-title-vcenter" centered onHide={onHide}>
		<Modal.Header closeButton>
			<Modal.Title id="contained-modal-title-vcenter">Trip Reminder</Modal.Title>
		</Modal.Header>
		<Modal.Body>
			<Container>
				<Row className="show-grid">
					<Col md={6}>
						<Row>
							<Col md={6}>
								<code>Trip Title</code>
							</Col>
							<Col md={6}>{trip ? trip.title : '--'}</Col>
						</Row>
					</Col>
					<Col md={6}>
						<Row>
							<Col md={6}>
								<code>Category</code>
							</Col>
							<Col md={6}>{trip ? trip.category : '--'}</Col>
						</Row>
					</Col>
				</Row>
				<Row className="show-grid">
					<Col md={6}>
						<Row>
							<Col md={6}>
								<code>Destination</code>
							</Col>
							<Col md={6}>{trip ? trip.destination : '--'}</Col>
						</Row>
					</Col>
					<Col md={6}>
						<Row>
							<Col md={6}>
								<code>Description</code>
							</Col>
							<Col md={6}>{trip ? trip.description : '--'}</Col>
						</Row>
					</Col>
				</Row>
				<Row className="show-grid">
					<Col md={6}>
						<Row>
							<Col md={6}>
								<code>Start Date</code>
							</Col>
							<Col md={6}>{trip ? trip.startDate.toString() : '--'}</Col>
						</Row>
					</Col>
					<Col md={6}>
						<Row>
							<Col md={6}>
								<code>End Date</code>
							</Col>
							<Col md={6}>{trip ? trip.endDate.toString() : '--'}</Col>
						</Row>
					</Col>
				</Row>
				<Row className="show-grid mt-3">
					<Col md={3}>
						<code>Todo items</code>
					</Col>
					<Col md={9}>
						<ListGroup>
							{trip &&
								trip.todos.map((todo) => (
									<ListGroup.Item key={todo.id}>
										<i
											className={
												todo.isComplete
													? 'fa fa-check-circle-o'
													: 'fa fa-times'
											}
										/>
										<span className="ml-3">{todo.name}</span>
									</ListGroup.Item>
								))}
						</ListGroup>
					</Col>
				</Row>
			</Container>
		</Modal.Body>
		<Modal.Footer>
			<DropdownButton
				as={ButtonGroup}
				id="dropdown-variants-primary"
				variant="primary"
				title="Snooze"
			>
				{Object.keys(SNOOZE).map((key) => (
					<Dropdown.Item
						eventKey={key}
						key={key}
						value={SNOOZE[key].value}
						onSelect={(eventKey) => snoozeTripReminder(trip.id, SNOOZE[eventKey].value)}
					>
						{SNOOZE[key].name}
					</Dropdown.Item>
				))}
			</DropdownButton>
			<Button variant="primary" onClick={() => onClickDetailButton(trip.id)}>
				Check Detail
			</Button>
		</Modal.Footer>
	</Modal>
);

export default ReminderModal;
