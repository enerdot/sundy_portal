import React from 'react';
import styled from 'styled-components';
import ReactSelect from 'react-select';

import theme from '../../style/theme';

const Styled = {
	Body: styled.div<{ width: number | string }>`
		width: ${props => props.width};
		.css-tlfecz-indicatorContainer {
		}
	`,
};

interface propsType {
	isDisabled: boolean;
	width: number | string;
	options: any;
	value: {
		label: string;
		value: string;
	};
	onChange: any;
	isActive: boolean;
}

interface selectType {
	provided: any;
	state: any;
}

const Select = (props: propsType) => {
	const { isDisabled, width, options, value, onChange, isActive } = props;

	const customStyles: object = {
		control: (provided: selectType, state: selectType) => ({
			...provided,
			// border: `1px solid ${theme.color.realWhiteBlue}`,
		}),
		indicatorContainer: (provided: selectType, state: selectType) => ({
			...provided,
			// color: theme.color.whiteBlue,
		}),
	};

	return (
		<Styled.Body width={width}>
			{isActive ? (
				<ReactSelect
					styles={customStyles}
					onChange={onChange}
					value={value}
					options={options}
					isDisabled={isDisabled}
				/>
			) : (
				<div>{value.label}</div>
			)}
		</Styled.Body>
	);
};

Select.defaultProps = {
	width: '6rem',
	options: [
		{
			label: '1',
			value: 1,
		},
		{
			label: '2',
			value: 2,
		},
		{
			label: '3',
			value: 3,
		},
	],
	value: {
		label: '1',
		value: 1,
	},
	isActive: true,
	isDisabled: false,
	onChange: function () {},
};

export default Select;
