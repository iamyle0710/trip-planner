import React, { useState } from 'react';
import { Form } from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

import './FormDateField.css';

class CustomInput extends React.Component {
	render() {
		const {
			required,
			value,
			onClick,
			onChange,
			onBlur,
			invalidMessage,
			isValid,
			min,
		} = this.props;

		return (
			<Form.Group>
				<Form.Control
					required={required}
					size="sm"
					value={value}
					onClick={onClick}
					onChange={onChange}
					onBlur={onBlur}
					min={min}
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
	const dateFormat = `MM/dd/yyyy${showTime === true ? ' hh:mm aa' : ''}`;
	const [isValid, setIsValid] = useState(null);
	const [isChecked, setIsChecked] = useState(showTime && value !== null);
	const [dateFieldTarget, setDateFieldTarget] = useState(null);

	const onCalendarClose = () => {
		if (dateFieldTarget) {
			setIsValid(dateFieldTarget.checkValidity());
		}
	};

	const onChangeDateField = (newDate) => {
		onChangeField(name, newDate);
	};

	const onChangeCheckStatus = ({ currentTarget }) => {
		const { checked } = currentTarget;
		const newDate = checked ? minDate : null;

		setIsChecked(checked);
		onChangeDateField(newDate);
	};

	const onBlurDateField = ({ currentTarget }) => {
		if (!dateFieldTarget) {
			setDateFieldTarget(currentTarget);
		}
		setIsValid(currentTarget.checkValidity());
	};

	return (
		<>
			<Form.Label>
				{label}
				{showTime && (
					<input
						type="checkbox"
						className="ml-2"
						checked={isChecked}
						onChange={onChangeCheckStatus}
					/>
				)}
			</Form.Label>
			{(isChecked || !showTime) && (
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
							min={minDate}
						/>
					}
					minDate={minDate}
					maxDate={maxDate}
					onCalendarClose={onCalendarClose}
					onChange={onChangeDateField}
					onBlur={onBlurDateField}
					className={`form-control form-control-sm ${
						isValid === false ? 'is-invalid' : ''
					} `}
				/>
			)}
		</>
	);
};

export default FormDateField;
