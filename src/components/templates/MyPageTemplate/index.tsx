import styled from 'styled-components';
import useSWR from 'swr';

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
		color: ${props => props.theme.colors.lightBlack};
		font-size: 1rem;
	`,
	Header: styled(GlobalStyled.HeightRow)`
		background-color: ${props => props.theme.colors.gray100};
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
		background-color: ${props => props.theme.colors.white};
		padding: 2rem;
		height: 70%;
	`,
	GrayText: styled.span`
		color: ${props => props.theme.colors.gary};
	`,
	ButtonRow: styled(GlobalStyled.Row)`
		cursor: pointer;
	`,
};

interface MyPageTemplateInterface {
	isShow: boolean;
	onClickCancel(): void;
}

const MyPageTemplate = (props: MyPageTemplateInterface) => {
	const { isShow, onClickCancel } = props;

	const { currentUser, deleteSession } = useCurrentUser();

	const { data: userInfo = { nickname: '', wallet_balance: 0 } } = useSWR(
		'/users/info',
	);

	const handleClickSignCheck = async () => {
		if (currentUser) {
			await deleteSession();
		} else {
			window.location.href = '/login';
		}
	};

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
						<GlobalStyled.Row bottom={1}>
							{userInfo.nickname}
						</GlobalStyled.Row>
						<GlobalStyled.ImgRow bottom={0.25}>
							<Styled.CoinImg
								alt="coin"
								src={require('images/ic-coin.svg').default}
							/>
							<Styled.GrayText>레디포인트</Styled.GrayText>
						</GlobalStyled.ImgRow>
						<GlobalStyled.Row>
							<Styled.CoinText>
								{userInfo.wallet_balance}
							</Styled.CoinText>
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

export default MyPageTemplate;
