import React from 'react';
import styled from 'styled-components';

import GlobalStyled from 'style/GlobalStyled';

const Styled = {
	Wrapper: styled(GlobalStyled.Card)`
		font-size: 1rem;
		box-shadow: none;
		border: 1px solid ${props => props.theme.blue};
	`,
	Section: styled(GlobalStyled.Col)`
		margin-right: 2rem;
		align-items: center;
	`,

	PlantRankingImg: styled.img`
		margin-right: 1rem;
	`,
	PlantRegion: styled(GlobalStyled.Row)`
		color: ${props => props.theme.blue};
	`,
	PlantRanking: styled(GlobalStyled.Row)`
		font-size: 1.25rem;
		font-weight: bold;
		color: ${props => props.theme.blue};
	`,
	PlantName: styled(GlobalStyled.Row)``,
	Address: styled(GlobalStyled.Row)`
		font-size: 0.875rem;
		color: ${props => props.theme.gray};
	`,
};

interface PlantRankingInfoInterface {
	info: {
		region: string;
		ranking: string;
		plantName: string;
		address: string;
		plantTime: string;
	};
}

const PlantRankingInfo = (props: PlantRankingInfoInterface) => {
	const { region, ranking, plantName, address, plantTime } = props.info;
	return (
		<Styled.Wrapper>
			<GlobalStyled.Col width={80}>
				<Styled.Section>
					<Styled.PlantRankingImg
						alt="plant-ranking"
						src={require('images/ic-plant-ranking.svg').default}
					/>
					<GlobalStyled.HeightRow>
						<Styled.PlantRegion>{region} 발전량</Styled.PlantRegion>
						<Styled.PlantRanking>{ranking}</Styled.PlantRanking>
					</GlobalStyled.HeightRow>
				</Styled.Section>
				<Styled.Section>
					<GlobalStyled.HeightRow>
						<Styled.PlantName>{plantName}</Styled.PlantName>
						<Styled.Address>{address}</Styled.Address>
					</GlobalStyled.HeightRow>
				</Styled.Section>
			</GlobalStyled.Col>
			<GlobalStyled.CenterCol width={20}>
				<GlobalStyled.CenterCol width={90}>
					{plantTime}
				</GlobalStyled.CenterCol>
				<GlobalStyled.Col width={10}>
					<img
						alt="right-blue-arrow"
						src={require('images/ic-right-blue-cursor.svg').default}
					/>
				</GlobalStyled.Col>
			</GlobalStyled.CenterCol>
		</Styled.Wrapper>
	);
};
PlantRankingInfo.defaultProps = {
	info: {
		region: '-',
		ranking: '-',
		plantName: '-',
		address: '-',
		plantTime: '-',
	},
};

export default PlantRankingInfo;
