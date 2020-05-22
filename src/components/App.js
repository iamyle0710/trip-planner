import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

import FilterPanel from './filterPanel/FilterPanel';
import GridPanel from './gridPanel/GridPanel';
import DetailPanel from './detailPanel/DetailPanel';
import './App.css';

class App extends React.Component {
	constructor() {
		super();
		this.state = {
			selectTrip: null,
			trips: [],
		};
	}

	render() {
		const { trips, selectTrip } = this.state;

		return (
			<Container fluid className="app h-100 d-flex flex-column">
				<Row>
					<div className="header">Trip Planner</div>
				</Row>
				<Row className="flex-fill d-flex content-row">
					<Col md={2} className="content-row">
						<FilterPanel />
					</Col>
					<Col md={selectTrip ? 5 : 10} className="content-row">
						<GridPanel />
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
