import React from 'react';
import styled from 'styled-components';
import { ResponsiveBar } from '@nivo/bar';

import GlobalStyled from 'style/GlobalStyled';
import theme from 'style/theme';

const Styled = {
	Wrapper: styled(GlobalStyled.Row)`
		height: 20rem;
	`,
};

interface BarChartInterface {
	data: any;
	colors: any;
	labelTextColor: string;
	leftTickFormat: string;
	tickPadding: number;
	keys: any;
}

const BarChart = (props: BarChartInterface) => {
	const {
		data,
		colors,
		labelTextColor,
		leftTickFormat,
		tickPadding,
		keys,
	} = props;
	return (
		<Styled.Wrapper>
			<ResponsiveBar
				data={data}
				colors={colors}
				keys={keys}
				indexBy="id"
				margin={{ top: 30, bottom: 35, left: 40 }}
				padding={0.6}
				valueScale={{ type: 'linear' }}
				indexScale={{ type: 'band', round: true }}
				borderColor={{ from: 'color', modifiers: [['darker', 1.6]] }}
				axisTop={null}
				axisRight={null}
				axisLeft={{
					tickValues: 5,
					tickPadding: tickPadding,
					tickRotation: 0,
					format: v => `${v}${leftTickFormat}`,
				}}
				labelSkipWidth={12}
				labelSkipHeight={12}
				labelTextColor={labelTextColor}
				labelFormat={labelValue =>
					((
						<tspan style={{ fontWeight: 'bold' }} y={12}>
							{labelValue}
						</tspan>
					) as unknown) as string
				}
				animate={true}
				motionStiffness={90}
				motionDamping={15}
			/>
		</Styled.Wrapper>
	);
};
BarChart.defaultProps = {
	data: [
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
	labelTextColor: theme.white,
	leftTickFormat: '',
	tickPadding: 10,
	keys: ['value'],
};

export default BarChart;
