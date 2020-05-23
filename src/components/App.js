import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

import Trip from '../common/Trip';
import Constant from '../common/Constant';
import { filterTrips } from '../utils/helper';
import FilterPanel from './filterPanel/FilterPanel';
import GridPanel from './gridPanel/GridPanel';
import DetailPanel from './detailPanel/DetailPanel';
import './App.css';

const { SAMPLE_DATA, CATEGORY, TRIP_STATUS } = Constant;

class App extends React.Component {
	constructor() {
		super();
		this.state = {
			selectTrip: null,
			searchKeyword: '',
			filterCategory: CATEGORY.NONE,
			trips: [],
		};
	}

	componentDidMount() {
		// Default sample data for testing the data flow
		const trips = SAMPLE_DATA.map((trip) => new Trip(trip));
		this.setState({
			trips,
		});
	}

	// Callback function to add a new trip
	onAddATrip = () => {
		const newTrip = new Trip({
			category: CATEGORY.NONE,
			status: TRIP_STATUS.CREATED,
		});

		this.setState({
			selectTrip: newTrip,
		});
	};

	// Callback function to change search keyword
	onChangeSearchKeyword = (searchKeyword) => {
		this.setState({
			searchKeyword,
		});
	};

	// Callback function to change filter category
	onChangeFilterCategory = (filterCategory) => {
		this.setState({
			filterCategory,
		});
	};

	// Callback function to cancel editing a form
	onCancelEdit = () => {
		this.setState({
			selectTrip: null,
		});
	};

	onSaveEdit = (tripData) => {
		const isNewTrip = isNaN(tripData.id);
		const tripId = isNewTrip ? new Date().getTime().toString() : tripData.id;

		this.setState(({ trips }) => ({
			trips: !isNewTrip
				? trips.map((trip) => {
						if (trip.id === tripId) {
							return new Trip(tripData);
						}
						return trip;
				  })
				: [...trips, new Trip({ ...tripData, id: tripId })],
		}));
	};

	render() {
		const { trips, selectTrip, searchKeyword, filterCategory } = this.state;
		const displayTrips = filterTrips(trips, searchKeyword, filterCategory);

		return (
			<Container fluid className="app h-100 d-flex flex-column">
				<Row>
					<div className="header">Trip Planner</div>
				</Row>
				<Row className="flex-fill d-flex content-row">
					<Col md={2} className="content-row">
						<FilterPanel
							filterCategory={filterCategory}
							onChangeSearchKeyword={this.onChangeSearchKeyword}
							onChangeFilterCategory={this.onChangeFilterCategory}
							onAddATrip={this.onAddATrip}
						/>
					</Col>
					<Col md={selectTrip ? 5 : 10} className="content-row">
						<GridPanel trips={displayTrips} />
					</Col>
					{selectTrip && (
						<Col md={5} className="content-row">
							<DetailPanel
								trip={selectTrip}
								onCancelEdit={this.onCancelEdit}
								onSaveEdit={this.onSaveEdit}
							/>
						</Col>
					)}
				</Row>
			</Container>
		);
	}
}

export default App;
