import React from 'react';
import { Table } from 'react-bootstrap';

class GridPanel extends React.Component {
	constructor() {
		super();
	}

	// Click table row to select a trip to edit
	onClickTrip = ({ currentTarget }) => {
		const { onSelectTrip, trips } = this.props;
		const index = +currentTarget.getAttribute('data-index');
		if (onSelectTrip) {
			onSelectTrip(trips[index]);
		}
	};

	render() {
		const { trips } = this.props;

		return (
			<Table striped bordered hover>
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
						<tr key={trip.id} data-index={index} onClick={this.onClickTrip}>
							<td>{index + 1}</td>
							<td>{trip.title}</td>
							<td>{trip.destination}</td>
							<td>{trip.duration}</td>
							<td>{trip.category}</td>
							<td>{trip.reminder ? <i className="fa fa-clock-o" /> : null}</td>
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
	}
}

export default GridPanel;
