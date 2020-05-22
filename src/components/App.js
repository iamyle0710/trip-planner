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
			displayTrips: [],
			trips: [],
		};
	}

	componentDidMount() {
		// Default sample data for testing the data flow
		const trips = SAMPLE_DATA.map((trip) => new Trip(trip));
		this.setState({
			trips,
			displayTrips: trips,
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

	// Callback function to filter displaying trips
	onFilter = (searchKeyword, filterCategory) => {
		const { trips } = this.state;
		this.setState({
			displayTrips: filterTrips(trips, searchKeyword, filterCategory),
		});
	};

	render() {
		const { displayTrips, selectTrip } = this.state;

		return (
			<Container fluid className="app h-100 d-flex flex-column">
				<Row>
					<div className="header">Trip Planner</div>
				</Row>
				<Row className="flex-fill d-flex content-row">
					<Col md={2} className="content-row">
						<FilterPanel onFilter={this.onFilter} onAddATrip={this.onAddATrip} />
					</Col>
					<Col md={selectTrip ? 5 : 10} className="content-row">
						<GridPanel trips={displayTrips} />
					</Col>
					{selectTrip && (
						<Col md={5} className="content-row">
							<DetailPanel />
						</Col>
					)}
				</Row>
			</Container>
		);
	}
}

export default App;
