export default class Todo {
	constructor(id, name, isComplete) {
		this.id = id;
		this.name = name;
		this.isComplete = isComplete;
	}

	setStatus(isComplete) {
		this.isComplete = isComplete;
	}
}
