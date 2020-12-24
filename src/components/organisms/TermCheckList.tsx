import React from 'react';
import styled from 'styled-components';

import GlobalStyled from 'style/GlobalStyled';

import TermCheck from 'components/molecules/TermCheck';

const Styled = {
	Wrapper: styled(GlobalStyled.HeightRow)`
		${GlobalStyled.Row}:last-child {
			margin-bottom: 0;
		}
	`,
};

interface TermCheckListInterface {
	infos: any;
	onChange: any;
}

const TermCheckList = (props: TermCheckListInterface) => {
	const { infos, onChange } = props;

	const list = infos.map((res: any, i: number) => {
		return (
			<GlobalStyled.Row bottom={1} key={i}>
				<TermCheck {...res} onChange={onChange} />
			</GlobalStyled.Row>
		);
	});
	return <Styled.Wrapper>{list}</Styled.Wrapper>;
};
TermCheckList.defaultProps = {
	infos: [],
	onChange: () => {},
};

export default TermCheckList;
