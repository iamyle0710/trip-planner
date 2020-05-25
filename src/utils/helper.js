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

export const isValidDate = (date) => date instanceof Date && !isNaN(date.getTime());

export const getDuration = (start, end) => {
	const startDate = new Date(start);
	const endDate = new Date(end);

	if (isValidDate(startDate) && isValidDate(endDate) && endDate > startDate) {
		return Math.floor((endDate.getTime() - startDate.getTime()) / (24 * 60 * 60 * 1000)) + 1;
	}

	return 0;
};
