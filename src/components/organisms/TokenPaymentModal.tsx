import React, { useState } from 'react';
import styled from 'styled-components';
import moment from 'moment';
import Swal from 'sweetalert2';
import useAPI from 'hooks/useAPI';

import globalSwal from 'config/alert';

import GlobalStyled from 'style/GlobalStyled';
import routerUrl from 'config/routerUrl';
import TextBrFormat from 'components/atoms/TextBrFormat';
import ModalMessage from 'components/molecules/ModalMessage';
import Spinner from 'components/atoms/Spinner';

const Styled = {
	Wrapper: styled(GlobalStyled.HeightRow)``,
	TokenText: styled(GlobalStyled.CenterRow)`
		font-size: 1.5rem;
		font-weight: bold;
		span {
			color: ${props => props.theme.blue};
			margin-right: 0.5rem;
		}
	`,
	CancelButton: styled(GlobalStyled.Button)`
		border-radius: 5rem;
		padding: 1rem 2.5rem;
		width: auto;
		color: ${props => props.theme.sky};
		border: 2px solid ${props => props.theme.sky};
		background-color: ${props => props.theme.white};
	`,
	SubmitButton: styled(GlobalStyled.Button)`
		border: 2px solid ${props => props.theme.sky};
		border-radius: 5rem;
		width: auto;
		padding: 1rem 2.5rem;
	`,
};

interface TokenPaymentModalInterface {
	currentUser: any;
	date: any;
	token: number;
	isModal: boolean;
	onClickConfirm: () => void;
}

const TokenPaymentModal = (props: TokenPaymentModalInterface) => {
	const { isModal, currentUser, date, token } = props;

	const [isButtonLoading, setIsButtonLoading] = useState(false);

	const [API] = useAPI();

	const handleOnClickPaymentToken = async () => {
		if (!isButtonLoading) {
			try {
				setIsButtonLoading(true);
				await API.token.payment({
					contents: 'plants_per_date',
					date: moment(date).format('YYYY-MM-DD'),
				});
				// window.location.reload();
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
					subTopTitle: `안녕하세요 ${'user'}님`,
					title: `${moment(date).format(
						'MM월 DD일의',
					)}\n지역 발전소를 구경하시겠어요?`,
					subBottomTitle:
						'발전소 위치, 용량, 설비 정보와 발전량 그래프를\n확인해 볼 수 있습니다.',
					buttonText: '결제',
					onClickButton: () => {
						handleOnClickPaymentToken();
					},
					cancelButtonText: '취소',
					onClickCancelButton: () => {
						window.location.href = '/';
					},
					subText:
						'특정일 구경에 대한 레디를 한번 지불하면\n해당 날짜의 다른 발전소도 자유롭게 구경할 수 있습니다.',
			  }
			: {
					subTopTitle: '지금 바로 로그인하고',
					title: '우리 지역\n발전량 상위 발전소를 구경해보세요!',
					subBottomTitle:
						'발전소 위치, 용량, 설비 정보와 발전량 그래프를\n확인해 볼 수 있습니다.',
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

	return (
		<ModalMessage {...messageInfo} isModal={isModal}>
			<Styled.Wrapper>
				{currentUser ? (
					<Styled.TokenText bottom={2}>
						<span>{`${token}REDi`}</span>를 사용합니다
					</Styled.TokenText>
				) : (
					''
				)}
				<GlobalStyled.CenterRow bottom={2}>
					<GlobalStyled.CenterCol width={50}>
						<Styled.SubmitButton
							onClick={messageInfo.onClickButton}
						>
							<Spinner isLoading={isButtonLoading}>
								{messageInfo.buttonText}
							</Spinner>
						</Styled.SubmitButton>
					</GlobalStyled.CenterCol>
					<GlobalStyled.CenterCol width={50}>
						<Styled.CancelButton
							onClick={messageInfo.onClickCancelButton}
						>
							{messageInfo.cancelButtonText}
						</Styled.CancelButton>
					</GlobalStyled.CenterCol>
				</GlobalStyled.CenterRow>
				<GlobalStyled.HeightRow>
					<TextBrFormat value={messageInfo.subText} />
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
	onClickConfirm: () => {},
};

export default TokenPaymentModal;
