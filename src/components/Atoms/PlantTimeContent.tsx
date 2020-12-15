import React from 'react';
import styled from 'styled-components';

const Styled = {
	Wrapper: styled.div`
		font-size: 1rem;
		flex-direction: column;
		padding: 0.5rem 1rem;
	`,
	Value: styled.div`
		font-size: 1.5rem;
		color: ${props => props.theme.blue};
		margin-bottom: 0.5rem;
	`,
	Label: styled.div`
		font-size: 1rem;
		color: ${props => props.theme.darkGray};
	`,
};

interface ValueLabelContentInterface {
	value: string;
	label: string;
}

const PlantTimeContent = (props: ValueLabelContentInterface) => {
	const { value, label } = props;
	return (
		<Styled.Wrapper>
			<Styled.Value>{value}</Styled.Value>
			<Styled.Label>{label}</Styled.Label>
		</Styled.Wrapper>
	);
};
PlantTimeContent.defaultProps = {
	value: '-',
	label: '-',
};

export default PlantTimeContent;
