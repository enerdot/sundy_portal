import React, { useState, useEffect } from 'react';
import moment from 'moment';
import styled from 'styled-components';
import useSWR from 'swr';
import Swal from 'sweetalert2';

import GlobalStyled from 'style/GlobalStyled';
import theme from 'style/theme';

import globalSwal from 'config/swal';

import { reverseApiRegionLabel } from 'config/region';
import { isRegionUrl, isDateUrl } from 'utils/url';

import PlantRankingList from 'components/molecules/PlantRankingList';
import InquiryDate from 'components/atoms/InquiryDate';

import { exposureSecurity } from 'utils/format';
import Svg from 'components/atoms/Svg';
import Popup from 'components/atoms/Popup';

interface RankingPageInterface {
	match: any;
	location: any;
	history: any;
}

const Styled = {
	Header: styled(GlobalStyled.HeightRow)`
		padding: 1rem;
		border-bottom: 1px solid ${props => props.theme.colors.gray500};
		margin-bottom: 1rem;
	`,
	Title: styled(GlobalStyled.Row)`
		font-size: 1.5rem;
		color: ${props => props.theme.colors.lightBlack};
	`,
	ContentWrapper: styled(GlobalStyled.HeightRow)`
		padding: 0 1rem;
	`,
	TextAlignWrapper: styled(GlobalStyled.CenterRow)`
		width: auto;
	`,
	PopupImgWrapper: styled(GlobalStyled.CenterRow)`
		width: auto;
		margin-left: 1rem;
		padding-top: 0.3rem;
	`,
};

const RankingPage = ({
	match,
	location,
	history,
}: RankingPageInterface): JSX.Element => {
	const region = isRegionUrl(match).value.label;
	const inquiryDate = isDateUrl(match).value;

	const { data: apiPlantRankList = { list: [] } } = useSWR(
		`/region/plants-ranking?regionGroupId=${
			reverseApiRegionLabel[region as '서울경기']
		}&date=${moment(inquiryDate as any).format('YYYY-MM-DD')}`,
	);

	const [rankingInfos, setRankingInfos] = useState([
		{
			region: '-',
			ranking: '-',
			plantName: '-',
			address: '-',
			plantTime: '-',
			to: '/',
		},
	]);

	useEffect(() => {
		const urlRegion = isRegionUrl(match);
		const urlDate = isDateUrl(match);

		if (urlRegion.isUrl && urlDate.isUrl) {
			setRankingInfos(
				apiPlantRankList.list.map((res: any, i: number) => {
					const {
						kwh_time,
						plant_address,
						plant_id,
						plant_name,
					} = res;

					return {
						region: '',
						ranking: `${i + 1}위`,
						plantName: exposureSecurity(plant_name, 2),
						address: plant_address,
						plantTime: `${kwh_time} 시간`,
						to: `/info/${plant_id}/${moment(urlDate.value).format(
							'YYYYMMDD',
						)}`,
					};
				}),
				// .sort((a: any, b: any) => {
				// 	return b.plantTime - a.plantTime;
				// })
				// .map((res: any, i: number) => {
				// 	return {
				// 		...res,
				// 		ranking: `${i + 1}위`,
				// 		plantTime: res.plantTime + ' 시간',
				// 	};
				// }),
			);
		} else {
			Swal.fire(globalSwal.urlErr).then(() => history.push('/'));
		}
	}, [match, history, region, apiPlantRankList]);

	return (
		<GlobalStyled.Body>
			<GlobalStyled.Container>
				<Styled.Header>
					<GlobalStyled.Row bottom={1}>
						<GlobalStyled.RightCol width={100}>
							<InquiryDate date={inquiryDate} />
						</GlobalStyled.RightCol>
					</GlobalStyled.Row>
					<Styled.Title>
						<Styled.TextAlignWrapper>
							{region} 발전량 상위 5위
						</Styled.TextAlignWrapper>
						<Styled.PopupImgWrapper>
							<Popup
								trigger={
									<div>
										<Svg
											name="infoPopup"
											size="1.5rem"
											fill={theme.colors.lightBlack}
										/>
									</div>
								}
								position="bottom center"
								offsetX={-40}
							>
								<GlobalStyled.PopupWrapper
									width="100%"
									fontSize="1rem"
								>
									태양광 발전소의 하루 총 발전량을
									설비용량으로 나눈 값으로
									<br />
									발전소의 전력 생산 상태를 판별할 수 있는
									기준입니다.
									<br />
									발전시간이 높을 수록 우수한 발전소입니다.
								</GlobalStyled.PopupWrapper>
							</Popup>
						</Styled.PopupImgWrapper>
					</Styled.Title>
				</Styled.Header>
				<Styled.ContentWrapper>
					<PlantRankingList
						infos={rankingInfos.filter(
							(res: any, i: number) => i < 5,
						)}
					/>
				</Styled.ContentWrapper>
			</GlobalStyled.Container>
		</GlobalStyled.Body>
	);
};

export default RankingPage;
