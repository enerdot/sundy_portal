import React from 'react';
import styled from 'styled-components';

import GlobalStyled from 'style/GlobalStyled';

const Styled = {
	Wrapper: styled(GlobalStyled.Row)``,
};

interface TableInfoInterface {
	info: any;
}

const TableInfo = (props: TableInfoInterface) => {
	const { info } = props;

	const infoKey = Object.keys(info);

	const row = infoKey.map(res => {
		return (
			<GlobalStyled.Col width={100 / infoKey.length} key={res}>
				{info[res]}
			</GlobalStyled.Col>
		);
	});

	return <Styled.Wrapper>{row}</Styled.Wrapper>;
};
TableInfo.defaultProps = {
	info: '',
};

export default TableInfo;
