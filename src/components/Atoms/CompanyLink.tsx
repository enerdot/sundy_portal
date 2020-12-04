import React from 'react';
import styled from 'styled-components';

import GlobalStyled from 'style/GlobalStyled';

const Styled = {
	Wrapper: styled(GlobalStyled.Row)`
		flex-direction: column;
	`,
	Img: styled.img<{ width: string }>`
		display: flex;
		width: ${props => props.width};
		height: 3rem;
	`,
	Label: styled(GlobalStyled.Row)`
		font-size: 1rem;
		color: ${props => props.theme.gray};
	`,
};

interface ValueLabelContentInterface {
	width: string;
	img: any;
	label: string;
}

const CompanyLink = (props: ValueLabelContentInterface) => {
	const { img, label, width } = props;
	return (
		<Styled.Wrapper>
			<Styled.Img width={width} alt="company" src={img} />
			<Styled.Label>{label}</Styled.Label>
		</Styled.Wrapper>
	);
};
CompanyLink.defaultProps = {
	width: '11rem',
	img: require('images/logo-enerdot.svg').default,
	label: '-',
};

export default CompanyLink;
