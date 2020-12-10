import React from 'react';
import styled from 'styled-components';

import GlobalStyled from 'style/GlobalStyled';
import Svg from '../Atoms/Svg';
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
}

const Weather = (props: WeatherInterface) => {
	const { info } = props;

	const { name, imgSrc, temperature } = formatWeather(info);

	return (
		<Styled.Wrapper>
			<Styled.WeatherName>{name}</Styled.WeatherName>
			<GlobalStyled.CenterRow>
				<Svg name={imgSrc} size="5rem" />
			</GlobalStyled.CenterRow>
			<Styled.Temperature>{temperature}</Styled.Temperature>
		</Styled.Wrapper>
	);
};
Weather.defaultProps = {
	info: '',
};

export default Weather;
