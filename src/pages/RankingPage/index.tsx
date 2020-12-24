import React, { useState, useEffect } from 'react';
import moment from 'moment';
import styled from 'styled-components';
import useSWR from 'swr';
import Swal from 'sweetalert2';

import GlobalStyled from 'style/GlobalStyled';

import globalSwal from 'config/alert';

import { reverseApiRegionLabel } from 'config/region';
import { isRegionUrl, isDateUrl } from 'utils/url';

import PlantRankingList from 'components/molecules/PlantRankingList';
import InquiryDate from 'components/atoms/InquiryDate';

import { exposureSecurity } from 'utils/format';

interface RankingPageInterface {
	match: any;
	location: any;
	history: any;
}

const Styled = {
	Header: styled(GlobalStyled.HeightRow)`
		padding: 0.5rem 1rem;
		border-bottom: 1px solid ${props => props.theme.gray};
		margin-bottom: 1rem;
	`,
	Title: styled(GlobalStyled.Row)`
		font-size: 1.5rem;
		color: ${props => props.theme.lightBlack};
	`,
	ContentWrapper: styled(GlobalStyled.HeightRow)`
		padding: 0 1rem;
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
					<GlobalStyled.RightCol width={100}>
						<InquiryDate date={inquiryDate} />
					</GlobalStyled.RightCol>
					<Styled.Title>{region} 발전량 상위 5위</Styled.Title>
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
