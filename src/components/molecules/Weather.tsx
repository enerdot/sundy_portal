import React from 'react';
import styled from 'styled-components';

import GlobalStyled from 'style/GlobalStyled';
import Svg from '../atoms/Svg';
import formatWeather from 'config/weather';

const Styled = {
	Wrapper: styled(GlobalStyled.HeightRow)`
		font-size: 1rem;
	`,
	WeatherName: styled(GlobalStyled.CenterRow)`
		font-size: 1rem;
		color: ${props => props.theme.gray};
	`,
	Temperature: styled(GlobalStyled.CenterRow)`
		font-size: 1rem;
	`,
};

interface WeatherInterface {
	info: any;
	stroke: string;
}

const Weather = (props: WeatherInterface) => {
	const { info, stroke } = props;

	const { name, imgSrc, temperature } = formatWeather(info);

	return (
		<Styled.Wrapper>
			<Styled.WeatherName bottom={1}>{name}</Styled.WeatherName>
			<GlobalStyled.CenterRow bottom={1}>
				<Svg name={imgSrc} size="4rem" stroke={stroke} />
			</GlobalStyled.CenterRow>
			<Styled.Temperature>{temperature}</Styled.Temperature>
		</Styled.Wrapper>
	);
};
Weather.defaultProps = {
	info: '',
	stroke: '#000000',
};

export default Weather;
