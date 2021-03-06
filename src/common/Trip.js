import { isValidDate, getDuration } from '../utils/helper';
import Todo from './Todo';
import Constant from './Constant';

const { TRIP_STATUS, CATEGORY } = Constant;

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
		const reminderDate = new Date(reminder);

		this.id = id;
		this.title = title;
		this.category = category || CATEGORY.NONE;
		this.destination = destination;
		this.description = description;
		this.startDate = startDate ? new Date(startDate) : null;
		this.endDate = endDate ? new Date(endDate) : null;
		this.todos = Array.isArray(todos) ? todos.map((todo) => new Todo(todo)) : [];
		this.duration = getDuration(this.startDate, this.endDate);
		this.reminder =
			isValidDate(reminderDate) && reminderDate > new Date() ? reminderDate : null;
		this.isReminderPending =
			isValidDate(reminderDate) && reminderDate.getTime() - new Date().getTime() > 0;
		this.status = status || TRIP_STATUS.CREATED;
	}
}
