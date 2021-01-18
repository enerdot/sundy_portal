import React, { MouseEventHandler } from 'react';
import styled, { CSSProp, css } from 'styled-components';

import GlobalStyled from 'style/GlobalStyled';
import Spinner from 'components/atoms/Spinner';

const Styled = {
	SubmitButton: styled(GlobalStyled.ActiveButton)<{
		css: CSSProp | undefined;
	}>`
		border-radius: 3rem;
		font-size: 1.25rem;
		padding: 1.25rem;
		${props => props.css};
	`,
};

export interface SubmitButtonInterface {
	children: any;
	type: 'button' | 'submit' | 'reset' | undefined;
	onClick?: MouseEventHandler<HTMLButtonElement>;
	isActive?: boolean;
	isLoading?: boolean;
	css: CSSProp | undefined;
}

const SubmitButton = (props: SubmitButtonInterface) => {
	const { children, isActive, isLoading, type, css } = props;
	return (
		<Styled.SubmitButton css={css} type={type} isActive={isActive}>
			{isLoading ? <Spinner size="1.5rem" /> : children}
		</Styled.SubmitButton>
	);
};
SubmitButton.defaultProps = {
	children: '',
	type: 'button',
	css: css``,
};

export default SubmitButton;
