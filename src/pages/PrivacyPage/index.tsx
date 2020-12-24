import React from 'react';
import styled from 'styled-components';
import { importMDX } from 'mdx.macro';

import GlobalStyled from 'style/GlobalStyled';

const PrivacyMdx = React.lazy(() => importMDX('./Privacy.mdx'));

const Styled = {
	Wrapper: styled(GlobalStyled.Row)``,
};

interface PrivacyPageInterface {
	match: any;
	location: any;
	history: any;
}

const PrivacyPage = ({
	match,
	location,
	history,
}: PrivacyPageInterface): JSX.Element => {
	return (
		<GlobalStyled.Body>
			<GlobalStyled.Container>
				<Styled.Wrapper>
					<PrivacyMdx />
				</Styled.Wrapper>
			</GlobalStyled.Container>
		</GlobalStyled.Body>
	);
};

export default PrivacyPage;
