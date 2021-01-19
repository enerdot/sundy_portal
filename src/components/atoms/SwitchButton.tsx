import React from 'react';
import styled from 'styled-components';

import GlobalStyled from 'style/GlobalStyled';

const Styled = {
	Wrapper: styled(GlobalStyled.Col)`
		font-size: 1rem;
		width: 10rem;
		box-shadow: ${props => props.theme.colors.shadow} 10px 5px 7px 0px;
		border-radius: 3rem;
	`,
	Button: styled(GlobalStyled.Button)<{ isActive: boolean }>`
		font-weight: bold;
		padding: 0.35rem;
		width: 50%;
		border: 0.2rem solid ${props => props.theme.colors.blue};
		border-right: 0;
		background-color: ${props =>
			props.isActive
				? props.theme.colors.blue
				: props.theme.colors.white};
		color: ${props =>
			props.isActive
				? props.theme.colors.white
				: props.theme.colors.blue};
		border-radius: 3rem 0 0 3rem;
		:last-child {
			border-right: 0.2rem solid ${props => props.theme.colors.blue};
			border-left: 0;
			border-radius: 0 3rem 3rem 0;
		}
	`,
};

interface SwitchButtonInterface {
	value: boolean;
	onChange: Function;
	onText: string;
	offText: string;
}

const SwitchButton = (props: SwitchButtonInterface) => {
	const { value, onText, offText, onChange } = props;

	const handleChangeButtonType = (e: boolean) => {
		onChange(e);
	};

	return (
		<Styled.Wrapper>
			<Styled.Button
				onClick={() => handleChangeButtonType(true)}
				isActive={value}
			>
				{onText}
			</Styled.Button>
			<Styled.Button
				onClick={() => handleChangeButtonType(false)}
				isActive={!value}
			>
				{offText}
			</Styled.Button>
		</Styled.Wrapper>
	);
};
export default SwitchButton;

SwitchButton.defaultProps = {
	value: false,
	onText: '왼쪽',
	offText: '오른쪽',
	onChange: function () {},
};
