import React, { InputHTMLAttributes } from 'react';
import styled from 'styled-components';

import GlobalStyled from 'style/GlobalStyled';

const Styled = {
	Wrapper: styled(GlobalStyled.HeightRow)``,
	Title: styled(GlobalStyled.Row)`
		color: ${props => props.theme.colors.lightBlack};
		padding: 0.5rem;
	`,
	Input: styled.input`
		font-size: 1.5rem;
		border: 0px;
		border-bottom: 1px solid ${props => props.theme.colors.gray500};
		outline: none;
		padding: 0.5rem;
		color: ${props => props.theme.colors.gray500};
		:focus {
			color: ${props => props.theme.colors.black};
			border-bottom: 1px solid ${props => props.theme.colors.sky};
		}
		:read-only {
			opacity: 0.5;
			color: ${props => props.theme.colors.gray500};
			:focus {
				color: ${props => props.theme.colors.gray500};
				border-bottom: 1px solid ${props => props.theme.colors.gray500};
			}
		}
	`,
};

interface LoginInputInterface extends InputHTMLAttributes<HTMLInputElement> {
	label: string;
}

const LabelInput = (props: LoginInputInterface) => {
	const { label } = props;

	return (
		<Styled.Wrapper>
			<Styled.Title>{label}</Styled.Title>
			<Styled.Input {...props} />
		</Styled.Wrapper>
	);
};
LabelInput.defaultProps = {
	label: '-',
	required: true,
	type: 'text',
	placeholder: '',
	name: '',
	value: '',
	onChange: () => {},
	onFocus: () => {},
};

export default LabelInput;
