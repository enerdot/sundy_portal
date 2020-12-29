import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

import GlobalStyled from 'style/GlobalStyled';
import ProcessBallList from 'components/molecules/ProcessBallList';
import TextBrFormat from 'components/atoms/TextBrFormat';
import { ProcessBallInfoInterface } from 'components/atoms/ProcessBall';

const Styled = {
	Wrapper: styled(GlobalStyled.Row)`
		font-size: 1rem;
	`,
	Title: styled(GlobalStyled.Row)`
		font-size: 2rem;
		font-weight: bold;
		margin-bottom: 1rem;
	`,
	Sub: styled(GlobalStyled.HeightRow)`
		font-size: 1rem;
	`,
};

export interface ProcessHeaderInfoInterface extends ProcessBallInfoInterface {
	title: string;
	sub: string;
}

interface ProcessHeaderInterface {
	infos: Array<ProcessHeaderInfoInterface>;
}

const ProcessHeader = (props: ProcessHeaderInterface) => {
	const { infos } = props;

	const [activeInfo, setActiveInfo] = useState({
		title: '-',
		sub: '-',
	});

	useEffect(() => {
		infos.map((res: any, i: number) => {
			if (res.status === 'active') {
				setActiveInfo(res);
			}
			return res;
		});
	}, [infos]);

	const { title, sub } = activeInfo;

	return (
		<Styled.Wrapper>
			<GlobalStyled.HeightRow>
				<GlobalStyled.Row>
					<GlobalStyled.Col width={80}>
						<Styled.Title>{title}</Styled.Title>
					</GlobalStyled.Col>
					<GlobalStyled.RightCol width={20}>
						<ProcessBallList infos={infos} />
					</GlobalStyled.RightCol>
				</GlobalStyled.Row>
				<Styled.Sub>
					<TextBrFormat value={sub} />
				</Styled.Sub>
			</GlobalStyled.HeightRow>
		</Styled.Wrapper>
	);
};
ProcessHeader.defaultProps = {
	infos: [
		{
			title: '-',
			sub: '-',
			value: 1,
			status: 'active',
		},
		{
			title: '-',
			sub: '-',
			value: 2,
			status: 'beActive',
		},
		{
			title: '-',
			sub: '-',
			value: 3,
			status: 'beActive',
		},
	],
};

export default ProcessHeader;
