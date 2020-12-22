import React from 'react';
import styled from 'styled-components';
import { ResponsiveBar } from '@nivo/bar';

import GlobalStyled from 'style/GlobalStyled';
import theme from 'style/theme';

const Styled = {
	Wrapper: styled(GlobalStyled.FadeInUpRow)`
		height: 20rem;
	`,
};

interface BarChartInterface {
	infos: any;
	colors: any;
	labelTextColor: string;
	leftTickFormat: string;
	tickPadding: number;
	keys: any;
	leftMargin: number;
	axisBottomTickValues: any;
	maxValue?: number;
}

const BarChart = (props: BarChartInterface) => {
	const {
		infos,
		colors,
		labelTextColor,
		leftTickFormat,
		tickPadding,
		keys,
		leftMargin,
		axisBottomTickValues,
		maxValue,
	} = props;

	return (
		<Styled.Wrapper>
			<ResponsiveBar
				data={infos}
				colors={colors}
				keys={keys}
				indexBy="id"
				margin={{ top: 30, bottom: 35, left: leftMargin }}
				padding={0.6}
				valueScale={{ type: 'linear' }}
				indexScale={{ type: 'band', round: true }}
				borderColor={{ from: 'color', modifiers: [['darker', 1.6]] }}
				axisTop={null}
				axisRight={null}
				axisLeft={{
					tickValues: 5,
					tickPadding: tickPadding,
					// tickRotation: 0,
					format: v => `${v}${leftTickFormat}`,
				}}
				axisBottom={{
					tickValues: axisBottomTickValues,
				}}
				labelSkipWidth={12}
				labelSkipHeight={12}
				labelTextColor={labelTextColor}
				labelFormat={labelValue =>
					((
						<tspan style={{ fontWeight: 'bold' }} y={-12}>
							{labelValue}
						</tspan>
					) as unknown) as string
				}
				animate={true}
				motionStiffness={90}
				motionDamping={15}
				maxValue={maxValue}
			/>
		</Styled.Wrapper>
	);
};
BarChart.defaultProps = {
	infos: [
		{
			id: '11/14',
			value: 0,
		},
		{
			id: '11/15',
			value: 0,
		},
		{
			id: '11/16',
			value: 0,
		},
		{
			id: '11/17',
			value: 0,
		},
		{
			id: '11/18',
			value: 0,
		},
		{
			id: '11/19',
			value: 0,
		},
		{
			id: '11/20',
			value: 0,
		},
	],
	colors: [theme.sky],
	labelTextColor: theme.black,
	leftTickFormat: '',
	tickPadding: 10,
	keys: ['value'],
	leftMargin: 40,
	axisBottomTickValues: 0,
	maxValue: 'auto',
};

export default BarChart;
