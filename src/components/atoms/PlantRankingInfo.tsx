import React from 'react';
import styled from 'styled-components';

import GlobalStyled from 'style/GlobalStyled';

const Styled = {
	Wrapper: styled(GlobalStyled.Card)`
		font-size: 1rem;
		box-shadow: none;
		border: 1px solid ${props => props.theme.colors.sky};
	`,
	Section: styled(GlobalStyled.Col)`
		margin-right: 2rem;
		align-items: center;
	`,

	PlantRankingImg: styled.img`
		margin-right: 1rem;
	`,
	PlantRegion: styled.div`
		color: ${props => props.theme.colors.sky};
	`,
	PlantRanking: styled(GlobalStyled.CenterRow)`
		font-size: 1.25rem;
		font-weight: bold;
		color: ${props => props.theme.colors.sky};
	`,
	PlantName: styled.div``,
	Address: styled.div`
		font-size: 0.875rem;
		color: ${props => props.theme.colors.gray500};
	`,
	PlantTime: styled.span`
		color: ${props => props.theme.colors.sky};
		font-size: 1.25rem;
		font-weight: bold;
	`,
};

export interface PlantRankingInfoValueInterface {
	region: string;
	ranking: string | number;
	plantName: string;
	address: string;
	plantTime: string | number;
	to: string;
}

export interface PlantRankingInfoInterface {
	info: PlantRankingInfoValueInterface;
}

const PlantRankingInfo = (props: PlantRankingInfoInterface) => {
	const { region, ranking, plantName, address, plantTime, to } = props.info;
	return (
		<GlobalStyled.RowLink to={to}>
			<Styled.Wrapper>
				<GlobalStyled.Col width={75}>
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
				<GlobalStyled.CenterCol width={25}>
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
