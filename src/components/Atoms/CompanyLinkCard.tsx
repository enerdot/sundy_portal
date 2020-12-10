import React from 'react';
import styled from 'styled-components';

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
	Label: styled.div`
		display: inline-block;
		font-size: 1rem;
		color: ${props => props.theme.gray};
		word-break: keep-all;
	`,
};

interface ValueLabelContentInterface {
	width: string;
	img: any;
	label: string;
	url: string;
}

const CompanyLinkCard = (props: ValueLabelContentInterface) => {
	const { img, label, width, url } = props;

	return (
		<Styled.Wrapper href={url} target="_blank">
			<Styled.Img width={width} alt="company" src={img} />
			<Styled.Label>{label}</Styled.Label>
		</Styled.Wrapper>
	);
};
CompanyLinkCard.defaultProps = {
	width: '11rem',
	img: require('images/logo-enerdot.svg').default,
	label: '-',
	url: '/',
};

export default CompanyLinkCard;
