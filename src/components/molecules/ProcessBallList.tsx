import React from 'react';
import styled from 'styled-components';

import GlobalStyled from 'style/GlobalStyled';
import ProcessBall, {
	ProcessBallInfoInterface,
} from 'components/atoms/ProcessBall';

const Styled = {
	Wrapper: styled(GlobalStyled.CenterRow)``,
	ProcessBallWrapper: styled.div`
		margin-right: 0.5rem;
	`,
};

interface ProcessBallListInterface {
	infos: Array<ProcessBallInfoInterface>;
}

const ProcessBallList = (props: ProcessBallListInterface) => {
	const { infos } = props;

	const list = infos.map((res: ProcessBallInfoInterface, i: number) => {
		return (
			<Styled.ProcessBallWrapper key={i}>
				<ProcessBall info={res} />
			</Styled.ProcessBallWrapper>
		);
	});

	return <Styled.Wrapper>{list}</Styled.Wrapper>;
};
ProcessBallList.defaultProps = {
	infos: [],
};

export default ProcessBallList;
