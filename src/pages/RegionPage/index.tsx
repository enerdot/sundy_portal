import React, { useState, useMemo, useEffect } from 'react';
import styled from 'styled-components';
import useSWR from 'swr';

import GlobalStyled from 'style/GlobalStyled';

import useCurrentUser from 'hooks/useCurrentUser';
import useAPI from 'hooks/useAPI';
import Select from 'components/Atoms/Select';

import { regionOptions } from 'config/region';
import PlantMap from 'components/Atoms/PlantMap';
import PlantOpacityTable from 'components/Molecules/PlantOpacityTable';
import PlantTimeContentList from 'components/Molecules/PlantTimeContentList';
import PlantRankingInfo from 'components/Atoms/PlantRankingInfo';

const Styled = {
	Wrapper: styled(GlobalStyled.Row)``,
	GrayText: styled.span`
		color: ${props => props.theme.gray};
	`,
	TableWrapper: styled(GlobalStyled.RightCol)`
		align-items: flex-start;
	`,
};

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

	const { currentUser } = useCurrentUser();

	const [API] = useMemo(useAPI, []);

	const { data: customName, error } = useSWR('/get/all');

	useEffect(() => {
		const urlRegion = match.params.region;
		let resultSelectValue = regionOptions[0];
		let isValue = false;
		if (urlRegion) {
			regionOptions.map(res => {
				if (res.value === urlRegion) {
					resultSelectValue = res;
					isValue = true;
				}
				return res;
			});
			if (isValue) {
				setPlantTimeInfos([
					{
						value: '-',
						label: `${resultSelectValue.label} 평균 발전시간`,
					},
					{
						value: '-',
						label: `${resultSelectValue.label} 최고 발전시간`,
					},
				]);
				setSelectRegionValue(resultSelectValue);
			} else {
				history.push(`/region/${regionOptions[0].value}`);
			}
		} else {
			history.push(`/region/${regionOptions[0].value}`);
		}
	}, [match, location, history]);

	const handleOnChangeSelect = (e: any) => {
		regionOptions.some(res => {
			if (res.value === e.value) {
				setSelectRegionValue(res);
				console.log(location, match);
				history.push(`/region/${res.value}`);
			}
			return res.value === e.value;
		});
	};

	const handleSubmit = async (): Promise<void> => {
		try {
			await API.APIs.getAll();
			console.log(API);
		} catch (err: any) {
			console.log('err : ', err);
		}
	};

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
							<Styled.GrayText>
								조회일 2020년 11월 26일
							</Styled.GrayText>
						</GlobalStyled.RightCol>
					</GlobalStyled.Row>
					<GlobalStyled.Row>
						<GlobalStyled.CenterCol width={50}>
							<PlantMap />
						</GlobalStyled.CenterCol>
						<GlobalStyled.Col width={50}>
							<PlantOpacityTable />
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
				</GlobalStyled.ContentRow>
				<GlobalStyled.ContentRow>
					<GlobalStyled.Title bottom={1}>
						이웃 발전소 구경
					</GlobalStyled.Title>
					<GlobalStyled.Link to="/">
						<PlantRankingInfo
							info={{
								region: `${selectRegionValue.label}`,
								ranking: '상위 1~10위',
								plantName: '** 발전소',
								address: '',
								plantTime: '구경하기',
							}}
						/>
					</GlobalStyled.Link>
				</GlobalStyled.ContentRow>
			</GlobalStyled.Container>
		</GlobalStyled.Body>
	);
};

export default RegionPage;
