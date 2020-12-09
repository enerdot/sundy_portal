import styled from 'styled-components';

import GlobalStyled from 'style/GlobalStyled';

const Styled = {
	Wrapper: styled(GlobalStyled.CenterRow)`
		font-size: 2rem;
		color: ${props => props.theme.sky};
		font-weight: bold;
		cursor: default;
		text-align: center;
	`,
};

const GlobalHeader = () => (
	<GlobalStyled.Body>
		<GlobalStyled.Container>
			<GlobalStyled.ContentRow>
				<Styled.Wrapper>
					<GlobalStyled.Link to="/">SUNDY PORTAL</GlobalStyled.Link>
				</Styled.Wrapper>
			</GlobalStyled.ContentRow>
		</GlobalStyled.Container>
	</GlobalStyled.Body>
);

export default GlobalHeader;
