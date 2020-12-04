import styled from 'styled-components';

import GlobalStyled from 'style/GlobalStyled';

const Styled = {
	Wrapper: styled(GlobalStyled.CenterRow)`
		font-size: 2rem;
		color: ${props => props.theme.blue.logo};
		font-weight: bold;
		cursor: default;
	`,
};

const GlobalHeader = () => (
	<GlobalStyled.Body>
		<GlobalStyled.Container>
			<GlobalStyled.ContentRow>
				<Styled.Wrapper>SUNDY PORTAL</Styled.Wrapper>
			</GlobalStyled.ContentRow>
		</GlobalStyled.Container>
	</GlobalStyled.Body>
);

export default GlobalHeader;
