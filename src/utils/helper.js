import Constant from '../common/Constant';

const { CATEGORY } = Constant;

export const filterTrips = (trips = [], searchKeyword = '', filterCategory = CATEGORY.NONE) =>
	trips.filter((trip) => {
		const keyword = searchKeyword.toLowerCase();
		const isCategoryMatched =
			filterCategory === CATEGORY.NONE || trip.category === filterCategory;
		const isSearchMatched =
			[...trip.todos.map((todo) => todo.name), trip.title, trip.destination].findIndex(
				(str) => str.toLowerCase().indexOf(keyword) !== -1
			) !== -1;

		return isCategoryMatched && isSearchMatched;
	});

export const isValidDate = (date) => date instanceof Date && !isNaN(date);
