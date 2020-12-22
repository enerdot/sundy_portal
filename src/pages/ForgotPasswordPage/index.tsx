import React, { useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
// import useSWR from 'swr';

import GlobalStyled from 'style/GlobalStyled';

import useCurrentUser from 'hooks/useCurrentUser';
import useAPI from 'hooks/useAPI';

import ProcessHeader from 'components/Organisms/ProcessHeader';

import AttributeSettingSection from 'components/Templates/AttributeSettingSection';
import TermSection from 'components/Templates/TermSection';
import ConfirmSection from 'components/Templates/ConfirmSection';

import { signUpConfirm } from 'api/cognito';
import SignUpCompleteSection from 'components/Templates/SignUpCompleteSection';
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

interface ForgotPasswordPageInterface {
	match: any;
	location: any;
	history: any;
}

const ForgotPasswordPage = ({
	match,
	location,
	history,
}: ForgotPasswordPageInterface): JSX.Element => {
	// const { data: customName, error } = useSWR('/get/all');

	// const handleSubmit = async (): Promise<void> => {
	// 	try {
	// 		await API.APIs.getAll();
	// 		console.log(API);
	// 	} catch (err: any) {
	// 		console.log('err : ', err);
	// 	}
	// };

	const { createCurrentUser } = useCurrentUser();

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
			status: 'active',
		},
		{
			title: '비밀번호와 닉네임 설정',
			sub: '비밀번호와 닉네임을 설정합니다.',
			value: 2,
			status: 'beActive',
		},
		{
			title: '휴대전화 번호 인증',
			sub:
				'이제 마지막이에요. \n 휴대전화 번호를 입력해주세요.\n 휴대전화 번호는 로그인에 이용됩니다.',
			value: 3,
			status: 'beActive',
		},
	]);

	const [isSubmitLoading, setIsSubmitLoading] = useState(false);

	const [API] = useAPI();

	const handleSubmit = async (e: number, info: any) => {
		try {
			if (e === processHeaderInfos.length) {
				setIsSubmitLoading(true);
				await signUpConfirm(info.cognitoUser, info.confirmCode);

				const formatPhoneNumber = `+82${info.phoneNumber}`;

				await API.user.create({
					user_phone: formatPhoneNumber,
					nickname: userInfo.nickname,
					password: userInfo.password,
				});

				const idToken = await createCurrentUser({
					userId: formatPhoneNumber,
					password: userInfo.password,
				});

				const formatAPI = axios.create({
					baseURL: process.env.REACT_APP_API_URL,
					headers: {
						Authorization: idToken,
					},
				});

				await formatAPI.post('/users/get-token', {
					contents: 'create_wallet',
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
								status: 'complete',
							};
						}
						return res;
					});
				});
				setSubmitLevel(e);
			}
		} catch (err) {
			console.log('signUp err : ', err);
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
							<TermSection onSubmit={handleSubmit} />
						) : (
							''
						)}
						{submitLevel === 1 ? (
							<AttributeSettingSection onSubmit={handleSubmit} />
						) : (
							''
						)}
						{submitLevel === 2 ? (
							<ConfirmSection
								userInfo={userInfo}
								onSubmit={handleSubmit}
								isSubmitLoading={isSubmitLoading}
							/>
						) : (
							''
						)}
						{submitLevel === 3 ? <SignUpCompleteSection /> : ''}
					</Styled.ContentWrapper>
				</Styled.Wrapper>
			</GlobalStyled.Container>
		</GlobalStyled.Body>
	);
};

export default ForgotPasswordPage;
