import moment from 'moment';
import { regionOptions } from 'config/region';

const isRegionUrl = (match: any) => {
	const urlRegion = match.params.region;
	let result = regionOptions[0];
	let isUrl = false;

	if (urlRegion) {
		regionOptions.map(res => {
			if (res.value === urlRegion) {
				result = res;
				isUrl = true;
			}
			return res;
		});
	}

	return {
		isUrl: isUrl,
		value: result,
	};
};

const isDateUrl = (match: any) => {
	const urlDate = match.params.date;
	let result = moment().add(-1, 'days');
	let isUrl = false;

	if (moment(urlDate).diff(moment().add(-1, 'days')) <= 1) {
		result = moment(urlDate);
		isUrl = true;
	}

	if (urlDate.length !== 8) {
		isUrl = false;
	}

	return {
		isUrl: isUrl,
		value: moment(result),
	};
};

export { isRegionUrl, isDateUrl };
