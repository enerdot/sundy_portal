import React from 'react';
import styled from 'styled-components';
// import useSWR from 'swr';

import GlobalStyled from 'style/GlobalStyled';

import useCurrentUser from 'hooks/useCurrentUser';

const Styled = {
	Wrapper: styled(GlobalStyled.HeightRow)<{ isShow: boolean }>`
		display: ${props => (props.isShow ? 'flex' : 'none')};
		flex-direction: column;
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		z-index: 100;
		color: ${props => props.theme.lightBlack};
		font-size: 1rem;
	`,
	Header: styled(GlobalStyled.HeightRow)`
		background-color: ${props => props.theme.lightGray};
		padding: 2rem;
		height: 30%;
	`,
	CoinImg: styled.img`
		width: 1rem;
		height: 1rem;
		margin-right: 0.5rem;
	`,
	CoinText: styled(GlobalStyled.Row)`
		font-size: 2rem;
		font-weight: bold;
	`,
	ContentWrapper: styled(GlobalStyled.HeightRow)`
		background-color: ${props => props.theme.white};
		padding: 2rem;
		height: 70%;
	`,
	GrayText: styled.span`
		color: ${props => props.theme.gary};
	`,
	ButtonRow: styled(GlobalStyled.Row)`
		cursor: pointer;
	`,
};

interface MySettingFormInterface {
	isShow: boolean;
	onClickCancel(): void;
}

const MySettingForm = (props: MySettingFormInterface) => {
	const { isShow, onClickCancel } = props;

	const { currentUser, deleteSession } = useCurrentUser();

	const handleClickSignCheck = async () => {
		if (currentUser) {
			await deleteSession();
		} else {
			window.location.href = '/login';
		}
	};

	// const { data: userData } = useSWR('/users/info');

	return (
		<Styled.Wrapper isShow={isShow}>
			<Styled.Header>
				<GlobalStyled.Row bottom={1}>
					<GlobalStyled.RightCol width={100}>
						<GlobalStyled.TransparentButton onClick={onClickCancel}>
							<img
								alt="cancel"
								src={require('images/ic-cancel.svg').default}
							/>
						</GlobalStyled.TransparentButton>
					</GlobalStyled.RightCol>
				</GlobalStyled.Row>
				{currentUser ? (
					<>
						<GlobalStyled.Row bottom={1}>한희태</GlobalStyled.Row>
						<GlobalStyled.Row bottom={0.25}>
							<Styled.CoinImg
								alt="coin"
								src={require('images/ic-coin.svg').default}
							/>
							<Styled.GrayText>레디포인트</Styled.GrayText>
						</GlobalStyled.Row>
						<GlobalStyled.Row>
							<Styled.CoinText>10,000</Styled.CoinText>
						</GlobalStyled.Row>
					</>
				) : (
					<GlobalStyled.Row bottom={1}>
						로그인 하셔야 사용하실수 있는 기능입니다
					</GlobalStyled.Row>
				)}
			</Styled.Header>
			<Styled.ContentWrapper>
				<Styled.ButtonRow onClick={handleClickSignCheck}>
					{currentUser ? '로그아웃' : '로그인'}
				</Styled.ButtonRow>
			</Styled.ContentWrapper>
		</Styled.Wrapper>
	);
};

export default MySettingForm;
