import React from 'react';
import { Button } from 'react-bootstrap';

import './FilterPanel.css';
import Constant from '../../common/Constant';

const { CATEGORY } = Constant;

class FilterPanel extends React.Component {
	constructor() {
		super();
		this.state = {
			searchKeyword: '',
		};
	}

	// Click Go Button to search
	onClickSearch = () => {
		const { onChangeSearchKeyword } = this.props;
		const { searchKeyword } = this.state;

		// execute callback function to filter trips
		if (onChangeSearchKeyword) {
			onChangeSearchKeyword(searchKeyword);
		}
	};

	// Click to add a new trip
	onClickNewTrip = () => {
		const { onAddATrip } = this.props;
		// execute callback function to add a new trip
		if (onAddATrip) {
			onAddATrip();
		}
	};

	// Search keyword
	onSearchChange = ({ target }) => {
		this.setState({
			searchKeyword: target.value,
		});
	};

	// Filter categories
	onClickCategory = ({ target }) => {
		const { onChangeFilter } = this.props;
		const { searchKeyword } = this.state;

		if (onChangeFilter) {
			onChangeFilter(searchKeyword, CATEGORY[target.id]);
		}
	};

	render() {
		const { searchKeyword } = this.state;
		const { filterCategory } = this.props;

		return (
			<div className="filter-panel d-flex">
				<div className="filter-panel-search-box">
					<input
						type="text"
						placeholder="search..."
						value={searchKeyword}
						onChange={this.onSearchChange}
					/>
					<Button variant="primary" onClick={this.onClickSearch}>
						Go
					</Button>
				</div>
				<div className="filter-panel-add-trip">
					<Button variant="outline-primary" onClick={this.onClickNewTrip}>
						Add a Trip
					</Button>
				</div>
				<div className="filter-panel-filter-trip">
					<div className="filter-panel-row-title">Filter By Category</div>
					{Object.keys(CATEGORY).map((type) => (
						<div key={type} className="filter-panel-filter-box">
							<input
								type="radio"
								id={type}
								name="filter-category"
								onChange={this.onClickCategory}
								checked={filterCategory === CATEGORY[type]}
							/>
							<label htmlFor={type}>{CATEGORY[type]}</label>
						</div>
					))}
				</div>
			</div>
		);
	}
}
export default FilterPanel;
