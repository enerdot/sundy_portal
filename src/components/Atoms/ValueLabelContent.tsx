import React from 'react';
import styled from 'styled-components';

import GlobalStyled from 'style/GlobalStyled';

const Styled = {
	Wrapper: styled(GlobalStyled.Row)`
		font-size: 1rem;
		flex-direction: column;
		padding: 0.5rem;
	`,
	Value: styled(GlobalStyled.Row)`
		font-size: 1.5rem;
		color: ${props => props.theme.blue};
	`,
	Label: styled(GlobalStyled.Row)`
		font-size: 1rem;
		color: ${props => props.theme.darkGray};
	`,
};

interface ValueLabelContentInterface {
	value: string;
	label: string;
}

const ValueLabelContent = (props: ValueLabelContentInterface) => {
	const { value, label } = props;
	return (
		<Styled.Wrapper>
			<Styled.Value>{value}</Styled.Value>
			<Styled.Label>{label}</Styled.Label>
		</Styled.Wrapper>
	);
};
ValueLabelContent.defaultProps = {
	value: '-',
	label: '-',
};

export default ValueLabelContent;
