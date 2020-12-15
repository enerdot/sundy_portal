import React from 'react';
import styled from 'styled-components';

import GlobalStyled from 'style/GlobalStyled';
import ProcessBall from 'components/Atoms/ProcessBall';

const Styled = {
	Wrapper: styled(GlobalStyled.CenterRow)``,
	ProcessBallWrapper: styled.div`
		margin-right: 0.5rem;
	`,
};

interface ProcessBallListInterface {
	infos: any;
}

const ProcessBallList = (props: ProcessBallListInterface) => {
	const { infos } = props;

	const list = infos.map((res: any, i: number) => {
		return (
			<Styled.ProcessBallWrapper>
				<ProcessBall info={res} key={i} />
			</Styled.ProcessBallWrapper>
		);
	});

	return <Styled.Wrapper>{list}</Styled.Wrapper>;
};
ProcessBallList.defaultProps = {
	infos: '',
};

export default ProcessBallList;
