import React, { useState } from 'react';
import { Form } from 'react-bootstrap';
import DatePicker from 'react-datepicker';

import 'react-datepicker/dist/react-datepicker.css';
import './FormDateField.css';

class CustomInput extends React.Component {
	constructor(props) {
		super(props);
	}

	onBlur = ({ currentTarget }) => {
		const { setIsValid, dateFieldTarget, setDateFieldTarget } = this.props;
		if (!dateFieldTarget) {
			setDateFieldTarget(currentTarget);
		}
		setIsValid(currentTarget.checkValidity());
	};

	render() {
		const { required, value, onClick, onChange, invalidMessage, isValid } = this.props;

		return (
			<Form.Group>
				<Form.Control
					required={required}
					size="sm"
					value={value}
					onClick={onClick}
					onChange={onChange}
					onBlur={this.onBlur}
					className={isValid === false ? 'is-invalid' : ''}
				/>
				<Form.Control.Feedback type="invalid">{invalidMessage}</Form.Control.Feedback>
			</Form.Group>
		);
	}
}

const FormDateField = ({
	showTime,
	value,
	name,
	onChangeField,
	minDate,
	maxDate,
	required,
	invalidMessage,
	label,
}) => {
	const timeInputLabel = showTime === true ? 'Time:' : '';
	const dateFormat = `MM/dd/yyyy${showTime === true ? ' h:mm aa' : ''}`;
	const [isValid, setIsValid] = useState(null);
	const [dateFieldTarget, setDateFieldTarget] = useState(null);

	const onCalendarClose = () => {
		if (dateFieldTarget) {
			setIsValid(dateFieldTarget.checkValidity());
		}
	};

	const onChangeDateField = (newDate) => {
		onChangeField(name, newDate);
	};

	return (
		<>
			<Form.Label>{label}</Form.Label>
			<DatePicker
				required={required}
				selected={value}
				dateFormat={dateFormat}
				timeInputLabel={timeInputLabel}
				showTimeInput={showTime === true}
				customInput={
					<CustomInput
						invalidMessage={invalidMessage}
						isValid={isValid}
						setIsValid={setIsValid}
						dateFieldTarget={dateFieldTarget}
						setDateFieldTarget={setDateFieldTarget}
					/>
				}
				minDate={minDate}
				maxDate={maxDate}
				onCalendarClose={onCalendarClose}
				onChange={onChangeDateField}
				className={`form-control form-control-sm ${isValid === false ? 'is-invalid' : ''} `}
			/>
		</>
	);
};

export default FormDateField;
