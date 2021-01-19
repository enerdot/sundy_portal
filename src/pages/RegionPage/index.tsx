import React, { useState, useEffect } from 'react';
import useSWR from 'swr';
import moment from 'moment';
import Swal from 'sweetalert2';
import GlobalStyled from 'style/GlobalStyled';

import globalSwal from 'config/swal';

// import useCurrentUser from 'hooks/useCurrentUser';
// import useAPI from 'hooks/useAPI';
import Select from 'components/atoms/Select';

import { reverseApiRegionLabel, regionOptions } from 'config/region';
import PlantMap from 'components/atoms/PlantMap';
import PlantStatusTable from 'components/molecules/PlantStatusTable';
import PlantTimeContentList from 'components/molecules/PlantTimeContentList';
import PlantRankingInfo from 'components/atoms/PlantRankingInfo';
import BarChart from 'components/atoms/BarChart';
import InquiryDate from 'components/atoms/InquiryDate';
import { isRegionUrl, isDateUrl } from 'utils/url';

import { exposureSecurity } from 'utils/format';

interface RegionPageInterface {
	match: any;
	location: any;
	history: any;
}

type regionType =
	| '서울경기'
	| '강원'
	| '충북'
	| '충남'
	| '전북'
	| '전남'
	| '경북'
	| '경남'
	| '제주';

