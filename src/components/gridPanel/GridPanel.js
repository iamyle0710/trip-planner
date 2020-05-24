import React from 'react';
import { Table } from 'react-bootstrap';

import { getDuration } from '../../utils/helper';
import './GridPanel.css';

class GridPanel extends React.Component {
	constructor() {
		super();

		this.state = {
			selectTripId: null,
		};
	}

	// Click table row to select a trip to edit
	onClickTrip = ({ currentTarget }) => {
		const { onSelectTrip } = this.props;
		const id = currentTarget.getAttribute('data-index');

		this.setState({
			selectTripId: id,
		});

		if (onSelectTrip) {
			onSelectTrip(id);
		}
	};

	render() {
		const { trips } = this.props;
		const { selectTripId } = this.state;

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
							onClick={this.onClickTrip}
							className={selectTripId === trip.id ? 'selected' : ''}
						>
							<td>{index + 1}</td>
							<td>{trip.title}</td>
							<td>{trip.destination}</td>
							<td>{getDuration(trip.startDate, trip.endDate)}</td>
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
