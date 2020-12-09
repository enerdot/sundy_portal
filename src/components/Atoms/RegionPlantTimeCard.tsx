import React from 'react';
import styled from 'styled-components';

import GlobalStyled from 'style/GlobalStyled';

import MotionCounter from 'components/Atoms/MotionCounter';

const Styled = {
	Wrapper: styled(GlobalStyled.Card)`
		font-size: 1rem;
		color: ${props => props.theme.black};
		flex-direction: column;
		box-shadow: 0px 3px 10px 0px ${props => props.theme.shadow};
	`,
	PlantTime: styled.span`
		font-size: 1.25rem;
		font-weight: bold;
		margin-right: 0.5rem;
	`,
	BottomContentRow: styled(GlobalStyled.Row)`
		align-items: center;
	`,
};

interface RegionPlantTimeCardInterface {
	label: string;
	value: number;
	to: string;
}

const RegionPlantTimeCard = (props: RegionPlantTimeCardInterface) => {
	const { label, value, to } = props;
	return (
		<GlobalStyled.RowLink to={to}>
			<Styled.Wrapper>
				<GlobalStyled.Row>
					<GlobalStyled.Col width={90}>{label}</GlobalStyled.Col>
					<GlobalStyled.Col width={10}>
						<img
							alt="right-cursor"
							src={require('images/ic-right-cursor.svg').default}
						/>
					</GlobalStyled.Col>
				</GlobalStyled.Row>
				<Styled.BottomContentRow>
					<Styled.PlantTime>
						<MotionCounter min={0} max={value} />
					</Styled.PlantTime>
					<span>시간</span>
				</Styled.BottomContentRow>
			</Styled.Wrapper>
		</GlobalStyled.RowLink>
	);
};
RegionPlantTimeCard.defaultProps = {
	label: '-',
	value: 0,
	to: '/',
};

export default RegionPlantTimeCard;
