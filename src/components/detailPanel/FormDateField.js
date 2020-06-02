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
			isError,
			isTouched,
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
					className={required && isTouched && !value && isError ? 'is-invalid' : ''}
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
	isError,
	minDate,
	maxDate,
	required,
	invalidMessage,
	label,
}) => {
	const timeInputLabel = showTime === true ? 'Time:' : '';
	const dateFormat = `MM/dd/yyyy${showTime === true ? ' hh:mm aa' : ''}`;
	const [isTouched, setIsTouched] = useState(false);
	const [isChecked, setIsChecked] = useState(showTime && value !== null);

	const onCalendarClose = () => {
		setIsTouched(true);
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

	const onBlurDateField = () => {
		setIsTouched(true);
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
							isError={isError}
							isTouched={isTouched}
							min={minDate}
						/>
					}
					minDate={minDate}
					maxDate={maxDate}
					onCalendarClose={onCalendarClose}
					onChange={onChangeDateField}
					onBlur={onBlurDateField}
					className="form-control form-control-sm"
				/>
			)}
		</>
	);
};

export default FormDateField;
