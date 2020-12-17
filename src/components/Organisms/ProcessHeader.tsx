import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

import GlobalStyled from 'style/GlobalStyled';
import ProcessBallList from 'components/Molecules/ProcessBallList';

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

interface ProcessHeaderInterface {
	infos: any;
}

const ProcessHeader = (props: ProcessHeaderInterface) => {
	const { infos } = props;

	const [activeInfo, setActiveInfo] = useState({
		title: '-',
		sub: '-',
		value: 1,
		status: 'active',
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

	const subFormat = sub.split('\n').map((res: string, i: number) => {
		return <div key={i}>{res}</div>;
	});

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
				<Styled.Sub>{subFormat}</Styled.Sub>
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
