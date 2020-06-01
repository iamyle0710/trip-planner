import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { v4 as uuidv4 } from 'uuid';

import Trip from '../common/Trip';
import FakeServer from '../common/FakeServer';
import Constant from '../common/Constant';
import { filterTrips } from '../utils/helper';
import FilterPanel from './filterPanel/FilterPanel';
import GridPanel from './gridPanel/GridPanel';
import DetailPanel from './detailPanel/DetailPanel';
import ReminderModal from './modal/ReminderModal';
import './App.css';

const { CATEGORY } = Constant;

class App extends React.Component {
	constructor() {
		super();
		this.state = {
			selectTrip: null,
			searchKeyword: '',
			filterCategory: CATEGORY.NONE,
			reminderTrip: null,
			trips: [],
		};

		this.reminderTimeId = null;
	}

	componentDidMount() {
		// fetch data and convert to Trip models
		const trips = FakeServer.loadTrips().map((data) => new Trip(data));

		this.setState({ trips }, this.processTrips);
	}

	componentWillUnmount() {
		const { trips } = this.state;
		FakeServer.saveTrips(trips);
	}

	processTrips = () => {
		const { trips } = this.state;
		const reminderTrips = trips
			.filter(({ isReminderPending }) => isReminderPending === true)
			.sort((trip1, trip2) => trip1.reminder.getTime() - trip2.reminder.getTime());
		const reminderTrip = reminderTrips[0];
		const remainTime = reminderTrip
			? reminderTrip.reminder.getTime() - new Date().getTime()
			: 0;

		this.setState({
			reminderTrip: null,
		});

		if (this.reminderTimeId) {
			clearTimeout(this.reminderTimeId);
			this.reminderTimeId = null;
		}

		if (reminderTrip) {
			this.reminderTimeId = setTimeout(() => {
				this.setState({ reminderTrip });
			}, remainTime);
		}
	};

	snoozeTripReminder = (tripId, snoozeTime) => {
		const { trips } = this.state;
		const newTrips = trips.map((trip) => {
			if (trip.id === tripId) {
				trip.reminder = new Date(trip.reminder.getTime() + snoozeTime);
				return trip;
			}
			return trip;
		});
		this.setState({ trips: newTrips }, this.processTrips);

		// Save the trip with updated reminder time to local storage
		FakeServer.saveTrips(newTrips);
	};

	// Callback function to add a new trip
	onAddATrip = () => {
		this.setState({
			selectTrip: new Trip({}),
		});
	};

	// Callback function to change search keyword
	onChangeFilter = (searchKeyword, filterCategory) => {
		this.setState({
			searchKeyword,
			filterCategory,
		});
	};

	// Callback function to change search keyword
	onChangeSearchKeyword = (searchKeyword) => {
		this.setState({
			searchKeyword,
		});
	};

	// Callback function to cancel editing a form
	onCancelEdit = () => {
		this.setState({
			selectTrip: null,
		});
	};

	// Check detail callback in reminder modal
	onClickDetailButton = (id) => {
		const { trips } = this.state;
		const selectTrip = trips.find((trip) => trip.id === id);

		this.setState(
			{
				trips: trips.map((trip) => {
					if (trip.id === id) {
						trip.isReminderPending = false;
					}
					return trip;
				}),
				reminderTrip: null,
				selectTrip,
			},
			this.processTrips
		);
	};

	// Close reminder popup modal
	onHideReminderModal = () => {
		this.setState(
			({ trips, reminderTrip }) => ({
				trips: trips.map((trip) => {
					if (trip.id === reminderTrip.id) {
						trip.isReminderPending = false;
					}
					return trip;
				}),
				reminderTrip: null,
			}),
			this.processTrips
		);
	};

	// Remove the trip
	onRemoveTrip = (id) => {
		const { trips } = this.state;
		const newTrips = trips.filter((trip) => trip.id !== id);

		this.setState(
			{
				trips: newTrips,
				selectTrip: null,
			},
			this.processTrips
		);

		FakeServer.saveTrips(newTrips);
	};

	// Callback function to save the edited trip data
	onSaveEdit = (tripData) => {
		const { trips } = this.state;
		const newTrip = !tripData.id ? new Trip({ ...tripData, id: uuidv4() }) : new Trip(tripData);
		const newTrips = !tripData.id
			? [...trips, newTrip]
			: trips.map((trip) => {
					if (trip.id === tripData.id) {
						return newTrip;
					}
					return trip;
			  });

		this.setState(
			{
				trips: newTrips,
				selectTrip: null,
			},
			this.processTrips
		);

		FakeServer.saveTrips(newTrips);
	};

	// Callback function to select a trip to edit
	onSelectTrip = (id) => {
		const { trips } = this.state;
		const selectTrip = trips.find((trip) => trip.id === id);
		this.setState({ selectTrip });
	};

	render() {
		const { trips, reminderTrip, selectTrip, searchKeyword, filterCategory } = this.state;
		const displayTrips = filterTrips(trips, searchKeyword, filterCategory);
		const selectTripId = selectTrip ? selectTrip.id : '';

		return (
			<Container fluid className="app h-100 d-flex flex-column">
				<Row>
					<div className="header">Trip Planner</div>
				</Row>
				<Row className="flex-fill d-flex content-row">
					<Col sm={12} md={3} lg={2} className="content-row">
						<FilterPanel
							filterCategory={filterCategory}
							onChangeSearchKeyword={this.onChangeSearchKeyword}
							onChangeFilter={this.onChangeFilter}
							onAddATrip={this.onAddATrip}
						/>
					</Col>
					<Col
						sm={12}
						md={selectTrip ? 5 : 9}
						lg={selectTrip ? 6 : 10}
						className="content-row"
					>
						<GridPanel
							trips={displayTrips}
							onSelectTrip={this.onSelectTrip}
							selectTripId={selectTripId}
						/>
					</Col>
					{selectTrip && (
						<Col sm={12} md={4} lg={4} className="content-row">
							<DetailPanel
								key={selectTrip.id}
								trip={selectTrip}
								onCancelEdit={this.onCancelEdit}
								onSaveEdit={this.onSaveEdit}
								onRemoveTrip={this.onRemoveTrip}
							/>
						</Col>
					)}
				</Row>
				{reminderTrip && (
					<ReminderModal
						trip={reminderTrip}
						onHide={this.onHideReminderModal}
						snoozeTripReminder={this.snoozeTripReminder}
						onClickDetailButton={this.onClickDetailButton}
					/>
				)}
			</Container>
		);
	}
}

export default App;
