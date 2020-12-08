import React from 'react';
import styled from 'styled-components';

import GlobalStyled from 'style/GlobalStyled';

import { PlantMap as PlantMapSvg } from 'images/PlantMap';

const Styled = {
	Wrapper: styled.div`
		#region_plant_map {
			#seoulAndGyeonggiDo {
			}
			#chungnam {
			}
			#jeonbuk {
			}
			#jeonnam {
			}
			#gangwon {
			}
			#chungbuk {
			}
			#gyeongbuk {
			}
			#gyeongnam {
			}
			#jeju {
			}
		}
	`,
};

// const regionLevelTheme = {
// 	1: '',
// 	2: '',
// 	3: '',
// 	4: '',
// 	5: '',
// };

interface PlantMapInterface {
	info: any;
}

const PlantMap = (props: PlantMapInterface) => {
	const { info } = props;
	return (
		<Styled.Wrapper>
			<PlantMapSvg />
		</Styled.Wrapper>
	);
};
PlantMap.defaultProps = {
	info: {
		seoulAndGyeonggiDo: 0,
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
