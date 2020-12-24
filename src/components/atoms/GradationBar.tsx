import React from 'react';
import styled from 'styled-components';

import GlobalStyled from 'style/GlobalStyled';
import theme from 'style/theme';

const Styled = {
	Wrapper: styled(GlobalStyled.FadeInUpRow)<{ width: string }>`
		font-size: 1rem;
		flex-direction: column;
		width: ${props => props.width};
		color: ${props => props.theme.gray};
	`,
	GradationBar: styled.div<{ startColor: string; endColor: string }>`
		width: 100%;
		border-radius: 3rem;
		padding: 0.7rem;
		background: linear-gradient(
			to right,
			${props => props.startColor},
			${props => props.endColor}
		);
	`,
};

interface GradationBarInterface {
	width: string;
	startColor: string;
	endColor: string;
	children: any;
}

const GradationBar = (props: GradationBarInterface) => {
	const { startColor, endColor, width, children } = props;
	return (
		<Styled.Wrapper width={width}>
			<Styled.GradationBar
				startColor={startColor}
				endColor={endColor}
			></Styled.GradationBar>
			{children}
		</Styled.Wrapper>
	);
};
GradationBar.defaultProps = {
	width: '100%',
	startColor: theme.white,
	endColor: theme.darkSky,
	children: '',
};

export default GradationBar;
