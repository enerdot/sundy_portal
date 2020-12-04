import React, { useState } from 'react';
import styled from 'styled-components';
// import useSWR from 'swr';

import GlobalStyled from 'style/GlobalStyled';
import SwitchButton from 'components/Atoms/SwitchButton';

import Calendar from 'components/Atoms/Calendar';
import GradationBar from 'components/Atoms/GradationBar';
import ValueLabelContentList from 'components/Molecules/ValueLabelContentList';
import CompanyLinkCards from 'components/Molecules/CompanyLinkCards';
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
	const [isViewTypeAvg, setIsViewTypeAvg] = useState(false);

	const [plantTimeInfos] = useState([
		{
			value: '-',
			label: '전국 평균 발전시간',
		},
		{
			value: '-',
			label: '전국 최고 발전시간',
		},
	]);

	return (
		<GlobalStyled.Body>
			<GlobalStyled.Container>
				<GlobalStyled.ContentRow>
					<GlobalStyled.Row>
						<Calendar>
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

					<GlobalStyled.Row>
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
				</GlobalStyled.ContentRow>
				<GlobalStyled.ContentRow>
					<GlobalStyled.Row>
						<ValueLabelContentList infos={plantTimeInfos} />
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
