import { v4 as uuidv4 } from 'uuid';

export default class Todo {
	constructor({ id, name, isComplete }) {
		this.id = id || uuidv4();
		this.name = name || '';
		this.isComplete = isComplete === true;
	}
}
