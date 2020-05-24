const CATEGORY = {
	NONE: 'None',
	BUSINESS: 'Business',
	VACATION: 'Vacation',
};

const TRIP_STATUS = {
	CREATED: 'Created',
	IN_PROGRESS: 'In Progress',
	READY: 'Ready',
};

const SAMPLE_DATA = [
	{
		id: '0',
		title: 'go to lax',
		destination: 'LAX',
		description: 'here goes the description',
		startDate: '2020-05-20',
		endDate: '2020-05-25',
		category: 'Vacation',
		reminder: '2020-05-27T04:00:00.000Z',
		status: 'Created',
		todos: [
			{
				id: '1',
				name: 'todo 1',
				isComplete: false,
			},
			{
				id: '2',
				name: 'todo 2',
				isComplete: false,
			},
		],
	},
	{
		id: '1',
		title: 'go to taiwan',
		destination: 'Taiwan',
		description: 'here goes the description',
		startDate: '2020-05-20',
		endDate: '2020-05-25',
		category: 'Vacation',
		reminder: '2020-05-28T04:00:00.000Z',
		status: 'Created',
		todos: [
			{
				id: '1',
				name: 'todo 1',
				isComplete: false,
			},
			{
				id: '2',
				name: 'todo 2',
				isComplete: false,
			},
		],
	},
	{
		id: '2',
		title: 'go to Houston',
		destination: 'Houston',
		description: 'here goes the description',
		startDate: '2020-05-20',
		endDate: '2020-05-25',
		category: 'Business',
		reminder: '2020-05-30T04:00:00.000Z',
		status: 'Created',
		todos: [
			{
				id: '1',
				name: 'todo 1',
				isComplete: true,
			},
			{
				id: '2',
				name: 'todo 2',
				isComplete: true,
			},
		],
	},
];

export default {
	CATEGORY,
	SAMPLE_DATA,
	TRIP_STATUS,
};
