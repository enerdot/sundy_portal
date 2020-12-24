import React, { useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
// import useSWR from 'swr';

import GlobalStyled from 'style/GlobalStyled';

import useCurrentUser from 'hooks/useCurrentUser';

import ProcessHeader from 'components/organisms/ProcessHeader';

import ConfirmSection from 'components/templates/ConfirmSection';
import ForgotPasswordSettingSection from 'components/templates/ForgotPasswordSettingSection';
import ForgotPasswordCompleteSection from 'components/templates/ForgetPasswordCompleteSection';

import { confirmPassword } from 'api/cognito';
import SignUpCompleteSection from 'components/templates/SignUpCompleteSection';
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
		password: '',
		phoneNumber: '',
		confirmCode: '',
		cognitoUser: '',
		cognitoUserObj: null,
	});

	const [processHeaderInfos, setProcessHeaderInfos] = useState([
		{
			title: '비밀번호 재설정',
			sub: '등록된 계정의 휴대전화번호를 입력해주세요',
			value: 1,
			status: 'active',
		},
		{
			title: '비밀번호 재설정',
			sub: '비밀번호 재설정을 진행합니다.',
			value: 2,
			status: 'beActive',
		},
	]);

	const [isSubmitLoading, setIsSubmitLoading] = useState(false);

	const handleSubmit = async (e: number, info: any) => {
		try {
			if (e === processHeaderInfos.length) {
				setIsSubmitLoading(true);
				console.log('userInfo : ', userInfo);
				await confirmPassword({
					...userInfo,
					password: info.password,
				});

				const formatPhoneNumber = `+82${userInfo.phoneNumber}`;
				const idToken = await createCurrentUser({
					userId: formatPhoneNumber,
					password: info.password,
				});

				const formatAPI = axios.create({
					baseURL: process.env.REACT_APP_API_URL,
					headers: {
						Authorization: idToken,
					},
				});

				await formatAPI.post('/users/change-pwd', {
					new_password: info.password,
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
			console.log('forgot password err : ', err);
		} finally {
			console.log(info);
			setUserInfo(prevState => {
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
					{submitLevel === processHeaderInfos.length ? (
						''
					) : (
						<Styled.HeaderProcessWrapper>
							<ProcessHeader infos={processHeaderInfos} />
						</Styled.HeaderProcessWrapper>
					)}

					<Styled.ContentWrapper>
						{submitLevel === 0 ? (
							<ConfirmSection
								type="forgotPassword"
								userInfo={userInfo}
								submitLevel={1}
								onSubmit={handleSubmit}
								isSubmitLoading={isSubmitLoading}
							/>
						) : (
							''
						)}
						{submitLevel === 1 ? (
							<ForgotPasswordSettingSection
								submitLevel={2}
								onSubmit={handleSubmit}
							/>
						) : (
							''
						)}
						{submitLevel === 2 ? (
							<ForgotPasswordCompleteSection />
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
