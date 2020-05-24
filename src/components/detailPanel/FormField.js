import React, { useState } from 'react';
import { Form } from 'react-bootstrap';

const FormField = ({
	as,
	label,
	required,
	type,
	placeholder,
	value,
	name,
	onChangeField,
	invalidMessage,
	children,
}) => {
	const [isValid, setIsValid] = useState(null);

	const onBlur = ({ currentTarget }) => {
		setIsValid(currentTarget.checkValidity());
	};

	const onChange = ({ target }) => {
		onChangeField(target.name, target.value);
	};

	return (
		<>
			<Form.Label>{label}</Form.Label>
			<Form.Control
				required={required}
				size="sm"
				as={as}
				type={type}
				placeholder={placeholder}
				value={value}
				name={name}
				className={isValid === false ? 'is-invalid' : ''}
				onBlur={onBlur}
				onChange={onChange}
			>
				{children}
			</Form.Control>

			<Form.Control.Feedback type="invalid">{invalidMessage}</Form.Control.Feedback>
		</>
	);
};

export default FormField;
