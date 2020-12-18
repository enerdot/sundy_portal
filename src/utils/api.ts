import { reverseRegionLabel } from 'config/region';

type regionLabelType =
	| '서울경기'
	| '강원'
	| '충북'
	| '충남'
	| '전북'
	| '전남'
	| '경북'
	| '경남'
	| '제주';

type regionType =
	| 'seoul'
	| 'chungnam'
	| 'jeonbuk'
	| 'jeonnam'
	| 'gangwon'
	| 'chungbuk'
	| 'gyeongbuk'
	| 'gyeongnam'
	| 'jeju';

// type typeApiRegionLabel = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;

const formatRegionPlantTimeDayInfo = (data: any) => {
	let result = {
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

	if (data) {
		data.region.map((res: any) => {
			const { energy_today_total, region_group } = res;
			result[
				reverseRegionLabel[
					region_group as regionLabelType
				] as regionType
			] = energy_today_total;
			return res;
		});
	}

	return result;
};

export { formatRegionPlantTimeDayInfo };
