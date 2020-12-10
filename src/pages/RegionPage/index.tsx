import React, { useState, useEffect } from 'react';
import useSWR from 'swr';
import moment from 'moment';

import GlobalStyled from 'style/GlobalStyled';

// import useCurrentUser from 'hooks/useCurrentUser';
// import useAPI from 'hooks/useAPI';
import Select from 'components/Atoms/Select';

import { reverseApiRegionLabel, regionOptions } from 'config/region';
import PlantMap from 'components/Atoms/PlantMap';
import PlantStatusTable from 'components/Molecules/PlantStatusTable';
import PlantTimeContentList from 'components/Molecules/PlantTimeContentList';
import PlantRankingInfo from 'components/Atoms/PlantRankingInfo';
import BarChart from 'components/Atoms/BarChart';
import InquiryDate from 'components/Atoms/InquiryDate';
import { isRegionUrl, isDateUrl } from 'utils/url';

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

	const [inquiryDate, setInquiryDate] = useState(moment());

	// const { currentUser } = useCurrentUser();

	// const [API] = useMemo(useAPI, []);

	const selectApiRegionId =
		reverseApiRegionLabel[selectRegionValue.label as regionType];

	const { data: apiPlantTimeInfo, error } = useSWR(
		`/region/kwhtime?regionGroupId=${selectApiRegionId}&date=${moment(
			inquiryDate,
		).format('YYYY-MM-DD')}`,
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
				let formatState = prevState;
				formatState[urlRegion.value.value] = 5;
				console.log('formatState : ', formatState);
				return formatState;
				// prevState[urlRegion.value.value] = 1
			});
		} else {
			console.log(urlDate, urlRegion);
			history.push(
				`/region/${
					urlRegion.isUrl
						? urlRegion.value.value
						: regionOptions[0].value
				}/${
					urlDate.isUrl
						? moment(urlDate.value).format('YYYYMMDD')
						: moment().format('YYYYMMDD')
				}}`,
			);
		}
	}, [match, history, apiPlantTimeInfo]);

	const handleOnChangeSelect = (e: any) => {
		const urlDate = match.params.date;
		regionOptions.some(res => {
			if (res.value === e.value) {
				setSelectRegionValue(res);
				console.log(location, match);
				history.push(
					`/region/${res.value}/${moment(urlDate).format(
						'YYYYMMDD',
					)}`,
				);
			}
			return res.value === e.value;
		});
	};

	// const handleSubmit = async (): Promise<void> => {
	// 	try {
	// 		await API.APIs.getAll();
	// 		console.log(API);
	// 	} catch (err: any) {
	// 		console.log('err : ', err);
	// 	}
	// };

	return (
		<GlobalStyled.Body>
			<GlobalStyled.Container>
				<GlobalStyled.ContentRow>
					<GlobalStyled.Row bottom={5}>
						<GlobalStyled.Col width={50}>
							<Select
								width={'16rem'}
								options={regionOptions}
								value={selectRegionValue}
								onChange={handleOnChangeSelect}
							/>
						</GlobalStyled.Col>
						<GlobalStyled.RightCol width={50}>
							<InquiryDate date={inquiryDate} />
						</GlobalStyled.RightCol>
					</GlobalStyled.Row>
					<GlobalStyled.Row>
						<GlobalStyled.CenterCol width={50}>
							<PlantMap info={mapInfo} />
						</GlobalStyled.CenterCol>
						<GlobalStyled.Col width={50}>
							<PlantStatusTable />
						</GlobalStyled.Col>
					</GlobalStyled.Row>
				</GlobalStyled.ContentRow>
				<GlobalStyled.ContentRow>
					<PlantTimeContentList infos={plantTimeInfos} />
				</GlobalStyled.ContentRow>
				<GlobalStyled.ContentRow>
					<GlobalStyled.Title>
						최근 일주일 {selectRegionValue.label} 발전시간 그래프
					</GlobalStyled.Title>
					<BarChart leftTickFormat="시간" />
				</GlobalStyled.ContentRow>
				<GlobalStyled.ContentRow>
					<GlobalStyled.Title bottom={1}>
						이웃 발전소 구경
					</GlobalStyled.Title>
					<PlantRankingInfo
						info={{
							region: `${selectRegionValue.label}`,
							ranking: '상위 1~10위',
							plantName: '** 발전소',
							address: '',
							plantTime: '구경하기',
							to: `/ranking/${selectRegionValue.value}/${moment(
								inquiryDate,
							).format('YYYYMMDD')}`,
						}}
					/>
				</GlobalStyled.ContentRow>
			</GlobalStyled.Container>
		</GlobalStyled.Body>
	);
};

export default RegionPage;
