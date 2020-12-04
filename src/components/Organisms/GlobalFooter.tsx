import styled from 'styled-components';

import GlobalStyled from '../../style/GlobalStyled';

const Styled = {
	Wrapper: styled(GlobalStyled.CenterRow)`
		padding: 1rem;
	`,
};

const GlobalFooter = () => (
	<GlobalStyled.Body>
		<GlobalStyled.Container>
			<Styled.Wrapper></Styled.Wrapper>
		</GlobalStyled.Container>
	</GlobalStyled.Body>
);

export default GlobalFooter;
