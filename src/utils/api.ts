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
