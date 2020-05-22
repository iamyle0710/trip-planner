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
			filterCategory: CATEGORY.NONE,
		};
	}

	// Click Go Button to search
	onClickSearch = () => {
		const { onFilter } = this.props;
		const { searchKeyword, filterCategory } = this.state;

		// execute callback function to filter trips
		if (onFilter) {
			onFilter(searchKeyword, filterCategory);
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
		this.setState(
			{
				filterCategory: target.id,
			},
			() => {
				const { searchKeyword, filterCategory } = this.state;
				const { onFilter } = this.props;
				if (onFilter) {
					onFilter(searchKeyword, CATEGORY[filterCategory]);
				}
			}
		);
	};

	render() {
		const { searchKeyword, filterCategory } = this.state;

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
					<Button variant="outline-primary" onClick={this.onClick}>
						Add a Trip
					</Button>
				</div>
				<div className="filter-panel-filter-trip">
					<div className="filter-panel-row-title">Filter By Category</div>
					{Object.keys(CATEGORY).map((category) => (
						<div key={category} className="filter-panel-filter-box">
							<input
								type="radio"
								id={category}
								name="filter-category"
								onChange={this.onClickCategory}
								checked={filterCategory === category}
							/>
							<label htmlFor={category}>{CATEGORY[category]}</label>
						</div>
					))}
				</div>
			</div>
		);
	}
}
export default FilterPanel;
