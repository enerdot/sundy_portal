import React, { useState } from 'react';
import styled from 'styled-components';
import moment, { Moment } from 'moment';
import Swal from 'sweetalert2';
import useAPI from 'hooks/useAPI';
import useSWR from 'swr';

import globalSwal from 'config/swal';

import GlobalStyled from 'style/GlobalStyled';
import routerUrl from 'config/routerUrl';
import TextBrFormat from 'components/atoms/TextBrFormat';
import ModalMessage from 'components/molecules/ModalMessage';
import Spinner from 'components/atoms/Spinner';
import { modalPosition } from 'components/atoms/Modal';

const Styled = {
	Wrapper: styled(GlobalStyled.HeightRow)`
		padding: 1rem 0;
	`,
	TokenText: styled(GlobalStyled.Row)`
		font-size: 1.175rem;
		font-weight: bold;
		align-items: center;
		margin-top: 2rem;
		span {
			font-size: 1.5rem;
			color: ${props => props.theme.colors.modalHighlightBlue};
			margin-right: 0.5rem;
		}
	`,
	GraySubText: styled(GlobalStyled.HeightRow)`
		text-align: left;
		font-size: 1.167rem;
		color: ${props => props.theme.colors.white};
		opacity: 0.6;
	`,
	Title: styled(GlobalStyled.HeightRow)`
		text-align: left;
		font-size: 1.5rem;
		font-weight: bold;
	`,
	CancelButton: styled(GlobalStyled.Button)`
		border-radius: 5rem;
		padding: 0.875rem 0;
		color: ${props => props.theme.colors.sky};
		border: 2px solid ${props => props.theme.colors.sky};
		background-color: ${props => props.theme.colors.white};
		font-size: 1.5rem;
		width: 90%;
	`,
	SubmitButton: styled(GlobalStyled.Button)`
		border: 2px solid ${props => props.theme.colors.sky};
		border-radius: 5rem;
		padding: 0.875rem 0;
		font-size: 1.5rem;
		width: 90%;
	`,
};

interface TokenPaymentModalInterface extends modalPosition {
	currentUser: string;
	date: Date | Moment | string;
	token: number;
	isModal: boolean;
	onClickConfirm: () => void;
}

const TokenPaymentModal = (props: TokenPaymentModalInterface) => {
	const { isModal, currentUser, date, token, position } = props;

	const [isButtonLoading, setIsButtonLoading] = useState(false);

	const [API] = useAPI();

	const { data: userInfo = { nickname: '' } } = useSWR('/users/info');

	const handleOnClickPaymentToken = async () => {
		if (!isButtonLoading) {
			try {
				setIsButtonLoading(true);
				await API.token.payment({
					contents: 'plants_per_date',
					date: moment(date).format('YYYY-MM-DD'),
				});
				window.location.reload();
			} catch (err) {
				console.log('err : ', err);
				await Swal.fire(globalSwal.apiErr);
			} finally {
				setIsButtonLoading(false);
			}
		}
	};

	const messageInfo =
		currentUser !== null
			? {
					subTopTitle: `안녕하세요 ${userInfo.nickname}님`,
					title: `${moment(date).format(
						'MM월 DD일의',
					)} 지역 발전소 둘러보기`,

					buttonText: '사용하기',
					onClickButton: () => {
						handleOnClickPaymentToken();
					},
					cancelButtonText: '뒤로가기',
					onClickCancelButton: () => {
						window.location.href = '/';
					},
					subText:
						'특정일 구경에 대한 레디를 한번 지불하면\n해당 날짜의 다른 발전소도 자유롭게 구경할 수 있습니다.',
			  }
			: {
					subTopTitle: '지금 바로 로그인하고',
					title: '우리 지역발전량 상위 발전소를\n 구경해보세요!',

					buttonText: '로그인 하기',
					onClickButton: () => {
						window.location.href = routerUrl.loginPage;
					},
					cancelButtonText: '돌아 가기',
					onClickCancelButton: () => {
						window.location.href = '/';
					},
					subText: '',
			  };

	const {
		subTopTitle,
		title,
		onClickButton,
		buttonText,
		onClickCancelButton,
		cancelButtonText,
		subText,
	} = messageInfo;

	return (
		<ModalMessage {...messageInfo} isModal={isModal} position={position}>
			<Styled.Wrapper>
				<Styled.GraySubText>{subTopTitle}</Styled.GraySubText>
				{currentUser ? (
					<>
						<Styled.TokenText>
							<span>{`${token}REDi`}</span> <div>결제하고</div>
						</Styled.TokenText>
					</>
				) : (
					<GlobalStyled.Row bottom={2} />
				)}
				<Styled.Title bottom={3}>
					<TextBrFormat value={title} />
				</Styled.Title>

				<GlobalStyled.CenterRow bottom={2}>
					<GlobalStyled.Col width={50}>
						<Styled.SubmitButton onClick={onClickButton}>
							<Spinner
								isLoading={isButtonLoading}
								size="0.875rem"
							>
								{buttonText}
							</Spinner>
						</Styled.SubmitButton>
					</GlobalStyled.Col>
					<GlobalStyled.RightCol width={50}>
						<Styled.CancelButton onClick={onClickCancelButton}>
							{cancelButtonText}
						</Styled.CancelButton>
					</GlobalStyled.RightCol>
				</GlobalStyled.CenterRow>
				<GlobalStyled.HeightRow>
					<TextBrFormat value={subText} />
				</GlobalStyled.HeightRow>
			</Styled.Wrapper>
		</ModalMessage>
	);
};
TokenPaymentModal.defaultProps = {
	isModal: false,
	currentUser: false,
	date: new Date(),
	token: 0,
	position: 'middle',
	onClickConfirm: () => {},
};

export default TokenPaymentModal;
