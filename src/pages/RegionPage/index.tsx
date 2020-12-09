import React, { useState, useEffect } from 'react';
// import useSWR from 'swr';
import moment from 'moment';

import GlobalStyled from 'style/GlobalStyled';

// import useCurrentUser from 'hooks/useCurrentUser';
// import useAPI from 'hooks/useAPI';
import Select from 'components/Atoms/Select';

import { regionOptions } from 'config/region';
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

const RegionPage = ({
	match,
	location,
	history,
}: RegionPageInterface): JSX.Element => {
	const [selectRegionValue, setSelectRegionValue] = useState(
		regionOptions[0],
	);

	const [plantTimeInfos, setPlantTimeInfos] = useState([
		{
			value: '-',
			label: '- 평균 발전시간',
		},
		{
			value: '-',
			label: '- 최고 발전시간',
		},
	]);

	const [inquiryDate, setInquiryDate] = useState(moment());

	// const { currentUser } = useCurrentUser();

	// const [API] = useMemo(useAPI, []);

	// const { data: customName, error } = useSWR('/get/all');

	useEffect(() => {
		const urlRegion = isRegionUrl(match);
		const urlDate = isDateUrl(match);

		if (urlRegion.isUrl && urlDate.isUrl) {
			setPlantTimeInfos([
				{
					value: '-',
					label: `${urlRegion.value.label} 평균 발전시간`,
				},
				{
					value: '-',
					label: `${urlRegion.value.label} 최고 발전시간`,
				},
			]);
			setSelectRegionValue(urlRegion.value);
			setInquiryDate(urlDate.value);
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
	}, [match, history]);

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
							<PlantMap />
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
