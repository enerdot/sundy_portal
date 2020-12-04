import React from 'react';
import styled from 'styled-components';

import GlobalStyled from 'style/GlobalStyled';
import ValueLabelContent from 'components/Atoms/ValueLabelContent';

const Styled = {
	Wrapper: styled(GlobalStyled.Row)`
		font-size: 1rem;
	`,
};

interface SwitchButtonInterface {
	infos: Array<object>;
}

const ValueLabelContentList = (props: SwitchButtonInterface) => {
	const { infos } = props;

	const list = infos.map((res, i) => {
		return (
			<GlobalStyled.Col key={i} width={100 / infos.length}>
				<ValueLabelContent {...res} />
			</GlobalStyled.Col>
		);
	});

	return <Styled.Wrapper>{list}</Styled.Wrapper>;
};
ValueLabelContentList.defaultProps = {
	infos: [],
};

export default ValueLabelContentList;
