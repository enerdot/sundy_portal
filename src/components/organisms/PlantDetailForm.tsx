import React from 'react';
import styled from 'styled-components';

import GlobalStyled from 'style/GlobalStyled';
import Weather from 'components/molecules/Weather';

const Styled = {
	Wrapper: styled(GlobalStyled.HeightRow)`
		font-size: 1rem;
	`,
	PlantName: styled(GlobalStyled.FadeInUpRow)`
		margin: 2rem 0;
		font-size: 1.5rem;
		font-weight: bold;
	`,
	TitleCol: styled(GlobalStyled.Col)`
		width: 30%;
		color: ${props => props.theme.colors.gray500};
	`,
	ContentCol: styled(GlobalStyled.Col)`
		width: 70%;
		color: ${props => props.theme.colors.lightBlack};
	`,
};

export interface PlantDetailInfoInterface {
	plantName: string;
	address: string;
	capacity: string;
	equipmentInfos: any;
}

export interface PlantDetailFormInterface {
	info: PlantDetailInfoInterface;
	weatherInfo: any;
}

const PlantDetailInfo = (props: PlantDetailFormInterface) => {
	const { info, weatherInfo } = props;

	const { plantName, address, capacity, equipmentInfos } = info;

	const equipmentList = equipmentInfos.map((res: any, i: number) => {
		return (
			<GlobalStyled.FadeInUpRow bottom={0.5} key={i}>
				<Styled.TitleCol>{i === 0 ? '설비정보' : ''}</Styled.TitleCol>
				<Styled.ContentCol>{`${res.name} / ${res.value}`}</Styled.ContentCol>
			</GlobalStyled.FadeInUpRow>
		);
	});

	return (
		<Styled.Wrapper>
			<Styled.PlantName>{plantName}</Styled.PlantName>
			<GlobalStyled.FadeInUpRow>
				<GlobalStyled.Col width={70}>
					<GlobalStyled.HeightRow>
						<GlobalStyled.Row bottom={1}>
							<Styled.TitleCol>위치</Styled.TitleCol>
							<Styled.ContentCol>{address}</Styled.ContentCol>
						</GlobalStyled.Row>
						<GlobalStyled.Row bottom={1}>
							<Styled.TitleCol>용량</Styled.TitleCol>
							<Styled.ContentCol>{capacity}</Styled.ContentCol>
						</GlobalStyled.Row>
						<GlobalStyled.HeightRow>
							{equipmentList}
						</GlobalStyled.HeightRow>
					</GlobalStyled.HeightRow>
				</GlobalStyled.Col>
				<GlobalStyled.Col width={30}>
					<Weather info={weatherInfo} />
				</GlobalStyled.Col>
			</GlobalStyled.FadeInUpRow>
		</Styled.Wrapper>
	);
};
PlantDetailInfo.defaultProps = {
	info: {
		plantName: '-',
		address: '-',
		capacity: '-',
		equipmentInfos: [{ name: '-', value: '-' }],
	},
	weatherInfo: null,
};

export default PlantDetailInfo;
