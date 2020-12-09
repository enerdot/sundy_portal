import React, { useState, useEffect } from 'react';
import moment from 'moment';
// import useSWR from 'swr';

import GlobalStyled from 'style/GlobalStyled';

// import useCurrentUser from 'hooks/useCurrentUser';
// import useAPI from 'hooks/useAPI';
import { regionOptions } from 'config/region';
import { isRegionUrl, isDateUrl } from 'utils/url';

import PlantRankingList from 'components/Molecules/PlantRankingList';
import InquiryDate from 'components/Atoms/InquiryDate';

interface RankingPageInterface {
	match: any;
	location: any;
	history: any;
}

const RankingPage = ({
	match,
	location,
	history,
}: RankingPageInterface): JSX.Element => {
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

	const [region, setRegion] = useState(regionOptions[0].label);

	const [inquiryDate, setInquiryDate] = useState(moment());

	const [rankingInfos, setRankingInfos] = useState([
		{
			region: '-',
			ranking: '-',
			plantName: '-',
			address: '-',
			plantTime: '-',
		},
	]);

	useEffect(() => {
		const urlRegion = isRegionUrl(match);
		const urlDate = isDateUrl(match);
		const rankingNumber: any = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

		if (urlRegion.isUrl && urlDate.isUrl) {
			setRegion(urlRegion.value.label);
			setInquiryDate(urlDate.value);
			setRankingInfos(
				rankingNumber.map((res: any, i: number) => {
					return {
						region: '',
						ranking: i + 1,
						plantName: '-',
						address: urlRegion.value.label,
						plantTime: '-',
					};
				}),
			);
		} else {
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

	return (
		<GlobalStyled.Body>
			<GlobalStyled.Container>
				<GlobalStyled.Row bottom={1}>
					<InquiryDate date={inquiryDate} />
				</GlobalStyled.Row>
				<PlantRankingList region={region} infos={rankingInfos} />
			</GlobalStyled.Container>
		</GlobalStyled.Body>
	);
};

export default RankingPage;
