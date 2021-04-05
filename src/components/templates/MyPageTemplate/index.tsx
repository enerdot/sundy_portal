import React from 'react';
import styled from 'styled-components';
import useSWR from 'swr';
// import jwt from 'jsonwebtoken';

import GlobalStyled from 'style/GlobalStyled';

import useCurrentUser from 'hooks/useCurrentUser';
import routerUrl from 'config/routerUrl';
import Svg from 'components/atoms/Svg';

// import useAPI from 'hooks/useAPI';
// import CircleSpinner from 'components/atoms/Spinner';
// import Swal from 'sweetalert2';

const Styled = {
	Wrapper: styled(GlobalStyled.HeightRow)<{ isShow: boolean }>`
		font-size: 1.25rem;
		display: ${props => (props.isShow ? 'flex' : 'none')};
		flex-direction: column;
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		z-index: 100;
		color: ${props => props.theme.colors.lightBlack};
	`,
	Header: styled(GlobalStyled.HeightRow)`
		background-color: ${props => props.theme.colors.gray100};
		padding: 2rem;
		height: 30%;
	`,
	CoinImg: styled.img`
		width: 2rem;
		height: 2rem;
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
	Button: styled(GlobalStyled.TransparentButton)`
		cursor: pointer;
		font-weight: bold;
	`,
	IntroSvgWrapper: styled(GlobalStyled.Col)`
		margin-bottom: 0.5rem;
		margin-left: 0.5rem;
	`,
	IntroPageHref: styled.a`
		display: flex;
		align-items: center;
		color: ${props => props.theme.colors.blue};
		font-weight: bold;
	`,
};

interface MyPageTemplateInterface {
	isShow: boolean;
	onClickCancel(): void;
}

const MyPageTemplate = (props: MyPageTemplateInterface) => {
	const { isShow, onClickCancel } = props;

	const { currentUser, deleteSession } = useCurrentUser();

	// const [isCreateWalletLoading, setIsCreateWalletLoading] = useState(false);

	// const [API] = useAPI();

	const {
		data: userInfo = { nickname: '', wallet_balance: '-' },
		// error,
	} = useSWR('/users/info');

	const handleClickSignCheck = async () => {
		if (currentUser) {
			await deleteSession();
		} else {
			window.location.href = '/login';
		}
	};

	// const handleClickCreateWallet = async () => {
	// 	setIsCreateWalletLoading(true);
	// 	const decodeUser = jwt.decode(currentUser) as { phone_number: string };
	// 	try {
	// 		await API.user.confirmUserCreateWallet({
	// 			userPhone: decodeUser?.phone_number,
	// 		});
	// 		await API.token.insert({ contents: 'create_wallet' });
	// 		window.location.reload();
	// 	} catch (err) {
	// 		console.log(err.response);
	// 		if (err?.response?.data?.error === 'error04') {
	// 		} else {
	// 			Swal.fire({
	// 				icon: 'error',
	// 				title: `통신에러가 발생했습니다`,
	// 				text: `에러코드 : token insert ${err?.response?.data?.error}`,
	// 				confirmButtonText: '확인',
	// 			});
	// 		}
	// 	}
	// 	setIsCreateWalletLoading(false);
	// };

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
						<GlobalStyled.ImgRow bottom={1}>
							<Styled.CoinImg
								alt="coin"
								src={require('images/ic-coin.svg').default}
							/>
							<Styled.GrayText>레디포인트</Styled.GrayText>
						</GlobalStyled.ImgRow>
						<GlobalStyled.Row>
							<Styled.CoinText>
								-{/* {userInfo.wallet_balance} */}
								{/* {error?.response?.data?.error === 'error03' ? (
									<GlobalStyled.CustomCol width="10rem">
										<CircleSpinner
											size="2.5rem"
											isLoading={isCreateWalletLoading}
										>
											<GlobalStyled.Button
												width="10rem"
												fontSize="1.5rem"
												padding="0.5rem"
												onClick={
													handleClickCreateWallet
												}
											>
												지갑생성
											</GlobalStyled.Button>
										</CircleSpinner>
									</GlobalStyled.CustomCol>
								) : (
									userInfo.wallet_balance
								)} */}
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
				<GlobalStyled.Row bottom={1}>
					<Styled.Button onClick={handleClickSignCheck}>
						{currentUser ? '로그아웃' : '로그인'}
					</Styled.Button>
				</GlobalStyled.Row>
				<GlobalStyled.Row>
					<Styled.IntroPageHref href={routerUrl.introPage}>
						<GlobalStyled.Col>썬디포털 소개서</GlobalStyled.Col>
						<Styled.IntroSvgWrapper>
							<Svg name="linkMarker" fill="blue" size="1rem" />
						</Styled.IntroSvgWrapper>
					</Styled.IntroPageHref>
				</GlobalStyled.Row>
			</Styled.ContentWrapper>
		</Styled.Wrapper>
	);
};

export default MyPageTemplate;
