import React from 'react';
import styled from 'styled-components';

import GlobalStyled from 'style/GlobalStyled';
import CompanyLinkCard from 'components/Atoms/CompanyLinkCard';

const Styled = {
	Wrapper: styled(GlobalStyled.Card)`
		box-shadow: 0px 6px 10px 0px ${props => props.theme.shadow};
		${GlobalStyled.Col} {
			margin-right: 1rem;
			border-right: 1px solid ${props => props.theme.lightGray};
			:last-child {
				border-right: 0;
				margin-right: 0;
			}
		}
	`,
};

interface CompanyLinkCardCardsInterface {}

const CompanyLinkCardCards = (props: CompanyLinkCardCardsInterface) => {
	const infos = [
		{
			url: 'https://enerdot.co.kr/',
			img: require('images/logo-enerdot.svg').default,
			label: '신재생에너지 전문 IT 스타트업',
		},
		{
			url: 'https://smart.sundy.co.kr/',
			width: '9rem',
			img: require('images/logo-sundy.svg').default,
			label: '나만의 태양광 발전소 어드바이저',
		},
	];

	const list = infos.map((res, i) => {
		return (
			<GlobalStyled.Col width={50} key={i}>
				<CompanyLinkCard {...res} />
			</GlobalStyled.Col>
		);
	});

	return <Styled.Wrapper>{list}</Styled.Wrapper>;
};
CompanyLinkCardCards.defaultProps = {
	children: '',
};

export default CompanyLinkCardCards;
