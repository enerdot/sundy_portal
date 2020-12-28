import React, { InputHTMLAttributes } from 'react';
import styled from 'styled-components';

import GlobalStyled from 'style/GlobalStyled';

const Styled = {
	Wrapper: styled(GlobalStyled.Row)``,
	Input: styled.input`
		margin-right: 1rem;
	`,
};

export interface CheckBoxInterface
	extends InputHTMLAttributes<HTMLInputElement> {
	value: any;
	name: string;
	label?: string;
}

const CheckBox = (props: CheckBoxInterface) => {
	const { value, name, onChange, required, label } = props;
	return (
		<Styled.Wrapper>
			<Styled.Input
				type="checkbox"
				id={name}
				name={name}
				checked={value}
				onChange={onChange}
				required={required}
			/>
			<label htmlFor={name}>{label}</label>
		</Styled.Wrapper>
	);
};
CheckBox.defaultProps = {
	value: false,
	name: '',
	onChange: () => {},
	required: false,
};

export default CheckBox;
