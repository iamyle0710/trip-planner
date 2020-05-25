import React from 'react';
import { Table } from 'react-bootstrap';

import './GridPanel.css';

const GridPanel = ({ trips, selectTripId, onSelectTrip }) => {
	// Click table row to select a trip to edit
	const onClickTrip = ({ currentTarget }) => {
		const id = currentTarget.getAttribute('data-index');

		if (onSelectTrip) {
			onSelectTrip(id);
		}
	};

	return (
		<Table striped bordered hover className="gridPanel">
			<thead>
				<tr>
					<th>#</th>
					<th>Title</th>
					<th>Destination</th>
					<th>Duration</th>
					<th>Category</th>
					<th>Reminder set</th>
					<th>Completed Items</th>
					<th>Trip State</th>
				</tr>
			</thead>
			<tbody>
				{trips.map((trip, index) => (
					<tr
						key={trip.id}
						data-index={trip.id}
						onClick={onClickTrip}
						className={selectTripId === trip.id ? 'selected' : ''}
					>
						<td>{index + 1}</td>
						<td>{trip.title}</td>
						<td>{trip.destination}</td>
						<td>
							{trip.duration} {trip.duration <= 1 ? 'day' : 'days'}
						</td>
						<td>{trip.category}</td>
						<td>{trip.isReminderPending ? <i className="fa fa-clock-o" /> : null}</td>
						<td>
							{trip.todos.filter((todo) => todo.isComplete).length} /{' '}
							{trip.todos.length}
						</td>
						<td>{trip.status}</td>
					</tr>
				))}
			</tbody>
		</Table>
	);
};

export default GridPanel;
