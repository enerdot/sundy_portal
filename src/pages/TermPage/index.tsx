import React from 'react';
import styled from 'styled-components';
import { importMDX } from 'mdx.macro';

import GlobalStyled from 'style/GlobalStyled';

const TermMdx = React.lazy(() => importMDX('./Term.mdx'));

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
				<Styled.Wrapper>
					<TermMdx />
				</Styled.Wrapper>
			</GlobalStyled.Container>
		</GlobalStyled.Body>
	);
};

export default TermPage;
