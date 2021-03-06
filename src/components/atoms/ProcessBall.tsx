import React from 'react';
import styled from 'styled-components';

import GlobalStyled from 'style/GlobalStyled';

import theme from 'style/theme';

const Styled = {
	Wrapper: styled(GlobalStyled.CenterRow)<{ processBallTheme: any }>`
		font-size: 0.5rem;
		border-radius: 50%;
		width: ${props => props.processBallTheme.width};
		height: ${props => props.processBallTheme.height};
		color: ${props => props.processBallTheme.color};
		border: 1px solid ${props => props.processBallTheme.themeColor};
		background-color: ${props => props.processBallTheme.themeColor};
	`,
};

export type statusType = 'beActive' | 'active' | 'compleat';

export interface ProcessBallInfoInterface {
	value: number | string;
	status: statusType;
}

export interface ProcessBallInterface {
	info: ProcessBallInfoInterface;
}

const processBallTheme: { [key: string]: object } = {
	beActive: {
		width: '1rem',
		height: '1rem',
		color: theme.colors.white,
		themeColor: theme.colors.gray100,
	},
	active: {
		width: '1.25rem',
		height: '1.25rem',
		color: theme.colors.white,
		themeColor: theme.colors.sky,
	},
	compleat: {
		width: '1rem',
		height: '1rem',
		color: theme.colors.white,
		themeColor: theme.colors.gray500,
	},
};

const ProcessBall = (props: ProcessBallInterface) => {
	const { info } = props;
	const { value, status } = info;
	return (
		<Styled.Wrapper processBallTheme={processBallTheme[status]}>
			{status === 'active' ? value : ''}
		</Styled.Wrapper>
	);
};
ProcessBall.defaultProps = {
	info: {
		value: '',
		status: 'beActive',
	},
};

export default ProcessBall;
