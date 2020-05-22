import React, { forwardRef } from 'react';
import DatePicker from 'react-datepicker';

import 'react-datepicker/dist/react-datepicker.css';
import './CalendarWidget.css';

const CustomInput = forwardRef((props) => (
	<input
		className="form-control form-control-sm"
		value={props.value}
		onClick={props.onClick}
		onChange={props.onChange}
	/>
));

CustomInput.displayName = 'CustomInput';

const CalenderWidget = ({ showTime, date, field, changeFieldCallback }) => {
	const timeInputLabel = showTime === true ? 'Time:' : '';
	const dateFormat = `MM/dd/yyyy${showTime === true ? ' h:mm aa' : ''}`;

	return (
		<DatePicker
			selected={date || new Date()}
			customInput={<CustomInput />}
			dateFormat={dateFormat}
			timeInputLabel={timeInputLabel}
			showTimeInput={showTime === true}
			onChange={(newDate) => changeFieldCallback(field, newDate)}
			className="calendar-widget"
		/>
	);
};

export default CalenderWidget;
