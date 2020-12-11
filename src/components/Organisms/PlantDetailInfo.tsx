import React from 'react';
import styled from 'styled-components';

import GlobalStyled from 'style/GlobalStyled';
import Weather from 'components/Molecules/Weather';

const Styled = {
	Wrapper: styled(GlobalStyled.HeightRow)`
		font-size: 1rem;
	`,
	PlantName: styled(GlobalStyled.Row)`
		margin: 2rem 0;
		font-size: 1.5rem;
		font-weight: bold;
	`,
	TitleCol: styled(GlobalStyled.Col)`
		width: 30%;
		color: ${props => props.theme.gray};
	`,
	ContentCol: styled(GlobalStyled.Col)`
		width: 70%;
		color: ${props => props.theme.lightBlack};
	`,
};

interface PlantDetailInfoInterface {
	info: {
		plantName: string;
		address: string;
		capacity: string;
		equipmentInfos: any;
	};
	weatherInfo: any;
}

const PlantDetailInfo = (props: PlantDetailInfoInterface) => {
	const { info, weatherInfo } = props;

	const { plantName, address, capacity, equipmentInfos } = info;

	const equipmentList = equipmentInfos.map((res: any, i: number) => {
		return (
			<GlobalStyled.Row bottom={0.5}>
				<Styled.TitleCol>{i === 0 ? '설비정보' : ''}</Styled.TitleCol>
				<Styled.ContentCol>{`${res.name} / ${res.value}`}</Styled.ContentCol>
			</GlobalStyled.Row>
		);
	});

	return (
		<Styled.Wrapper>
			<Styled.PlantName>{plantName}</Styled.PlantName>
			<GlobalStyled.Row>
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
			</GlobalStyled.Row>
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
