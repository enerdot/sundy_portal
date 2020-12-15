import React from 'react';
import styled from 'styled-components';

import GlobalStyled from 'style/GlobalStyled';

const Styled = {
	Wrapper: styled(GlobalStyled.HeightRow)``,
	Title: styled(GlobalStyled.FadeInUpRow)`
		color: ${props => props.theme.lightBlack};
		font-size: 1.25rem;
		padding: 0.5rem;
	`,
	Input: styled.input`
		font-size: 1.5rem;
		border: 0px;
		border-bottom: 1px solid ${props => props.theme.gray};
		outline: none;
		padding: 0.5rem;
		color: ${props => props.theme.gray};
		:focus {
			color: ${props => props.theme.black};
			border-bottom: 1px solid ${props => props.theme.sky};
		}
	`,
};

interface LoginInputInterface {
	title: string;
	required: boolean;
	type: string;
	placeholder: string;
	name: string;
	value: string;
	onChange: any;
}

const LabelInput = (props: LoginInputInterface) => {
	const { title } = props;
	return (
		<Styled.Wrapper>
			<Styled.Title>{title}</Styled.Title>
			<Styled.Input {...props} />
		</Styled.Wrapper>
	);
};
LabelInput.defaultProps = {
	title: '-',
	required: true,
	type: 'text',
	placeholder: '',
	name: '',
	value: '',
	onChange: () => {},
};

export default LabelInput;
