import styled from 'styled-components';

import GlobalStyled from 'style/GlobalStyled';
import UserProfile from 'components/Molecules/UserProfile';

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
					<GlobalStyled.Col width={10}></GlobalStyled.Col>
					<GlobalStyled.CenterCol width={80}>
						<GlobalStyled.Link to="/">
							SUNDY PORTAL
						</GlobalStyled.Link>
					</GlobalStyled.CenterCol>
					<GlobalStyled.Col width={10}>
						<UserProfile />
					</GlobalStyled.Col>
				</Styled.Wrapper>
			</GlobalStyled.ContentRow>
		</GlobalStyled.Container>
	</GlobalStyled.Body>
);

export default GlobalHeader;
