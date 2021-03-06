import React from 'react';
import styled from 'styled-components';

import { PlantMap as PlantMapSvg } from 'images/PlantMap';

const Styled = {
	Wrapper: styled.div<{ info: any }>`
		svg {
			#region_plant_map {
				#seoul {
					fill: ${props =>
						props.theme.colors.levelBlue[props.info.seoul]};
				}
				#chungnam {
					fill: ${props =>
						props.theme.colors.levelBlue[props.info.chungnam]};
				}
				#jeonbuk {
					fill: ${props =>
						props.theme.colors.levelBlue[props.info.jeonbuk]};
				}
				#jeonnam {
					fill: ${props =>
						props.theme.colors.levelBlue[props.info.jeonnam]};
				}
				#gangwon {
					fill: ${props =>
						props.theme.colors.levelBlue[props.info.gangwon]};
				}
				#chungbuk {
					fill: ${props =>
						props.theme.colors.levelBlue[props.info.chungbuk]};
				}
				#gyeongbuk {
					fill: ${props =>
						props.theme.colors.levelBlue[props.info.gyeongbuk]};
				}
				#gyeongnam {
					fill: ${props =>
						props.theme.colors.levelBlue[props.info.gyeongnam]};
				}
				#jeju {
					fill: ${props =>
						props.theme.colors.levelBlue[props.info.jeju]};
				}
			}
		}
	`,
};

interface PlantMapInterface {
	info: any;
}

const PlantMap = (props: PlantMapInterface) => {
	const { info } = props;

	return (
		<Styled.Wrapper info={info}>
			<PlantMapSvg />
		</Styled.Wrapper>
	);
};
PlantMap.defaultProps = {
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

export default PlantMap;
