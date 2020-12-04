import Select from 'components/Atoms/Select';
import React from 'react';
// import useSWR from 'swr';

import GlobalStyled from 'style/GlobalStyled';

// import useCurrentUser from 'hooks/useCurrentUser';
// import useAPI from 'hooks/useAPI';

const MainPage = (): JSX.Element => {
	return (
		<GlobalStyled.Body>
			<GlobalStyled.Container>
				<GlobalStyled.ContentRow>
					<GlobalStyled.Row>
						<Select />
					</GlobalStyled.Row>
				</GlobalStyled.ContentRow>
			</GlobalStyled.Container>
		</GlobalStyled.Body>
	);
};

export default MainPage;
