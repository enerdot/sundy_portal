import React, { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import moment from 'moment';

import GlobalStyled from 'style/GlobalStyled';

import RegionPlantTimeCard from 'components/Atoms/RegionPlantTimeCard';
import PlantMap from 'components/Atoms/PlantMap';

import { regionLinkUrl } from 'config/region';

import {
	SeoulAndGyeonggiDo,
	Chungbuk,
	Chungnam,
	Gangwon,
	Gyeongbuk,
	Gyeongnam,
	Jeonbuk,
	Jeonnam,
	Jeju,
} from 'images/PlantMap';

const Animation = {
	line: ({ strokeDashoffset }: { strokeDashoffset: any }) => keyframes`
    0%{
      stroke-dashoffset : 1000;
    }
    100%{
      stroke-dashoffset: ${strokeDashoffset};
    }
  `,
	marker: ({ info }: { info: any }) => keyframes`
    0%{
      top: ${info.top - 30}px;
    }
    100%{
      top: ${info.top}px;
    }
  `,
};

const Styled = {
	Body: styled(GlobalStyled.Row)``,
	MapContainer: styled.div`
		display: flex;
		width: 100%;
		justify-content: center;
		border-radius: 0.7rem;
		background-color: none;
	`,
	MapBox: styled.div`
		display: flex;
		justify-content: center;
	`,
	MapImg: styled.img``,
	Col: styled(GlobalStyled.Col)`
		height: 100%;
		position: relative;
		flex-direction: column;
	`,
	AreaCardView: styled(GlobalStyled.Card)`
		padding: 0.5rem 1rem;
		border-radius: 0.5rem;
		border: 0.1rem solid ${props => props.theme.darkGray};
		background-color: ${props => props.theme.white};
		flex-direction: column;
		font-weight: bold;
		margin-bottom: 1rem;
		height: auto;
	`,
	CustomCardView: styled.div<{ info: any }>`
		position: absolute;
		width: 8rem;
		top: ${props => props.info.top}px;
		left: ${props => props.info.left}px;
		right: ${props => props.info.right}px;
		flex-direction: column;
		z-index: 11;
	`,
	AreaTitle: styled.div`
		/* font-size :0.875rem; */
		font-size: 1rem;
		margin-bottom: 0.5rem;
	`,
	AreaBottom: styled.div`
		font-size: 1rem;
		text-align: right;
		span {
			font-size: 1.25rem;
			margin-right: 0.25rem;
		}
	`,
	MarkerSection: styled.div<{ info: any }>`
		position: absolute;
		width: ${props => props.info.width}px;
		height: ${props => props.info.height};
		top: ${props => props.info.top}px;
		left: ${props => props.info.left}px;
		z-index: 10;
		svg {
			path {
				stroke-dasharray: 1000;
				stroke-dashoffset: ${props => props.info.strokeDashoffset};
				animation: ${props =>
						Animation.line(props.info.strokeDashoffset)}
					1s;
			}
		}
	`,
	JejuMarkerSection: styled.div<{ info: any }>`
		position: absolute;
		width: ${props => props.info.width};
		height: ${props => props.info.height};
		top: ${props => props.info.top}px;
		left: ${props => props.info.left}px;
		right: ${props => props.info.right}px;
		z-index: 10;
	`,
	MiniMapMarker: styled.div<{ info: any }>`
		width: 14px;
		position: absolute;
		top: ${props => props.info.top}px;
		left: ${props => props.info.left}px;
		right: ${props => props.info.right}px;
		z-index: 10;
		animation: ${props => Animation.marker(props)} 1.5s;
		svg {
			path {
				fill: #ffa000;
				stroke: #7c7c7c;
			}
		}
	`,
	MapCol: styled(GlobalStyled.Col)`
		position: relative;
		min-width: 160px;
		padding-top: 2.5rem;
	`,
};

//882 898

const pcLeftPosition = 0;
const pcRightPosition = -52;
const topPosition = 38;
const defaultWidth = 100;

const positionLocation = {
	seoul: {
		width: defaultWidth,
		height: '58px',
		top: topPosition,
		left: pcLeftPosition,
		strokeDashoffset: 882,
	},
	chungnam: {
		width: defaultWidth,
		height: '58px',
		top: 80 + topPosition,
		left: pcLeftPosition,
		strokeDashoffset: 898,
	},
	jeonbuk: {
		width: defaultWidth,
		height: '58px',
		top: 150 + topPosition,
		left: pcLeftPosition,
		strokeDashoffset: 887,
	},
	jeonnam: {
		width: defaultWidth,
		height: '78px',
		top: 210 + topPosition,
		left: pcLeftPosition,
		strokeDashoffset: 874,
	},
	gangwon: {
		width: defaultWidth,
		height: '78px',
		top: 10 + topPosition,
		left: pcRightPosition,
		strokeDashoffset: 871,
	},
	chungbuk: {
		width: defaultWidth,
		height: '80px',
		top: 84 + topPosition,
		left: -20 + pcRightPosition,
		strokeDashoffset: 847,
	},
	gyeongbuk: {
		width: defaultWidth,
		height: '72px',
		top: 130 + topPosition,
		left: 6 + pcRightPosition,
		strokeDashoffset: 862,
	},
	gyeongnam: {
		width: defaultWidth,
		height: '91px',
		top: 185 + topPosition,
		left: 10 + pcRightPosition,
		strokeDashoffset: 848,
	},
	jeju: {
		width: defaultWidth,
		height: '91px',
		top: 292,
		right: 0,
		left: 22,
		strokeDashoffset: 978,
	},
};

const jejuCardView = {
	top: 264,
	left: 46,
	right: 46,
};
interface MiniMapInterface {
	info: any;
	selectDate: any;
}

const RegionPlantMap = (props: MiniMapInterface) => {
	const { info, selectDate } = props;

	const {
		seoul,
		chungnam,
		jeonbuk,
		jeonnam,
		gangwon,
		chungbuk,
		gyeongbuk,
		gyeongnam,
		jeju,
	} = info;

	const [levelInfo, setLevelInfo] = useState({
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

	useEffect(() => {
		const maxPlantTime = 6;
		const minPlantTime = 0;
		let result: any = {
			seoul: 1,
			chungnam: 1,
			jeonbuk: 1,
			jeonnam: 1,
			gangwon: 1,
			chungbuk: 1,
			gyeongbuk: 1,
			gyeongnam: 1,
			jeju: 1,
		};
		Object.keys(info).map((res: string) => {
			result[res] =
				Math.round(info[res]) <= minPlantTime
					? 1
					: Math.round(info[res]) > maxPlantTime
					? 5
					: Math.round(info[res]);
			return res;
		});
		setLevelInfo(result);
	}, [info]);

	return (
		<Styled.Body>
			<Styled.MapContainer>
				<Styled.Col width={35}>
					<GlobalStyled.Row bottom={2}>
						<RegionPlantTimeCard
							value={seoul}
							label="서울 경기"
							to={`/region/${regionLinkUrl.seoul}/${moment(
								selectDate,
							).format('YYYYMMDD')}`}
						/>
					</GlobalStyled.Row>

					<GlobalStyled.Row bottom={2}>
						<RegionPlantTimeCard
							value={chungnam}
							label="충청 남도"
							to={`/region/${regionLinkUrl.chungnam}/${moment(
								selectDate,
							).format('YYYYMMDD')}`}
						/>
					</GlobalStyled.Row>

					<GlobalStyled.Row bottom={2}>
						<RegionPlantTimeCard
							value={jeonbuk}
							label="전라 북도"
							to={`/region/${regionLinkUrl.jeonbuk}/${moment(
								selectDate,
							).format('YYYYMMDD')}`}
						/>
					</GlobalStyled.Row>

					<GlobalStyled.Row bottom={0}>
						<RegionPlantTimeCard
							value={jeonnam}
							label="전라 남도"
							to={`/region/${regionLinkUrl.jeonnam}/${moment(
								selectDate,
							).format('YYYYMMDD')}`}
						/>
					</GlobalStyled.Row>
				</Styled.Col>

				<Styled.MapCol>
					<Styled.MapBox>
						<PlantMap info={levelInfo} />
					</Styled.MapBox>

					<Styled.MarkerSection info={positionLocation.seoul}>
						<SeoulAndGyeonggiDo />
					</Styled.MarkerSection>
					<Styled.MarkerSection info={positionLocation.chungnam}>
						<Chungnam />
					</Styled.MarkerSection>
					<Styled.MarkerSection info={positionLocation.jeonbuk}>
						<Jeonbuk />
					</Styled.MarkerSection>
					<Styled.MarkerSection info={positionLocation.jeonnam}>
						<Jeonnam />
					</Styled.MarkerSection>

					<Styled.CustomCardView info={jejuCardView}>
						<RegionPlantTimeCard
							value={jeju}
							label="제주도"
							to={`/region/${regionLinkUrl.jeju}/${moment(
								selectDate,
							).format('YYYYMMDD')}`}
						/>
					</Styled.CustomCardView>

					<Styled.JejuMarkerSection info={positionLocation.jeju}>
						<Jeju />
					</Styled.JejuMarkerSection>
				</Styled.MapCol>

				<Styled.Col width={35}>
					<GlobalStyled.Row bottom={2}>
						<RegionPlantTimeCard
							value={gangwon}
							label="강원도"
							to={`/region/${regionLinkUrl.gangwon}/${moment(
								selectDate,
							).format('YYYYMMDD')}`}
						/>
					</GlobalStyled.Row>

					<Styled.MarkerSection info={positionLocation.gangwon}>
						<Gangwon />
					</Styled.MarkerSection>

					<GlobalStyled.Row bottom={2}>
						<RegionPlantTimeCard
							value={chungbuk}
							label="충청 북도"
							to={`/region/${regionLinkUrl.chungbuk}/${moment(
								selectDate,
							).format('YYYYMMDD')}`}
						/>
					</GlobalStyled.Row>

					<Styled.MarkerSection info={positionLocation.chungbuk}>
						<Chungbuk />
					</Styled.MarkerSection>

					<GlobalStyled.Row bottom={2}>
						<RegionPlantTimeCard
							value={gyeongbuk}
							label="경상 북도"
							to={`/region/${regionLinkUrl.gyeongbuk}/${moment(
								selectDate,
							).format('YYYYMMDD')}`}
						/>
					</GlobalStyled.Row>

					<Styled.MarkerSection info={positionLocation.gyeongbuk}>
						<Gyeongbuk />
					</Styled.MarkerSection>

					<GlobalStyled.Row bottom={2}>
						<RegionPlantTimeCard
							value={gyeongnam}
							label="경상 남도"
							to={`/region/${regionLinkUrl.gyeongnam}/${moment(
								selectDate,
							).format('YYYYMMDD')}`}
						/>
					</GlobalStyled.Row>

					<Styled.MarkerSection info={positionLocation.gyeongnam}>
						<Gyeongnam />
					</Styled.MarkerSection>
				</Styled.Col>
			</Styled.MapContainer>
		</Styled.Body>
	);
};

RegionPlantMap.defaultProps = {
	info: {
		seoul: 0,
		chungnam: 0,
		jeonbuk: 0,
		jeonnam: 0,
		gangwon: 0,
		chungbuk: 0,
		gyeongbuk: 0,
		gyeongnam: 0,
		jeju: 0,
	},
};

export default RegionPlantMap;
