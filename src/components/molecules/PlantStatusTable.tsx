import React from 'react';
import styled from 'styled-components';

import GlobalStyled from 'style/GlobalStyled';
import TableInfo from 'components/atoms/TableInfo';

const Styled = {
	Wrapper: styled(GlobalStyled.FadeInUpRow)`
		font-size: 1rem;
		color: ${props => props.theme.gray};
		flex-direction: column;
	`,
	Header: styled(GlobalStyled.FadeInUpRow)`
		font-weight: bold;
		padding: 0.5rem 0;
		border-bottom: 1px solid ${props => props.theme.gray};
	`,
	TableRow: styled(GlobalStyled.FadeInUpRow)`
		padding: 0.5rem 0;
		${GlobalStyled.Col}:nth-child(1) {
			width: 37.5%;
			justify-content: center;
		}
		${GlobalStyled.Col}:nth-child(2) {
			width: 35%;
			justify-content: flex-start;
		}
		${GlobalStyled.Col}:nth-child(3) {
			width: 27.5%;
			justify-content: center;
		}
	`,
	TableWrapper: styled(GlobalStyled.FadeInUpRow)`
		flex-direction: column;
	`,
};

interface PlantStatusTableInterface {
	infos: Array<object>;
}

const PlantStatusTable = (props: PlantStatusTableInterface) => {
	const { infos } = props;

	const formatInfos = infos.map((res: any) => {
		return res;
	});

	const list = formatInfos.map((res: any, i: number) => {
		return (
			<Styled.TableRow key={i}>
				<TableInfo info={res} />
			</Styled.TableRow>
		);
	});

	return (
		<Styled.Wrapper>
			<Styled.Header>
				<GlobalStyled.CenterCol width={37.5}>
					발전소명
				</GlobalStyled.CenterCol>
				<GlobalStyled.Col width={35}>위치</GlobalStyled.Col>
				<GlobalStyled.CenterCol width={27.5}>
					발전시간
				</GlobalStyled.CenterCol>
			</Styled.Header>
			<Styled.TableWrapper>{list}</Styled.TableWrapper>
		</Styled.Wrapper>
	);
};
PlantStatusTable.defaultProps = {
	infos: [
		{
			plant_name: '-',
			plant_address: '-',
			kwh_time: '-',
		},
	],
};

export default PlantStatusTable;
