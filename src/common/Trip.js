import Todo from './Todo';

export default class Trip {
	constructor({
		id,
		title,
		category,
		destination,
		description,
		startDate,
		endDate,
		todos,
		reminder,
		status,
	}) {
		this.id = id;
		this.title = title;
		this.category = category;
		this.destination = destination;
		this.description = description;
		this.startDate = startDate ? new Date(startDate) : new Date();
		this.endDate = endDate ? new Date(endDate) : new Date();
		this.todos = Array.isArray(todos) ? todos.map((todo) => new Todo(todo)) : [];
		this.reminder = reminder ? new Date(reminder) : '';
		this.status = status; // active,
	}
}
