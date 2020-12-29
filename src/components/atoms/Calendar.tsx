import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import moment from 'moment';
import DatePicker from 'react-date-picker';
// import 'react-datepicker/dist/react-datepicker.css';
// import ko from 'date-fns/locale/ko';

import GlobalStyled from '../../style/GlobalStyled';

const Styled = {
	Body: styled.div`
		display: flex;
		width: 100%;
	`,
	Wrapper: styled.div<{ css?: any }>`
		display: flex;
		font-size: 1.5rem;
		flex-direction: column;
		padding: 0.5rem;

		.react-date-picker__calendar {
			z-index: 20;
		}
		.react-date-picker__calendar-button {
			padding: 0;
			padding-left: 0.5rem;
			:focus {
				outline: none;
			}
		}
		${props => props.css};
	`,

	Icon: styled.img`
		width: 1.5rem;
	`,

	MarginLeft: styled.div`
		margin: 0px 1rem;
	`,

	DatePickerWrapper: styled.div`
		.react-date-picker__wrapper {
			border: 0px;
		}
	`,
};

interface CalendarInterface {
	info: {
		startDate: Date;
		endDate: Date;
	};
	type: string;
	onChange: Function;
	required: boolean;
	name: string;
	minDate: Date;
	children: any;
	css: any;
	dateFormats: {
		time: string;
		day: string;
		month: string;
		year: string;
	};
}

const formatMaxDate = new Date(new Date().setDate(new Date().getDate() - 1));

const Calendar = (props: CalendarInterface) => {
	const {
		info,
		type,
		onChange,
		minDate,
		required,
		name,
		css,
		children,
		dateFormats,
	} = props;

	const [isHoverLeftIcon, setIsHoverLeftIcon] = useState(false);
	const [isHoverRightIcon, setIsHoverRightIcon] = useState(false);

	const [dateFormat, setDateFormat] = useState('y-MM-dd');
	const [minDetail, setMinDetail] = useState<
		'month' | 'century' | 'year' | 'decade'
	>('month');
	const [maxDetail, setMaxDetail] = useState<
		'month' | 'century' | 'year' | 'decade'
	>('month');

	const [maxDate, setMaxDate] = useState(formatMaxDate);

	useEffect(() => {
		const { time, day, month, year } = dateFormats;
		if (type === 'time') {
			setDateFormat(time);
			setMinDetail('century');
			setMaxDetail('month');
			setMaxDate(formatMaxDate);
		} else if (type === 'day') {
			setDateFormat(day);
			setMinDetail('century');
			setMaxDetail('month');
			setMaxDate(formatMaxDate);
		} else if (type === 'month') {
			setDateFormat(month);
			setMinDetail('century');
			setMaxDetail('year');
			setMaxDate(formatMaxDate);
		} else if (type === 'year') {
			setDateFormat(year);
			setMinDetail('century');
			setMaxDetail('decade');
			setMaxDate(formatMaxDate);
		} else {
			setMaxDate(info.endDate);
		}
	}, [type, info, dateFormats]);

	const onChangeEndDate = (endDate: object) => {
		const startDateFormatMath = moment(info.startDate).format('YYYYMMDD');
		const endDateFormatMath = moment(endDate).format('YYYYMMDD');

		let resultEndDate = endDate;

		if (type === 'day') {
			let startDateFormatDay = new Date(info.startDate);
			startDateFormatDay.setMonth(startDateFormatDay.getMonth() + 1); //1달 추가한 시작날짜

			const startDayFormatMath = moment(startDateFormatDay).format(
				'YYYYMMDD',
			);

			if (startDayFormatMath < endDateFormatMath) {
				alert('1개월 단위로만 검색하실수 있습니다');
				resultEndDate = startDateFormatDay;
			}
		} else if (type === 'month') {
			let startMonthFormatMonth = new Date(info.startDate);
			startMonthFormatMonth.setFullYear(
				startMonthFormatMonth.getFullYear() + 1,
			); //1년 추가한 시작날짜

			const startMonthFormatMath = moment(startMonthFormatMonth).format(
				'YYYYMM',
			);

			if (startMonthFormatMath < endDateFormatMath) {
				alert('1년 단위로만 검색하실수 있습니다');
				resultEndDate = startMonthFormatMonth;
			}
		} else if (type === 'year') {
		}

		if (startDateFormatMath > endDateFormatMath) {
			onChange({
				startDate: resultEndDate,
				endDate: resultEndDate,
			});
		} else {
			onChange({
				...info,
				endDate: resultEndDate,
			});
		}
	};

	const onChangeStartDate = (startDate: object) => {
		if (type === 'birthDate') {
			onChange(startDate);
		} else {
			const startMonthFormatMath = moment(startDate).format('YYYYMMDD');
			const endDateFormatMath = moment(info.endDate).format('YYYYMMDD');

			if (startMonthFormatMath > endDateFormatMath) {
				onChange({
					endDate: startDate,
					startDate: startDate,
				});
			} else {
				onChange({
					...info,
					startDate: startDate,
				});
			}
		}
	};

	const onHoverLeftIcon = () => {
		setIsHoverLeftIcon(!isHoverLeftIcon);
	};

	const onHoverRightIcon = () => {
		setIsHoverRightIcon(!isHoverRightIcon);
	};

	return (
		<Styled.Body>
			<Styled.Wrapper css={css}>
				<GlobalStyled.Row>
					<>
						<Styled.DatePickerWrapper>
							<DatePicker
								name={name}
								value={info.startDate}
								onChange={onChangeStartDate}
								required={required}
								clearIcon={null}
								calendarIcon={
									<Styled.Icon
										src={
											isHoverLeftIcon
												? require('images/ic-down-cursor.svg')
														.default
												: require('images/ic-down-cursor.svg')
														.default
										}
										onMouseEnter={onHoverLeftIcon}
										onMouseLeave={onHoverLeftIcon}
									/>
								}
								format={dateFormat}
								minDate={minDate}
								maxDate={maxDate}
								minDetail={minDetail}
								maxDetail={maxDetail}
							/>
						</Styled.DatePickerWrapper>
						{type === 'time' ? (
							''
						) : (
							<Styled.DatePickerWrapper>
								<DatePicker
									value={info.endDate}
									onChange={onChangeEndDate}
									required={required}
									clearIcon={null}
									calendarIcon={
										<Styled.Icon
											src={
												isHoverRightIcon
													? require('images/ic-down-cursor.svg')
															.default
													: require('images/ic-down-cursor.svg')
															.default
											}
											onMouseEnter={onHoverRightIcon}
											onMouseLeave={onHoverRightIcon}
										/>
									}
									format={dateFormat}
									minDate={minDate}
									maxDate={new Date()}
									minDetail={minDetail}
									maxDetail={maxDetail}
								/>
							</Styled.DatePickerWrapper>
						)}
					</>
				</GlobalStyled.Row>
				{children}
			</Styled.Wrapper>
		</Styled.Body>
	);
};
Calendar.defaultProps = {
	name: '',
	info: {
		startDate: new Date(moment().format('YYYY-MM-DD')),
		endDate: new Date(moment().format('YYYY-MM-DD')),
	},
	type: 'time',
	required: false,
	minDate: new Date(2020, 11, 1, 0, 0, 0, 0),
	onChange: function () {},
	children: '',
	css: '',
	dateFormats: {
		time: 'y년 MM월 dd일',
		day: 'y년 MM월 dd일',
		month: 'y년 MM월',
		year: 'y년',
	},
};
export default Calendar;
