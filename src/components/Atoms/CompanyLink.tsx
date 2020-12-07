import React from 'react';
import styled from 'styled-components';

import GlobalStyled from 'style/GlobalStyled';

const Styled = {
	Wrapper: styled.a`
		display: flex;
		width: 100%;
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
	url: string;
}

const CompanyLink = (props: ValueLabelContentInterface) => {
	const { img, label, width, url } = props;
	return (
		<Styled.Wrapper href={url}>
			<Styled.Img width={width} alt="company" src={img} />
			<Styled.Label>{label}</Styled.Label>
		</Styled.Wrapper>
	);
};
CompanyLink.defaultProps = {
	width: '11rem',
	img: require('images/logo-enerdot.svg').default,
	label: '-',
	url: '/',
};

export default CompanyLink;
