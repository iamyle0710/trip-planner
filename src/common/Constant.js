const CATEGORY = {
	NONE: 'NONE',
	BuSINESS: 'BuSINESS',
	VACATION: 'VACATION',
};

const SAMPLEDATA = [
	{
		id: 0,
		title: 'go to lax',
		destination: 'LAX',
		description: 'here goes the description',
		startDate: '2020-05-20',
		endDate: '2020-05-25',
		category: 'VACATION',
		reminder: '2020-05-22T04:00:00.000Z',
		status: 'CREATED',
		todos: [
			{
				id: 1,
				name: 'todo 1',
				isComplete: false,
			},
			{
				id: 2,
				name: 'todo 2',
				isComplete: false,
			},
		],
	},
	{
		id: 1,
		title: 'go to taiwan',
		destination: 'Taiwan',
		description: 'here goes the description',
		startDate: '2020-05-20',
		endDate: '2020-05-25',
		category: 'VACATION',
		reminder: '2020-05-22T04:00:00.000Z',
		status: 'CREATED',
		todos: [
			{
				id: 1,
				name: 'todo 1',
				isComplete: false,
			},
			{
				id: 2,
				name: 'todo 2',
				isComplete: false,
			},
		],
	},
	{
		id: 2,
		title: 'go to Houston',
		destination: 'Houston',
		description: 'here goes the description',
		startDate: '2020-05-20',
		endDate: '2020-05-25',
		category: 'BuSINESS',
		reminder: '2020-05-22T04:00:00.000Z',
		status: 'CREATED',
		todos: [
			{
				name: 'todo 1',
				isComplete: false,
			},
			{
				name: 'todo 2',
				isComplete: false,
			},
		],
	},
];

export default {
	CATEGORY,
	SAMPLEDATA,
};
