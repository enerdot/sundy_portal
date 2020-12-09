import React from 'react';
import styled from 'styled-components';

import GlobalStyled from 'style/GlobalStyled';
import PlantTimeContent from 'components/Atoms/PlantTimeContent';

const Styled = {
	Wrapper: styled(GlobalStyled.Row)`
		font-size: 1rem;
		margin: 1rem 0;
	`,
};

interface SwitchButtonInterface {
	infos: Array<object>;
}

const PlantTimeContentList = (props: SwitchButtonInterface) => {
	const { infos } = props;

	const list = infos.map((res, i) => {
		return (
			<GlobalStyled.Col key={i} width={100 / infos.length}>
				<PlantTimeContent {...res} />
			</GlobalStyled.Col>
		);
	});

	return <Styled.Wrapper>{list}</Styled.Wrapper>;
};
PlantTimeContentList.defaultProps = {
	infos: [],
};

export default PlantTimeContentList;
