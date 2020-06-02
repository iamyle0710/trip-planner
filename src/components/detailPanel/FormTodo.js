import React, { useState } from 'react';
import { ListGroup, InputGroup, Form, Button } from 'react-bootstrap';

const FormTodo = ({ id, isComplete, name, placeholder, onRemoveTodo, onChangeTodo }) => {
	const [isTouched, setIsTouched] = useState(false);

	const onBlur = () => {
		setIsTouched(true);
	};

	const onChange = ({ target }) => {
		const key = target.name;
		const value = key === 'name' ? target.value : target.checked;

		if (onChangeTodo) {
			onChangeTodo(id, key, value);
		}
	};

	const onClickTrashIcon = () => {
		if (onRemoveTodo) {
			onRemoveTodo(id);
		}
	};

	return (
		<ListGroup.Item key={id} className="detail-panel-trip-form-todoListItem">
			<InputGroup>
				<InputGroup.Prepend>
					<InputGroup.Checkbox
						aria-label="Checkbox for following text input"
						checked={isComplete}
						name="isComplete"
						onChange={onChange}
					/>
				</InputGroup.Prepend>
				<Form.Control
					required
					size="sm"
					type="text"
					placeholder={placeholder}
					name="name"
					value={name}
					onBlur={onBlur}
					className={isTouched && !name ? 'is-invalid' : ''}
					onChange={onChange}
				/>
				<InputGroup.Append>
					<Button size="sm" variant="danger" onClick={onClickTrashIcon}>
						<i className="fa fa-trash-o" style={{ color: '#fff' }} />
					</Button>
				</InputGroup.Append>
				<Form.Control.Feedback type="invalid">
					Please type todo item names
				</Form.Control.Feedback>
			</InputGroup>
		</ListGroup.Item>
	);
};

export default FormTodo;
