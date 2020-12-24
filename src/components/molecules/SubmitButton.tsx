import React from 'react';
import styled from 'styled-components';

import GlobalStyled from 'style/GlobalStyled';
import CircleSpinner from 'components/atoms/Spinner';

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
	onClick: any;
	isActive: any;
	isLoading: boolean;
}

const SubmitButton = (props: SubmitButtonInterface) => {
	const { children, isLoading } = props;
	return (
		<Styled.SubmitButton {...props}>
			{isLoading ? <CircleSpinner size="1.5rem" /> : children}
		</Styled.SubmitButton>
	);
};
SubmitButton.defaultProps = {
	children: '',
	type: 'button',
	onClick: () => {},
	isActive: false,
	isLoading: false,
};

export default SubmitButton;
