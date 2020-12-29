import React, { MouseEventHandler } from 'react';
import styled from 'styled-components';

import GlobalStyled from 'style/GlobalStyled';
import Spinner from 'components/atoms/Spinner';

const Styled = {
	SubmitButton: styled(GlobalStyled.ActiveButton)`
		border-radius: 3rem;
		font-size: 1.25rem;
		padding: 1.25rem;
	`,
};

interface SubmitButtonInterface {
	children: any;
	type: 'button' | 'submit' | 'reset' | undefined;
	onClick?: MouseEventHandler<HTMLButtonElement>;
	isActive?: boolean;
	isLoading?: boolean;
}

const SubmitButton = (props: SubmitButtonInterface) => {
	const { children, isActive, isLoading, type } = props;
	return (
		<Styled.SubmitButton type={type} isActive={isActive}>
			{isLoading ? <Spinner size="1.5rem" /> : children}
		</Styled.SubmitButton>
	);
};
SubmitButton.defaultProps = {
	children: '',
	type: 'button',
};

export default SubmitButton;
