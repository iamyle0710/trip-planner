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
		this.id = id || new Date().getTime();
		this.title = title;
		this.category = category;
		this.destination = destination;
		this.description = description;
		this.startDate = new Date(startDate);
		this.endDate = new Date(endDate);
		this.todos = Array.isArray(todos) ? todos.map((todo) => new Todo(todo)) : [];
		this.reminder = new Date(reminder);
		this.status = status;
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

	toData() {
		return {
			id: this.id,
			title: this.title,
			category: this.category,
			destination: this.destination,
			description: this.description,
			startDate: isValidDate(this.startDate) ? this.startDate.toString() : '',
			endDate: isValidDate(this.endDate) ? this.endDate.toString() : '',
			reminder: isValidDate(this.reminder) ? this.reminder.toString() : '',
			status: this.status,
			todos: this.todos.map((todo) => todo.toData()),
		};
	}
}
