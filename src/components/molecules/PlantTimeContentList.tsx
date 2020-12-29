import React from 'react';
import styled from 'styled-components';

import GlobalStyled from 'style/GlobalStyled';
import PlantTimeContent, {
	ValueLabelContentInterface,
} from 'components/atoms/PlantTimeContent';

const Styled = {
	Wrapper: styled(GlobalStyled.FadeInUpRow)`
		font-size: 1rem;
		padding: 1rem;
		background-color: ${props => props.theme.ivory};
	`,
};

export interface SwitchButtonInterface {
	infos: Array<ValueLabelContentInterface>;
}

const PlantTimeContentList = (props: SwitchButtonInterface) => {
	const { infos } = props;

	const list = infos.map((res: ValueLabelContentInterface, i: number) => {
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
