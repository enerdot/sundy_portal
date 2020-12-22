import styled from 'styled-components';

import GlobalStyled from 'style/GlobalStyled';

const Styled = {
	Wrapper: styled(GlobalStyled.Row)``,
};

interface TermPageInterface {
	match: any;
	location: any;
	history: any;
}

const TermPage = ({
	match,
	location,
	history,
}: TermPageInterface): JSX.Element => {
	return (
		<GlobalStyled.Body>
			<GlobalStyled.Container>
				<Styled.Wrapper></Styled.Wrapper>
			</GlobalStyled.Container>
		</GlobalStyled.Body>
	);
};

export default TermPage;
