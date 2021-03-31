import React, { useState } from 'react';
import styled from 'styled-components';
import moment from 'moment';

import GlobalStyled from 'style/GlobalStyled';
import useInterval from 'hooks/useInterval';

const Styled = {
	Wrapper: styled(GlobalStyled.Row)`
		width: auto;
		margin-left: 1rem;
		align-items: center;
		justify-content: center;
	`,
};

export interface TimeCountProps {
	time: moment.Moment;
	isStart?: boolean;
}

const TimeCount = (props: TimeCountProps) => {
	const { time, isStart } = props;

	const [nowMomentTime, setNowMomentTime] = useState(time);
	const [nowTime, setNowTime] = useState('');
	const [isTimeEnd, setIsTimeEnd] = useState(false);

	useInterval(() => {
		if (nowMomentTime.format('mm:ss') !== '00:00') {
			const result = nowMomentTime.add(-1, 'second');
			setNowMomentTime(result);
			setNowTime(result.format('mm:ss'));
		} else {
			setIsTimeEnd(true);
		}
	}, 1000);

	return isStart ? (
		<Styled.Wrapper color={isTimeEnd ? '' : 'lightGray'}>
			{nowTime}
		</Styled.Wrapper>
	) : (
		<></>
	);
};
TimeCount.defaultProps = {
	time: moment(),
};

export default TimeCount;
