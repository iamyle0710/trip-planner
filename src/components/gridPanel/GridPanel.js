import React, { useState } from 'react';
import { Table } from 'react-bootstrap';

import Constant from '../../common/Constant';
import { isValidDate } from '../../utils/helper';
import './GridPanel.css';

const { COLUMN_KEY } = Constant;

// sort two reminder dates
const compareReminders = (date1, date2) => {
	const reminder1Time = date1 ? date1.getTime() : Number.MAX_VALUE;
	const reminder2Time = date2 ? date2.getTime() : Number.MAX_VALUE;
	return reminder1Time - reminder2Time;
};

// sort two trips' number of completed todos
const compareCompleteItems = (todos1, todos2) => {
	const todo1Num = todos1.filter((todo) => todo.isComplete).length;
	const todo2Num = todos2.filter((todo) => todo.isComplete).length;
	return todo1Num - todo2Num;
};

class GridPanel extends React.Component {
	constructor() {
		super();
		this.state = {
			sortKey: null,
		};
	}

	onClickTrip = ({ currentTarget }) => {
		const { onSelectTrip } = this.props;
		const id = currentTarget.getAttribute('data-index');

		if (onSelectTrip) {
			onSelectTrip(id);
		}
	};

	// Click sort column
	onClickSort = (sortKey) => {
		this.setState({ sortKey });
	};

	sortTrips = () => {
		const { sortKey } = this.state;
		const { trips } = this.props;
		const sortedTrips = sortKey
			? trips.slice().sort((trip1, trip2) => {
					switch (sortKey) {
						case COLUMN_KEY.TITLE.sortKey:
						case COLUMN_KEY.CATEGORY.sortKey:
						case COLUMN_KEY.DESTINATION.sortKey:
						case COLUMN_KEY.TRIP_STATE.sortKey:
							return trip1[sortKey].localeCompare(trip2[sortKey]);
						case COLUMN_KEY.REMINDER.sortKey:
							return compareReminders(trip1[sortKey], trip2[sortKey]);
						case COLUMN_KEY.COMPLETE_ITEMS.sortKey:
							return compareCompleteItems(trip1[sortKey], trip2[sortKey]);
						case COLUMN_KEY.DURATION.sortKey:
							return trip1[sortKey] - trip2[sortKey];
						default:
							return 0;
					}
			  })
			: trips;
		return sortedTrips;
	};

	render() {
		const { selectTripId } = this.props;
		const { sortKey } = this.state;
		const sortedTrips = this.sortTrips();
		return (
			<Table striped bordered hover className="gridPanel">
				<thead>
					<tr>
						{Object.keys(COLUMN_KEY).map((key) => (
							<SortColumn
								key={key}
								name={COLUMN_KEY[key].name}
								sortKey={COLUMN_KEY[key].sortKey}
								onSort={this.onClickSort}
								sorting={COLUMN_KEY[key].sortKey === sortKey}
							/>
						))}
					</tr>
				</thead>
				<tbody>
					{sortedTrips.length === 0 && (
						<tr>
							<td colSpan="7">No trips created at this moment</td>
						</tr>
					)}
					{sortedTrips.map((trip) => (
						<tr
							key={trip.id}
							data-index={trip.id}
							onClick={this.onClickTrip}
							className={selectTripId === trip.id ? 'selected' : ''}
						>
							<td>{trip.title}</td>
							<td>{trip.destination}</td>
							<td>
								{trip.duration} {trip.duration <= 1 ? 'day' : 'days'}
							</td>
							<td>{trip.category}</td>
							<td>
								{trip.isReminderPending ? <i className="fa fa-clock-o" /> : null}
							</td>
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

const SortColumn = ({ name, sortKey, onSort, sorting }) => (
	<th onClick={() => onSort(sortKey)}>
		{name}
		<i className="fa fa-sort ml-2" style={{ color: sorting ? '#007bff' : '' }} />
	</th>
);

export default GridPanel;
