import React, { useState, useEffect } from 'react';
import moment from 'moment';
import Swal from 'sweetalert2';
// import useSWR from 'swr';

import GlobalStyled from 'style/GlobalStyled';

// import useCurrentUser from 'hooks/useCurrentUser';
// import useAPI from 'hooks/useAPI';
import { isDateUrl } from 'utils/url';
import { globalSwal } from 'config/alert';
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

	// const { data: customName, error } = useSWR('/get/all');

	// const handleSubmit = async (): Promise<void> => {
	// 	try {
	// 		await API.APIs.getAll();
	// 		console.log(API);
	// 	} catch (err: any) {
	// 		console.log('err : ', err);
	// 	}
	// };

	const [plantTimeInfos, setPlantTimeInfos] = useState([
		{
			value: '-',
			label: '오늘 총 누적 발전시간',
		},
		{
			value: '-',
			label: '발전시간',
		},
	]);

	const [plantInfo, setPlantInfo] = useState({
		plantName: '-',
		address: '-',
		capacity: '-',
		equipmentInfos: [{ name: '-', value: '-' }],
	});

	const [inquiryDate, setInquiryDate] = useState(moment());

	useEffect(() => {
		const urlDate = isDateUrl(match);
		if (urlDate.isUrl) {
			setInquiryDate(urlDate.value);
		} else {
			Swal.fire(globalSwal.urlErr).then(res => history.push('/'));
		}
	}, [match, history]);

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
						<PlantDetailInfo info={plantInfo} />
					</GlobalStyled.Row>
				</GlobalStyled.ContentRow>
				<GlobalStyled.ContentRow bottom={1}>
					<PlantTimeContentList infos={plantTimeInfos} />
				</GlobalStyled.ContentRow>
				<GlobalStyled.ContentRow>
					<GlobalStyled.HeightRow bottom={3}>
						<GlobalStyled.Title bottom={1}>
							오늘 발전 그래프
						</GlobalStyled.Title>
						<BarChart />
					</GlobalStyled.HeightRow>
					<GlobalStyled.HeightRow>
						<GlobalStyled.Title bottom={1}>
							최근 7일 발전 그래프
						</GlobalStyled.Title>
						<BarChart />
					</GlobalStyled.HeightRow>
				</GlobalStyled.ContentRow>
			</GlobalStyled.Container>
		</GlobalStyled.Body>
	);
};

export default InfoPage;
