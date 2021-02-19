import React from 'react';
import styled from 'styled-components';

import GlobalStyled from 'style/GlobalStyled';

import routerUrl from 'config/routerUrl';

export interface IntroPageProps {
	match: any;
	location: any;
	history: any;
}

const Styled = {
	Wrapper: styled(GlobalStyled.HeightRow)`
		margin: auto;
		background-color: ${props => props.theme.colors.sky};
	`,
	Button: styled(GlobalStyled.Button)`
		border-radius: 10rem;
		font-size: 2rem;
		background-color: ${props => props.theme.colors.orange};
	`,
};

const IntroPage = ({
	match,
	location,
	history,
}: IntroPageProps): JSX.Element => {
	return (
		<GlobalStyled.Body>
			<GlobalStyled.Container>
				<Styled.Wrapper>
					<GlobalStyled.Row>
						<img
							alt="intro"
							src={require('images/background-intro.png').default}
						/>
					</GlobalStyled.Row>
					<GlobalStyled.Row padding="5% 20%">
						<GlobalStyled.RowA href={routerUrl.mainPage}>
							<Styled.Button>SUNDY PORTAL 시작하기</Styled.Button>
						</GlobalStyled.RowA>
					</GlobalStyled.Row>
				</Styled.Wrapper>
			</GlobalStyled.Container>
		</GlobalStyled.Body>
	);
};

export default IntroPage;
