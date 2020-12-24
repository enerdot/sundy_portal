import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import useSWR from 'swr';
import moment from 'moment';

import GlobalStyled from 'style/GlobalStyled';
import SwitchButton from 'components/atoms/SwitchButton';

import Calendar from 'components/atoms/Calendar';
import GradationBar from 'components/atoms/GradationBar';
import PlantTimeContentList from 'components/molecules/PlantTimeContentList';
import CompanyLinkCards from 'components/molecules/CompanyLinkCards';
import RegionPlantMap from 'components/molecules/RegionPlantMap';
import useCurrentUser from 'hooks/useCurrentUser';
// import useAPI from 'hooks/useAPI';

import { formatRegionPlantTimeDayInfo } from 'utils/api';
import Modal from 'components/atoms/Modal';

const Styled = {
	CalendarSmallInfo: styled.div`
		font-size: 1rem;
		color: ${props => props.theme.gray};
	`,
	CalendarContent: styled(GlobalStyled.FadeInUpRow)``,
};

const MainPage = (): JSX.Element => {
	const { getCurrentUser } = useCurrentUser();

	// console.log('currentUser : ', getCurrentUser());

	// const [API] = useMemo(useAPI, []);

	// const handleSubmit = async (): Promise<void> => {
	// 	try {
	// 		await API.APIs.getAll();
	// 		console.log(API);
	// 	} catch (err: any) {
	// 		console.log('err : ', err);
	// 	}
	// };

	useEffect(() => {
		const test = async () => {
			try {
				await getCurrentUser();
			} catch (err) {
				console.log('get err', err);
			}
		};
		test();
	}, [getCurrentUser]);

	const [isViewTypeAvg, setIsViewTypeAvg] = useState(false);

	const [calendarInfo, setCalendarInfo] = useState({
		startDate: new Date(moment().add(-1, 'days').format('YYYY-MM-DD')),
		endDate: new Date(moment().add(-1, 'days').format('YYYY-MM-DD')),
	});

	const { data: avgData } = useSWR(
		`/total/kwhtime?dataType=${
			isViewTypeAvg ? 'average' : 'max'
		}&date=${moment(calendarInfo.startDate).format('YYYY-MM-DD')}`,
	);

	const plantTimeInfos = avgData
		? [
				{
					value: `${avgData.total.total_avg_time} 시간`,
					label: '전국 평균 발전시간',
				},
				{
					value: `${avgData.total.total_max_time} 시간`,
					label: '전국 최고 발전시간',
				},
		  ]
		: [
				{
					value: '-',
					label: '전국 평균 발전시간',
				},
				{
					value: '-',
					label: '전국 최고 발전시간',
				},
		  ];

	const regionPlantTimeInfo = formatRegionPlantTimeDayInfo(avgData);

	return (
		<GlobalStyled.Body>
			<GlobalStyled.Container>
				<GlobalStyled.HeightRow padding="1rem">
					<GlobalStyled.FadeInUpRow>
						<Calendar
							info={calendarInfo}
							onChange={setCalendarInfo}
						>
							<Styled.CalendarSmallInfo>
								지역 별 발전소들을 구경해보세요
							</Styled.CalendarSmallInfo>
						</Calendar>
					</GlobalStyled.FadeInUpRow>

					<GlobalStyled.FadeInUpRow bottom={2}>
						<GlobalStyled.RightCol width={100}>
							<SwitchButton
								value={isViewTypeAvg}
								onText={'평균'}
								offText={'최고'}
								onChange={setIsViewTypeAvg}
							/>
						</GlobalStyled.RightCol>
					</GlobalStyled.FadeInUpRow>

					<GlobalStyled.FadeInUpRow bottom={2}>
						<GlobalStyled.RightCol width={100}>
							<GradationBar width={'15rem'}>
								<GlobalStyled.FadeInUpRow>
									<GlobalStyled.Col width={50}>
										0시간
									</GlobalStyled.Col>
									<GlobalStyled.RightCol width={50}>
										6시간
									</GlobalStyled.RightCol>
								</GlobalStyled.FadeInUpRow>
							</GradationBar>
						</GlobalStyled.RightCol>
					</GlobalStyled.FadeInUpRow>

					<GlobalStyled.FadeInUpRow>
						<RegionPlantMap
							info={regionPlantTimeInfo}
							selectDate={calendarInfo.startDate}
						/>
					</GlobalStyled.FadeInUpRow>
				</GlobalStyled.HeightRow>
				<GlobalStyled.HeightRow bottom={1}>
					<GlobalStyled.FadeInUpRow>
						<PlantTimeContentList infos={plantTimeInfos} />
					</GlobalStyled.FadeInUpRow>
				</GlobalStyled.HeightRow>
				<GlobalStyled.HeightRow padding="1rem">
					<CompanyLinkCards />
				</GlobalStyled.HeightRow>
			</GlobalStyled.Container>
			<Modal />
		</GlobalStyled.Body>
	);
};

export default MainPage;
