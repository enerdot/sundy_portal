import React from 'react';
import styled from 'styled-components';

import GlobalStyled from 'style/GlobalStyled';
import PlantRankingInfo from 'components/Atoms/PlantRankingInfo';

const Styled = {
	Wrapper: styled(GlobalStyled.Row)`
		font-size: 1rem;
		flex-direction: column;
	`,
	Header: styled(GlobalStyled.Row)`
		padding: 1rem 0;
		font-size: 1.5rem;
		color: ${props => props.theme.lightBlack};
		margin-bottom: 0.5rem;
	`,
};

interface PlantRankingListInterface {
	infos: any;
	region: string;
}

const PlantRankingList = (props: PlantRankingListInterface) => {
	const { infos, region } = props;

	const list = infos.map((res: any, i: number) => {
		return (
			<GlobalStyled.Row bottom={0.5} key={i}>
				<PlantRankingInfo info={res} />
			</GlobalStyled.Row>
		);
	});

	return (
		<Styled.Wrapper>
			<Styled.Header>{region} 발전량 상위 10위</Styled.Header>
			<GlobalStyled.HeightRow>{list}</GlobalStyled.HeightRow>
		</Styled.Wrapper>
	);
};
PlantRankingList.defaultProps = {
	region: '-',
	infos: [
		{
			region: '-',
			ranking: '-',
			plantName: '-',
			address: '-',
			plantTime: '-',
		},
	],
};

export default PlantRankingList;