const RegionPage = ({
	match,
	location,
	history,
}: RegionPageInterface): JSX.Element => {
	const [selectRegionValue, setSelectRegionValue] = useState(
		regionOptions[0],
	);

	const [mapInfo, setMapInfo] = useState({
		seoul: 1,
		chungnam: 1,
		jeonbuk: 1,
		jeonnam: 1,
		gangwon: 1,
		chungbuk: 1,
		gyeongbuk: 1,
		gyeongnam: 1,
		jeju: 1,
	});

	const [inquiryDate, setInquiryDate] = useState(moment().add(-1, 'days'));

	// const { currentUser } = useCurrentUser();

	// const [API] = useMemo(useAPI, []);

	const selectApiRegionId =
		reverseApiRegionLabel[selectRegionValue.label as regionType];

	const {
		data: apiPlantTimeInfo = { region_avg_time: '-', region_max_time: '-' },
	} = useSWR(
		`/region/kwhtime?regionGroupId=${selectApiRegionId}&date=${moment(
			inquiryDate,
		).format('YYYY-MM-DD')}`,
	);

	const { data: apiPlantList = { list: [], total: {} } } = useSWR(
		`/region/plants-list?regionGroupId=${selectApiRegionId}&date=${moment(
			inquiryDate,
		).format('YYYY-MM-DD')}`,
	);
	console.log('apiPlantList : ', apiPlantList);

	const { data: apiWeekPlantTimeChart = [0, 0, 0, 0, 0, 0, 0] } = useSWR(
		`region/kwhtime-graph?regionGroupId=${selectApiRegionId}&startDate=${moment(
			inquiryDate,
		)
			.add(-6, 'days')
			.format('YYYY-MM-DD')}&endDate=${moment(inquiryDate).format(
			'YYYY-MM-DD',
		)}`,
	);

	const weekPlantTimeChartInfos = apiWeekPlantTimeChart.map(
		(res: any, i: number) => {
			return {
				id: moment(inquiryDate)
					.add(-7 + i, 'days')
					.format('MM-DD'),
				발전시간: res,
			};
		},
	);

	const [plantTimeInfos, setPlantTimeInfos] = useState([
		{
			value: '-',
			label: `- 평균 발전시간`,
		},
		{
			value: '-',
			label: `- 최고 발전시간`,
		},
	]);

	useEffect(() => {
		const urlRegion = isRegionUrl(match);
		const urlDate = isDateUrl(match);

		if (urlRegion.isUrl && urlDate.isUrl) {
			setPlantTimeInfos([
				{
					value: `${apiPlantTimeInfo.region_avg_time} 시간`,
					label: `${urlRegion.value.label} 평균 발전시간`,
				},
				{
					value: `${apiPlantTimeInfo.region_max_time} 시간`,
					label: `${urlRegion.value.label} 최고 발전시간`,
				},
			]);

			setSelectRegionValue(urlRegion.value);
			setInquiryDate(urlDate.value);
			setMapInfo((prevState: any) => {
				let formatState: any = {
					seoul: 1,
					chungnam: 1,
					jeonbuk: 1,
					jeonnam: 1,
					gangwon: 1,
					chungbuk: 1,
					gyeongbuk: 1,
					gyeongnam: 1,
					jeju: 1,
				};
				formatState[urlRegion.value.value as any] = 5;
				return formatState;
				// prevState[urlRegion.value.value] = 1
			});
		} else {
			Swal.fire(globalSwal.urlErr).then(() => history.push('/'));
			// history.push(
			// 	`/region/${
			// 		urlRegion.isUrl
			// 			? urlRegion.value.value
			// 			: regionOptions[0].value
			// 	}/${
			// 		urlDate.isUrl
			// 			? moment(urlDate.value).format('YYYYMMDD')
			// 			: moment().format('YYYYMMDD')
			// 	}}`,
			// );
		}
	}, [match, history, apiPlantTimeInfo]);

	const handleOnChangeSelect = (e: any) => {
		const urlDate = match.params.date;
		regionOptions.some(res => {
			if (res.value === e.value) {
				setSelectRegionValue(res);
				history.push(
					`/region/${res.value}/${moment(urlDate).format(
						'YYYYMMDD',
					)}`,
				);
			}
			return res.value === e.value;
		});
	};

	return (
		<GlobalStyled.Body>
			<GlobalStyled.Container>
				<GlobalStyled.HeightRow padding="1rem">
					<GlobalStyled.FadeInUpRow bottom={1}>
						<GlobalStyled.Col fontSize="1.333rem" width={50}>
							<b>지역 발전량 비교분석</b>
						</GlobalStyled.Col>
						<GlobalStyled.RightCol width={50}>
							<InquiryDate date={inquiryDate} />
						</GlobalStyled.RightCol>
					</GlobalStyled.FadeInUpRow>
					<GlobalStyled.FadeInUpRow bottom={2}>
						<Select
							width={'14rem'}
							options={regionOptions}
							value={selectRegionValue}
							onChange={handleOnChangeSelect}
						/>
					</GlobalStyled.FadeInUpRow>
					<GlobalStyled.FadeInUpRow bottom={2}>
						<GlobalStyled.CenterCol width={50}>
							<PlantMap info={mapInfo} />
						</GlobalStyled.CenterCol>
						<GlobalStyled.Col width={50}>
							<PlantStatusTable
								infos={apiPlantList.list
									.map((res: any) => {
										return {
											...res,
											plant_name: exposureSecurity(
												res.plant_name,
												2,
											),
										};
									})
									.filter((res: any, i: number) => {
										return i < 6;
									})}
							/>
						</GlobalStyled.Col>
					</GlobalStyled.FadeInUpRow>
				</GlobalStyled.HeightRow>
				<GlobalStyled.HeightRow bottom={1}>
					<PlantTimeContentList infos={plantTimeInfos} />
				</GlobalStyled.HeightRow>
				<GlobalStyled.HeightRow padding="1rem">
					<GlobalStyled.Title>
						최근 일주일 {selectRegionValue.label} 발전시간 그래프
					</GlobalStyled.Title>
					<BarChart
						infos={weekPlantTimeChartInfos}
						leftTickFormat="시간"
						keys={['발전시간']}
						leftMargin={50}
						maxValue={6}
					/>
				</GlobalStyled.HeightRow>
				<GlobalStyled.HeightRow padding="1rem">
					<GlobalStyled.Title bottom={1}>
						지역 발전소 둘러보기
					</GlobalStyled.Title>
					<PlantRankingInfo
						info={{
							region: `${selectRegionValue.label}`,
							ranking: '상위 1~5위',
							plantName: '** 발전소',
							address: '',
							plantTime: '구경하기',
							to: `/ranking/${selectRegionValue.value}/${moment(
								inquiryDate,
							).format('YYYYMMDD')}`,
						}}
					/>
				</GlobalStyled.HeightRow>
			</GlobalStyled.Container>
		</GlobalStyled.Body>
	);
};

export default RegionPage;
