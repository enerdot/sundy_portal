import React, { useState, useEffect } from 'react';
import moment from 'moment';
import Swal from 'sweetalert2';
import useSWR from 'swr';

import GlobalStyled from 'style/GlobalStyled';

// import useCurrentUser from 'hooks/useCurrentUser';
// import useAPI from 'hooks/useAPI';
import { isDateUrl } from 'utils/url';
import globalSwal from 'config/alert';
import InquiryDate from 'components/Atoms/InquiryDate';
import PlantDetailInfo from 'components/Organisms/PlantDetailInfo';
import PlantTimeContentList from 'components/Molecules/PlantTimeContentList';
import BarChart from 'components/Atoms/BarChart';

interface InfoPageInterface {
	match: any;
	location: any;
	history: any;
}

const InfoPage = ({
	match,
	location,
	history,
}: InfoPageInterface): JSX.Element => {
	// const { currentUser } = useCurrentUser();

	// const [API] = useMemo(useAPI, []);

	const { data: apiPlantInfo = {} } = useSWR(
		`plants/info?plantId=${match.params.id}`,
	);

	const { data: apiPlantWeatherInfo = {} } = useSWR(
		`plants/weather/hourly?plantId=${match.params.id}&date=${moment(
			match.params.date,
		).format('YYYY-MM-DD')}`,
	);

	const {
		data: apiDayTotalPlantPowerInfo = { total_kwh: 0, total_time: 0 },
	} = useSWR(
		`/plants/kwhbydate?plantId=${match.params.id}&date=${moment(
			match.params.date,
		).format('YYYY-MM-DD')}`,
	);

	const { data: apiDayPlantPowerChartInfos = [] } = useSWR(
		`/plants/kwhbydate-graph?plantId=${match.params.id}&date=${moment(
			match.params.date,
		).format('YYYY-MM-DD')}`,
	);

	const dayPlantPowerChartInfos = apiDayPlantPowerChartInfos.map(
		(res: any, i: number) => {
			const day = moment().set('hour', 0);
			return {
				id: moment(day).add(i, 'hour').format('HH'),
				발전량: res,
			};
		},
	);

	const { data: apiWeekPlantPowerChartInfos = [] } = useSWR(
		`/plants/kwhfordays-graph?plantId=${match.params.id}&startDate=${moment(
			match.params.date,
		)
			.add(-6, 'days')
			.format('YYYY-MM-DD')}&endDate=${moment(match.params.date).format(
			'YYYY-MM-DD',
		)}`,
	);

	const weekPlantPowerChartInfos = apiWeekPlantPowerChartInfos.map(
		(res: any, i: number) => {
			return {
				id: moment(match.params.date)
					.add(-7 + i, 'days')
					.format('MM-DD'),
				발전량: res,
			};
		},
	);

	// const handleSubmit = async (): Promise<void> => {
	// 	try {
	// 		await API.APIs.getAll();
	// 		console.log(API);
	// 	} catch (err: any) {
	// 		console.log('err : ', err);
	// 	}
	// };

	const [plantInfo, setPlantTimeInfos] = useState({
		plantName: '-',
		address: '-',
		capacity: '-',
		equipmentInfos: [{ name: '-', value: '-' }],
	});

	const [inquiryDate, setInquiryDate] = useState(moment());

	useEffect(() => {
		const urlDate = isDateUrl(match);
		if (urlDate.isUrl) {
			const {
				inverter,
				module: moduleName,
				module_bearing,
				plant_kwatt,
				plant_loc,
				plant_name,
			} = apiPlantInfo;
			setInquiryDate(urlDate.value);
			setPlantTimeInfos({
				plantName: plant_name,
				address: plant_loc,
				capacity: plant_kwatt,
				equipmentInfos: [
					{ name: '인버터', value: inverter },
					{ name: '모듈', value: moduleName },
					{ name: '모듈방향', value: module_bearing },
				],
			});
		} else {
			Swal.fire(globalSwal.urlErr).then(res => history.push('/'));
		}
	}, [match, history, apiPlantInfo]);

	return (
		<GlobalStyled.Body>
			<GlobalStyled.Container>
				<GlobalStyled.ContentRow>
					<GlobalStyled.Row>
						<GlobalStyled.RightCol width={100}>
							<InquiryDate date={inquiryDate} />
						</GlobalStyled.RightCol>
					</GlobalStyled.Row>
					<GlobalStyled.Row>
						<PlantDetailInfo
							info={plantInfo}
							weatherInfo={apiPlantWeatherInfo}
						/>
					</GlobalStyled.Row>
				</GlobalStyled.ContentRow>
				<GlobalStyled.ContentRow bottom={1}>
					<PlantTimeContentList
						infos={[
							{
								value: `${apiDayTotalPlantPowerInfo.total_kwh} kWh`,
								label: '오늘 총 누적 발전량',
							},
							{
								value: `${apiDayTotalPlantPowerInfo.total_time} 시간`,
								label: '발전시간',
							},
						]}
					/>
				</GlobalStyled.ContentRow>
				<GlobalStyled.ContentRow>
					<GlobalStyled.HeightRow bottom={3}>
						<GlobalStyled.Title bottom={1}>
							오늘 발전 그래프
						</GlobalStyled.Title>
						<BarChart
							infos={dayPlantPowerChartInfos}
							keys={['발전량']}
							leftTickFormat="kWh"
							leftMargin={50}
							axisBottomTickValues={[
								'00',
								'02',
								'04',
								'06',
								'08',
								'10',
								'12',
								'14',
								'16',
								'18',
								'20',
								'22',
							]}
						/>
					</GlobalStyled.HeightRow>
					<GlobalStyled.HeightRow>
						<GlobalStyled.Title bottom={1}>
							최근 7일 발전 그래프
						</GlobalStyled.Title>
						<BarChart
							infos={weekPlantPowerChartInfos}
							keys={['발전량']}
							leftTickFormat="kWh"
							leftMargin={60}
						/>
					</GlobalStyled.HeightRow>
				</GlobalStyled.ContentRow>
			</GlobalStyled.Container>
		</GlobalStyled.Body>
	);
};

export default InfoPage;
