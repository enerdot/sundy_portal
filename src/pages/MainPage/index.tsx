import React, { useState } from 'react';
import styled from 'styled-components';
import useSWR from 'swr';
import moment from 'moment';

import GlobalStyled from 'style/GlobalStyled';
import SwitchButton from 'components/Atoms/SwitchButton';

import Calendar from 'components/Atoms/Calendar';
import GradationBar from 'components/Atoms/GradationBar';
import PlantTimeContentList from 'components/Molecules/PlantTimeContentList';
import CompanyLinkCards from 'components/Molecules/CompanyLinkCards';
import RegionPlantMap from 'components/Molecules/RegionPlantMap';
// import useCurrentUser from 'hooks/useCurrentUser';
// import useAPI from 'hooks/useAPI';

const Styled = {
	CalendarSmallInfo: styled.div`
		font-size: 1rem;
		color: ${props => props.theme.gray};
	`,
	CalendarContent: styled(GlobalStyled.Row)``,
};

const MainPage = (): JSX.Element => {
	// const { currentUser } = useCurrentUser();

	// const [API] = useMemo(useAPI, []);

	// const handleSubmit = async (): Promise<void> => {
	// 	try {
	// 		await API.APIs.getAll();
	// 		console.log(API);
	// 	} catch (err: any) {
	// 		console.log('err : ', err);
	// 	}
	// };

	const [isViewTypeAvg, setIsViewTypeAvg] = useState(false);

	const [calendarInfo, setCalendarInfo] = useState({
		startDate: new Date(),
		endDate: new Date(),
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

	const regionPlantTimeInfo = avgData
		? {
				seoul: avgData.region[0].energy_today_total,
				chungnam: avgData.region[3].energy_today_total,
				jeonbuk: avgData.region[4].energy_today_total,
				jeonnam: avgData.region[5].energy_today_total,
				gangwon: avgData.region[1].energy_today_total,
				chungbuk: avgData.region[2].energy_today_total,
				gyeongbuk: avgData.region[6].energy_today_total,
				gyeongnam: avgData.region[7].energy_today_total,
				jeju: avgData.region[8].energy_today_total,
		  }
		: {
				seoul: 0,
				chungnam: 0,
				jeonbuk: 0,
				jeonnam: 0,
				gangwon: 0,
				chungbuk: 0,
				gyeongbuk: 0,
				gyeongnam: 0,
				jeju: 0,
		  };

	return (
		<GlobalStyled.Body>
			<GlobalStyled.Container>
				<GlobalStyled.ContentRow>
					<GlobalStyled.Row>
						<Calendar
							info={calendarInfo}
							onChange={setCalendarInfo}
						>
							<Styled.CalendarSmallInfo>
								지역 별 발전소들을 구경해보세요
							</Styled.CalendarSmallInfo>
						</Calendar>
					</GlobalStyled.Row>

					<GlobalStyled.Row bottom={2}>
						<GlobalStyled.RightCol width={100}>
							<SwitchButton
								value={isViewTypeAvg}
								onText={'평균'}
								offText={'최고'}
								onChange={setIsViewTypeAvg}
							/>
						</GlobalStyled.RightCol>
					</GlobalStyled.Row>

					<GlobalStyled.Row bottom={2}>
						<GlobalStyled.RightCol width={100}>
							<GradationBar width={'15rem'}>
								<GlobalStyled.Row>
									<GlobalStyled.Col width={50}>
										0시간
									</GlobalStyled.Col>
									<GlobalStyled.RightCol width={50}>
										6시간
									</GlobalStyled.RightCol>
								</GlobalStyled.Row>
							</GradationBar>
						</GlobalStyled.RightCol>
					</GlobalStyled.Row>

					<GlobalStyled.Row>
						<RegionPlantMap
							info={regionPlantTimeInfo}
							selectDate={calendarInfo.startDate}
						/>
					</GlobalStyled.Row>
				</GlobalStyled.ContentRow>
				<GlobalStyled.ContentRow>
					<GlobalStyled.Row>
						<PlantTimeContentList infos={plantTimeInfos} />
					</GlobalStyled.Row>
				</GlobalStyled.ContentRow>
				<GlobalStyled.ContentRow>
					<CompanyLinkCards />
				</GlobalStyled.ContentRow>
			</GlobalStyled.Container>
		</GlobalStyled.Body>
	);
};

export default MainPage;
