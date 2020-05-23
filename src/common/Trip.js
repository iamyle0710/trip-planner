import Todo from './Todo';
import { isValidDate } from '../utils/helper';

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

	addTodo = (data) => {
		const todo = new Todo(data);
		this.todos.push(todo);
	};

	removeTodo = ({ id }) => {
		const index = this.todos.findIndex((todo) => todo.id === id);
		if (index !== -1) {
			this.todos.splice(index, 1);
		}
	};
}
