import React, { useEffect } from 'react';
import moment from 'moment';
import Swal from 'sweetalert2';
import useSWR from 'swr';

import GlobalStyled from 'style/GlobalStyled';

import useCurrentUser from 'hooks/useCurrentUser';
import useAPI from 'hooks/useAPI';
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
	const { currentUser } = useCurrentUser();

	const [API] = useAPI();

	const formatDate = moment(isDateUrl(match).value).format('YYYY-MM-DD');
	const formatId = match.params.id;

	const { data: apiPlantInfo = {}, error } = useSWR(
		`plants/info?plantId=${formatId}&date=${formatDate}`,
	);

	const { data: apiPlantWeatherInfo = {} } = useSWR(
		`plants/weather/hourly?plantId=${formatId}&date=${formatDate}`,
	);

	const {
		data: apiDayTotalPlantPowerInfo = { total_kwh: 0, total_time: 0 },
	} = useSWR(`/plants/kwhbydate?plantId=${formatId}&date=${formatDate}`);

	const {
		data: apiDayPlantPowerChartInfos = [
			1,
			2,
			3,
			4,
			5,
			6,
			7,
			8,
			9,
			10,
			11,
			12,
			13,
			14,
			15,
			16,
			17,
			18,
			19,
			20,
			21,
			22,
			23,
			24,
		],
	} = useSWR(
		`/plants/kwhbydate-graph?plantId=${formatId}&date=${formatDate}`,
	);

	const dayPlantPowerChartInfos = apiDayPlantPowerChartInfos
		? apiDayPlantPowerChartInfos.map((res: any, i: number) => {
				const day = moment().set('hour', 0);
				return {
					id: moment(day).add(i, 'hour').format('HH'),
					발전량: res,
				};
		  })
		: [{ 0: 0, value: 0 }];

	const { data: apiWeekPlantPowerChartInfos = [] } = useSWR(
		`/plants/kwhfordays-graph?plantId=${formatId}&startDate=${moment(
			match.params.date,
		)
			.add(-6, 'days')
			.format('YYYY-MM-DD')}&endDate=${moment(match.params.date).format(
			'YYYY-MM-DD',
		)}
		&date=${formatDate}
		
		`,
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

	// const [plantInfo, setPlantTimeInfos] = useState({
	// 	plantName: '-',
	// 	address: '-',
	// 	capacity: '-',
	// 	equipmentInfos: [{ name: '-', value: '-' }],
	// });

	// const [inquiryDate, setInquiryDate] = useState(moment());

	// useEffect(() => {
	// 	if (urlDate.isUrl) {
	// 		const {
	// 			inverter,
	// 			module: moduleName,
	// 			module_bearing,
	// 			plant_kwatt,
	// 			plant_loc,
	// 			plant_name,
	// 		} = apiPlantInfo;
	// 		setInquiryDate(urlDate.value);
	// 		setPlantTimeInfos({
	// 			plantName: plant_name,
	// 			address: plant_loc,
	// 			capacity: plant_kwatt,
	// 			equipmentInfos: [
	// 				{ name: '인버터', value: inverter },
	// 				{ name: '모듈', value: moduleName },
	// 				{ name: '모듈방향', value: module_bearing },
	// 			],
	// 		});
	// 	} else {
	// 		Swal.fire(globalSwal.urlErr).then(res => history.push('/'));
	// 	}
	// }, [match, history, apiPlantInfo]);

	useEffect(() => {
		const formatDateUrl = isDateUrl(match);
		if (formatDateUrl.isUrl) {
			if (currentUser) {
				if (error) {
					if (error.response.status === 403) {
						Swal.fire({
							icon: 'warning',
							title: `${moment(formatDateUrl.value).format(
								'MM월DD일',
							)}의 \n지역발전소를 구경하시겠어요?`,
							text:
								'발전소 위치, 용량, 설비 정보와 발전량 그래프를 \n확인해 볼 수 있습니다.',
							showConfirmButton: true,
							showCancelButton: true,
							confirmButtonText: '결제하기',
							cancelButtonText: '돌아가기',
							preConfirm: async () => {
								try {
									await API.token.payment({
										contents: 'plants_per_date',
										date: moment(
											formatDateUrl.value,
										).format('YYYY-MM-DD'),
									});
								} catch (err) {
									await Swal.fire(globalSwal.apiErr);
								}
							},
						}).then(({ isConfirmed }: any) => {
							if (isConfirmed) {
								window.location.reload();
							} else {
								history.push('/');
							}
						});
					}
				}
			} else {
				Swal.fire(globalSwal.userErr).then(res =>
					history.push('/login'),
				);
			}
		} else {
			Swal.fire(globalSwal.urlErr).then(res => history.push('/'));
		}
		// eslint-disable-next-line
	}, [match, history, API.token, currentUser]);

	return (
		<GlobalStyled.Body>
			<GlobalStyled.Container>
				<GlobalStyled.HeightRow padding="1rem">
					<GlobalStyled.FadeInUpRow>
						<GlobalStyled.RightCol width={100}>
							<InquiryDate date={formatDate} />
						</GlobalStyled.RightCol>
					</GlobalStyled.FadeInUpRow>
					<GlobalStyled.FadeInUpRow>
						<PlantDetailInfo
							info={{
								plantName: apiPlantInfo.plant_name,
								address: apiPlantInfo.plant_loc,
								capacity: apiPlantInfo.plant_kwatt,
								equipmentInfos: [
									{
										name: '인버터',
										value: apiPlantInfo.inverter,
									},
									{
										name: '모듈',
										value: apiPlantInfo.moduleName
											? apiPlantInfo.moduleName
											: '-',
									},
									{
										name: '모듈방향',
										value: apiPlantInfo.module_bearing
											? apiPlantInfo.module_bearing
											: '-',
									},
								],
							}}
							weatherInfo={apiPlantWeatherInfo}
						/>
					</GlobalStyled.FadeInUpRow>
				</GlobalStyled.HeightRow>
				<GlobalStyled.HeightRow bottom={1}>
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
				</GlobalStyled.HeightRow>
				<GlobalStyled.HeightRow>
					<GlobalStyled.HeightRow padding="1rem" bottom={1}>
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
					<GlobalStyled.HeightRow padding="1rem">
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
				</GlobalStyled.HeightRow>
			</GlobalStyled.Container>
		</GlobalStyled.Body>
	);
};

export default InfoPage;
