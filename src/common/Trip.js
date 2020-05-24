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
		this.startDate = startDate ? new Date(startDate) : null;
		this.endDate = endDate ? new Date(endDate) : null;
		this.todos = Array.isArray(todos) ? todos.map((todo) => new Todo(todo)) : [];
		this.reminder = reminder ? new Date(reminder) : null;
		this.status = status; // active,
	}
}
