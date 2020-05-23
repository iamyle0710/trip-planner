export default class Todo {
	constructor({ id, name, isComplete }) {
		this.id = id || new Date().getTime();
		this.name = name || '';
		this.isComplete = isComplete === true;
	}

	setStatus(isComplete) {
		this.isComplete = isComplete;
	}

	toData() {
		return {
			id: this.id,
			name: this.name,
			isComplete: this.isComplete,
		};
	}
}
