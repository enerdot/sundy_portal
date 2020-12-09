import React from 'react';
import styled from 'styled-components';

import GlobalStyled from 'style/GlobalStyled';
import TableInfo from 'components/Atoms/TableInfo';

const Styled = {
	Wrapper: styled(GlobalStyled.Row)`
		font-size: 1rem;
		color: ${props => props.theme.gray};
		flex-direction: column;
	`,
	Header: styled(GlobalStyled.Row)`
		font-weight: bold;
		padding: 0.5rem 0;
		border-bottom: 1px solid ${props => props.theme.gray};
	`,
	TableRow: styled(GlobalStyled.Row)`
		padding: 0.5rem 0;
		${GlobalStyled.Col}:nth-child(1) {
			width: 35%;
			justify-content: center;
		}
		${GlobalStyled.Col}:nth-child(2) {
			width: 40%;
			justify-content: flex-start;
		}
		${GlobalStyled.Col}:nth-child(3) {
			width: 25%;
			justify-content: center;
		}
	`,
	TableWrapper: styled(GlobalStyled.Row)`
		flex-direction: column;
	`,
};

interface PlantStatusTableInterface {
	infos: any;
}

const PlantStatusTable = (props: PlantStatusTableInterface) => {
	const { infos } = props;

	const list = infos.map((res: any, i: number) => {
		return (
			<Styled.TableRow key={i}>
				<TableInfo info={res} />
			</Styled.TableRow>
		);
	});

	return (
		<Styled.Wrapper>
			<Styled.Header>
				<GlobalStyled.CenterCol width={35}>
					발전소명
				</GlobalStyled.CenterCol>
				<GlobalStyled.Col width={40}>위치</GlobalStyled.Col>
				<GlobalStyled.CenterCol width={25}>
					가동률
				</GlobalStyled.CenterCol>
			</Styled.Header>
			<Styled.TableWrapper>{list}</Styled.TableWrapper>
		</Styled.Wrapper>
	);
};
PlantStatusTable.defaultProps = {
	infos: [
		{
			제목1: '내용1',
			제목2: '내용1',
			제목3: '내용1',
		},
		{
			제목1: '내용2',
			제목2: '내용2',
			제목3: '내용2',
		},
	],
};

export default PlantStatusTable;
