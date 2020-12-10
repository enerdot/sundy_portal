import React from 'react';
import styled from 'styled-components';

import GlobalStyled from 'style/GlobalStyled';
import PlantRankingInfo from 'components/Atoms/PlantRankingInfo';

const Styled = {
	Wrapper: styled(GlobalStyled.Row)`
		font-size: 1rem;
		flex-direction: column;
	`,
};

interface PlantRankingListInterface {
	infos: any;
}

const PlantRankingList = (props: PlantRankingListInterface) => {
	const { infos } = props;

	const list = infos.map((res: any, i: number) => {
		return (
			<GlobalStyled.Row bottom={1} key={i}>
				<PlantRankingInfo info={res} />
			</GlobalStyled.Row>
		);
	});

	return (
		<Styled.Wrapper>
			<GlobalStyled.HeightRow>{list}</GlobalStyled.HeightRow>
		</Styled.Wrapper>
	);
};
PlantRankingList.defaultProps = {
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
