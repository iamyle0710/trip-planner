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

const SNOOZE = {
	TEN_SECS: { name: '10 seconds', value: 10 * 1000 },
	FIVE_MINS: { name: '5 minutes', value: 60 * 5 * 1000 },
	FIFTEEN_MINS: { name: '15 minutes', value: 60 * 15 * 1000 },
	THIRTY_MINS: { name: '30 minutes', value: 60 * 30 * 1000 },
	ONE_HOUR: { name: '1 hour', value: 60 * 60 * 1 * 1000 },
	SIX_HOURS: { name: '6 hours', value: 60 * 60 * 6 * 1000 },
	TWELEVE_HOURS: { name: '12 hours', value: 60 * 60 * 12 * 1000 },
};

const SAMPLE_DATA = [
	{
		id: '0',
		title: 'go to lax',
		destination: 'LAX',
		description: 'here goes the description',
		startDate: '2020/05/20',
		endDate: '2020/05/25',
		category: 'Vacation',
		reminder: '5/24/2020 2:39:30 PM',
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
		startDate: '2020/05/20',
		endDate: '2020/05/25',
		category: 'Vacation',
		reminder: '5/24/2020 2:57:50 PM',
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
		reminder: '5/25/2020 2:11:36 PM',
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
	SNOOZE,
	TRIP_STATUS,
};
