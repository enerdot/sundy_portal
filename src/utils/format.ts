function kWhToMWh(kW: number) {
	const result =
		Math.round(kW).toString().length >= 5
			? { value: +(kW / 1000).toFixed(2), unit: ' MWh' }
			: { value: +kW.toFixed(1), unit: ' kWh' };

	return result;
}

function numberCommaFormat(value: string | number) {
	const stringVal = value + '';
	const stringComma = stringVal.split('.');
	let valCharArrReverse = stringVal.split('').reverse();
	let result = '';
	let commaValue = '';

	if (stringComma.length > 1) {
		valCharArrReverse = stringComma[0].split('').reverse();
		commaValue = '.' + stringComma[1];
	}

	valCharArrReverse.map((res, i) => {
		i += 1;
		if (i % 3 === 0 && valCharArrReverse.length !== i) {
			result += res + ',';
			return res;
		}
		result += res;
		return res;
	});
	result = result.split('').reverse().join('');
	if (commaValue !== '') result = result + commaValue;
	result = result.split(',')[0] === '-' ? '-' + result.split(',')[1] : result;

	return result;
}

const makeJson = (value: any, key: string | number) => {
	return {
		[key]: value,
	};
};

const exposureSecurity = (value: any, exposureCount: number) => {
	let result = value ? value.split('')[0] : '';
	for (let i = 0; i < exposureCount; i++) {
		result += '*';
	}
	return result;
};

export { kWhToMWh, numberCommaFormat, makeJson, exposureSecurity };
