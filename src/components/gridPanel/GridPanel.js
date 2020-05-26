import React from 'react';
import { Table } from 'react-bootstrap';

import './GridPanel.css';

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
			sortBy: null,
			sortAsc: null,
			columns: [
				{ name: 'Title', sortKey: 'title' },
				{ name: 'Destination', sortKey: 'destination' },
				{ name: 'Duration', sortKey: 'duration' },
				{ name: 'Category', sortKey: 'category' },
				{ name: 'Reminder Set', sortKey: 'reminder' },
				{ name: 'Completed Items', sortKey: 'todos' },
				{ name: 'Trip State', sortKey: 'status' },
			],
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
		this.setState(({ sortBy, sortAsc }) => ({
			sortBy: sortKey,
			sortAsc: sortBy === sortKey ? !sortAsc : true,
		}));
	};

	sortTrips = (sortAsc, sortBy) => {
		const { trips } = this.props;
		return sortBy
			? [...trips].sort((trip1, trip2) => {
					const data1 = trip1[sortBy];
					const data2 = trip2[sortBy];
					const orderFactor = sortAsc === false ? -1 : 1;

					switch (sortBy) {
						case 'title':
						case 'category':
						case 'destination':
						case 'status':
							return data1.localeCompare(data2) * orderFactor;
						case 'reminder':
							return compareReminders(data1, data2) * orderFactor;
						case 'todos':
							return compareCompleteItems(data1, data2) * orderFactor;
						case 'duration':
							return (data1 - data2) * orderFactor;
						default:
							return 0;
					}
			  })
			: trips;
	};

	render() {
		const { selectTripId } = this.props;
		const { sortAsc, sortBy, columns } = this.state;
		const sortedTrips = this.sortTrips(sortAsc, sortBy);
		return (
			<Table striped bordered hover className="gridPanel">
				<thead>
					<tr>
						{columns.map((column) => (
							<HeaderColumn
								key={column.sortKey}
								name={column.name}
								sortKey={column.sortKey}
								sortAsc={sortAsc}
								sortBy={sortBy}
								onSort={this.onClickSort}
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

const HeaderColumn = ({ name, sortKey, sortAsc, sortBy, onSort }) => {
	let sortIconClass = 'fa-sort';

	if (sortKey === sortBy) {
		sortIconClass = sortAsc === true ? 'fa-sort-asc' : 'fa-sort-desc';
	}

	return (
		<th onClick={() => onSort(sortKey)}>
			{name}
			<i
				className={`fa ml-2 ${sortIconClass}`}
				style={{ color: sortKey === sortBy ? '#007bff' : '' }}
			/>
		</th>
	);
};

export default GridPanel;
