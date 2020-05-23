import React, { forwardRef } from 'react';
import DatePicker from 'react-datepicker';

import 'react-datepicker/dist/react-datepicker.css';
import './CalendarWidget.css';

const CustomInput = forwardRef((props, ref) => (
	<input
		className="form-control form-control-sm"
		value={props.value}
		onClick={props.onClick}
		onChange={props.onChange}
	/>
));

CustomInput.displayName = 'CustomInput';

const CalenderWidget = ({ showTime, value, name, onChange }) => {
	const timeInputLabel = showTime === true ? 'Time:' : '';
	const dateFormat = `MM/dd/yyyy${showTime === true ? ' h:mm aa' : ''}`;

	return (
		<DatePicker
			selected={value}
			customInput={<CustomInput />}
			dateFormat={dateFormat}
			timeInputLabel={timeInputLabel}
			showTimeInput={showTime === true}
			onChange={(newDate) => onChange(name, newDate)}
			className="calendar-widget"
		/>
	);
};

export default CalenderWidget;
