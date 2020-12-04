import React from 'react';
import styled from 'styled-components';

import GlobalStyled from 'style/GlobalStyled';
import CompanyLink from 'components/Atoms/CompanyLink';

const Styled = {
	Wrapper: styled(GlobalStyled.Card)`
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

interface SwitchButtonInterface {
	children: any;
}

const CompanyLinkCards = (props: SwitchButtonInterface) => {
	const { children } = props;

	const infos = [
		{
			img: require('images/logo-enerdot.svg').default,
			label: '신재생에너지 전문 IT 스타트업',
		},
		{
			width: '9rem',
			img: require('images/logo-sundy.svg').default,
			label: '나만의 태양광 발전소 어드바이저',
		},
	];

	const list = infos.map((res, i) => {
		return (
			<GlobalStyled.Col width={50} key={i}>
				<CompanyLink {...res} />
			</GlobalStyled.Col>
		);
	});

	return <Styled.Wrapper>{list}</Styled.Wrapper>;
};
CompanyLinkCards.defaultProps = {
	children: '',
};

export default CompanyLinkCards;
