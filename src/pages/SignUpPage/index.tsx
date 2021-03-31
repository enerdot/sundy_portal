import React, { useState } from 'react';
import styled from 'styled-components';
import Swal from 'sweetalert2';
// import useSWR from 'swr';

import GlobalStyled from 'style/GlobalStyled';

import globalSwal from 'config/swal';

import useAPI from 'hooks/useAPI';

import ProcessHeader from 'components/organisms/ProcessHeader';

import Form from 'pages/SignUpPage/Form';
import Term from 'pages/SignUpPage/Term';
import UserConfirmTemplate from 'components/templates/UserConfirmTemplate';

// import { signUpConfirm } from 'api/cognito';
import Compleat from 'pages/SignUpPage/Compleat';

import { statusType } from 'components/atoms/ProcessBall';

const Styled = {
	Wrapper: styled(GlobalStyled.HeightRow)`
		height: 100%;
	`,
	HeaderProcessWrapper: styled(GlobalStyled.HeightRow)`
		padding: 1rem;
		height: 20%;
	`,
	ContentWrapper: styled(GlobalStyled.HeightRow)`
		height: 80%;
	`,
};

interface SignUpPageInterface {
	match: any;
	location: any;
	history: any;
}

const SignUpPage = ({
	match,
	location,
	history,
}: SignUpPageInterface): JSX.Element => {
	// const { data: customName, error } = useSWR('/get/all');

	// const handleSubmit = async (): Promise<void> => {
	// 	try {
	// 		await API.APIs.getAll();
	// 		console.log(API);
	// 	} catch (err: any) {
	// 		console.log('err : ', err);
	// 	}
	// };

	const [submitLevel, setSubmitLevel] = useState(0);

	const [userInfo, setUserInfo] = useState({
		nickname: '',
		password: '',
		phoneNumber: '',
		confirmCode: '',
		cognitoUser: '',
	});

	const [processHeaderInfos, setProcessHeaderInfos] = useState([
		{
			title: '약관동의',
			sub: '약관 동의 후 회원가입을 진행합니다.',
			value: 1,
			status: 'active' as statusType,
		},
		{
			title: '비밀번호와 닉네임 설정',
			sub: '비밀번호와 닉네임을 설정합니다.',
			value: 2,
			status: 'beActive' as statusType,
		},
		{
			title: '휴대전화 번호 인증',
			sub:
				'이제 마지막이에요. \n 휴대전화 번호를 입력해주세요.\n 휴대전화 번호는 로그인에 이용됩니다.',
			value: 3,
			status: 'beActive' as statusType,
		},
	]);

	const [isSubmitLoading, setIsSubmitLoading] = useState(false);

	const [API] = useAPI();

	const handleSubmit = async (e: number, info: any) => {
		try {
			if (e === processHeaderInfos.length) {
				setIsSubmitLoading(true);

				const formatPhoneNumber = `+82${info.phoneNumber}`;

				await API.user.confirmUser({
					userPhone: formatPhoneNumber,
					authNumber: info.confirmCode,
				});

				setSubmitLevel(e);
			} else {
				setProcessHeaderInfos((prevState: Array<object>) => {
					return prevState.map((res: any, i: number) => {
						if (i === e) {
							return {
								...res,
								status: 'active',
							};
						} else if (i < e) {
							return {
								...res,
								status: 'compleat',
							};
						}
						return res;
					});
				});
				setSubmitLevel(e);
			}
		} catch (err) {
			const formatErr = err?.response?.data?.error;
			console.log('sendConfirm err : ', err);
			if (formatErr === 'error01') {
				Swal.fire(globalSwal.needAccountInfo);
			} else if (formatErr === 'error02') {
				Swal.fire(globalSwal.confirmTimeOut);
			} else if (formatErr === 'error03') {
				Swal.fire(globalSwal.confirmErr);
			} else {
				Swal.fire({
					icon: 'error',
					title: `에러 ${formatErr}`,
					confirmButtonText: '확인',
				});
				// Swal.fire(globalSwal.limitConfirmErr);
			}
		} finally {
			setUserInfo((prevState: object) => {
				return {
					...prevState,
					...info,
				};
			});
			setIsSubmitLoading(false);
		}
	};

	return (
		<GlobalStyled.Body>
			<GlobalStyled.Container>
				<Styled.Wrapper>
					{submitLevel === 3 ? (
						''
					) : (
						<Styled.HeaderProcessWrapper>
							<ProcessHeader infos={processHeaderInfos} />
						</Styled.HeaderProcessWrapper>
					)}

					<Styled.ContentWrapper>
						{submitLevel === 0 ? (
							<Term onSubmit={handleSubmit} />
						) : (
							''
						)}
						{submitLevel === 1 ? (
							<Form onSubmit={handleSubmit} />
						) : (
							''
						)}
						{submitLevel === 2 ? (
							<UserConfirmTemplate
								type="signUp"
								userInfo={userInfo}
								onSubmit={
									isSubmitLoading ? () => {} : handleSubmit
								}
								isSubmitLoading={isSubmitLoading}
							/>
						) : (
							''
						)}
						{submitLevel === 3 ? <Compleat /> : ''}
					</Styled.ContentWrapper>
				</Styled.Wrapper>
			</GlobalStyled.Container>
		</GlobalStyled.Body>
	);
};

export default SignUpPage;
