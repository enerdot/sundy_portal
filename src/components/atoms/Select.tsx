import React from 'react';
import styled from 'styled-components';
import ReactSelect from 'react-select';

const levelSize: any = {
	3: '1rem',
	2: '1.5rem',
	1: '3rem',
};

interface BodyInterface {
	width: number | string;
	level: number;
}

const Styled = {
	Body: styled.div<BodyInterface>`
		font-size: ${props => levelSize[props.level]};
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
	customStyles: any;
	level: number;
}

interface selectType {
	provided: any;
	state: any;
}

const Select = (props: propsType) => {
	const {
		isDisabled,
		width,
		options,
		value,
		onChange,
		isActive,
		customStyles,
		level,
	} = props;

	return (
		<Styled.Body level={level} width={width}>
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
	customStyles: {
		control: (provided: selectType, state: selectType) => ({
			...provided,
			// border: `1px solid ${theme.colors.color.realWhiteBlue}`,
		}),
		indicatorContainer: (provided: selectType, state: selectType) => ({
			...provided,
			// color: theme.colors.color.whiteBlue,
		}),
	},
	level: 2,
};

export default Select;
