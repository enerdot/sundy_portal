import React from 'react';
import styled from 'styled-components';

import GlobalStyled from 'style/GlobalStyled';
import PlantTimeContent from 'components/atoms/PlantTimeContent';

const Styled = {
	Wrapper: styled(GlobalStyled.FadeInUpRow)`
		font-size: 1rem;
		padding: 1rem;
		background-color: ${props => props.theme.ivory};
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
