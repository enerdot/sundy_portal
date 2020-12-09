import React from 'react';
import styled from 'styled-components';

import GlobalStyled from 'style/GlobalStyled';

const Styled = {
	Wrapper: styled(GlobalStyled.Card)`
		font-size: 1rem;
		box-shadow: none;
		border: 1px solid ${props => props.theme.sky};
	`,
	Section: styled(GlobalStyled.Col)`
		margin-right: 2rem;
		align-items: center;
	`,

	PlantRankingImg: styled.img`
		margin-right: 1rem;
	`,
	PlantRegion: styled(GlobalStyled.Row)`
		color: ${props => props.theme.sky};
	`,
	PlantRanking: styled(GlobalStyled.Row)`
		font-size: 1.25rem;
		font-weight: bold;
		color: ${props => props.theme.sky};
	`,
	PlantName: styled(GlobalStyled.Row)``,
	Address: styled(GlobalStyled.Row)`
		font-size: 0.875rem;
		color: ${props => props.theme.gray};
	`,
	PlantTime: styled.span`
		color: ${props => props.theme.sky};
		font-size: 1.25rem;
		font-weight: bold;
	`,
};

interface PlantRankingInfoInterface {
	info: {
		region: string;
		ranking: any;
		plantName: string;
		address: string;
		plantTime: string;
		to: string;
	};
}

const PlantRankingInfo = (props: PlantRankingInfoInterface) => {
	const { region, ranking, plantName, address, plantTime, to } = props.info;
	return (
		<GlobalStyled.RowLink to={to}>
			<Styled.Wrapper>
				<GlobalStyled.Col width={80}>
					<Styled.Section>
						<Styled.PlantRankingImg
							alt="plant-ranking"
							src={require('images/ic-plant-ranking.svg').default}
						/>
						<GlobalStyled.HeightRow>
							<Styled.PlantRegion>
								{region} 발전량
							</Styled.PlantRegion>
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
						<Styled.PlantTime>{plantTime}</Styled.PlantTime>
					</GlobalStyled.CenterCol>
					<GlobalStyled.Col width={10}>
						<img
							alt="right-blue-arrow"
							src={
								require('images/ic-right-blue-cursor.svg')
									.default
							}
						/>
					</GlobalStyled.Col>
				</GlobalStyled.CenterCol>
			</Styled.Wrapper>
		</GlobalStyled.RowLink>
	);
};
PlantRankingInfo.defaultProps = {
	info: {
		region: '-',
		ranking: '-',
		plantName: '-',
		address: '-',
		plantTime: '-',
		to: '/',
	},
};

export default PlantRankingInfo;
