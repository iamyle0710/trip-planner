export default class Todo {
	constructor({ id, name, isComplete }) {
		this.id = id || new Date().getTime();
		this.name = name || '';
		this.isComplete = isComplete === true;
	}
}
