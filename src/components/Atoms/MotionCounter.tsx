import { Motion, spring } from 'react-motion';

import { numberCommaFormat } from 'utils/format';

interface MotionCounterInterface {
	min: number;
	max: number;
	delay: number;
	children: any;
}

const MotionCounter = (props: MotionCounterInterface) => {
	const { min, max, delay, children } = props;

	return (
		<>
			<Motion
				defaultStyle={{ x: min }}
				style={{ x: spring(max, { stiffness: delay, damping: 18.5 }) }}
			>
				{val => {
					const isValueFloor = +max.toFixed(1).split('.')[1] !== 0;
					let result = val.x;
					if (isValueFloor) {
						if (isNaN(max)) {
							result = 0;
						} else {
							let decimalCounter = (max + '').split('.')[1]
								.length;
							result = +val.x.toFixed(+decimalCounter);
						}
					} else {
						//0.1 0.01
						if (result >= max - 1) {
							result = max;
						} else {
							// 1, 10
							result = Math.floor(val.x);
						}
					}
					return (
						<span>
							{numberCommaFormat(result)}
							{children}
						</span>
					);
				}}
			</Motion>
		</>
	);
};
MotionCounter.defaultProps = {
	min: 0,
	max: 0,
	delay: 120,
	children: '',
};
export default MotionCounter;
