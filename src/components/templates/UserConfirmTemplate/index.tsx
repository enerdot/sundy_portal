import React, { useState } from 'react';
import styled, { css } from 'styled-components';
import Swal from 'sweetalert2';
import moment from 'moment';

import GlobalStyled from 'style/GlobalStyled';

import SubmitButton from 'components/molecules/SubmitButton';
import SignUpInput from 'components/molecules/SignUpInput';

import useInput from 'hooks/useInput';
import useAPI from 'hooks/useAPI';

import regularExpression from 'config/regularExpression';
import LabelInput from 'components/atoms/LabelInput';
import { signUp, resendConfirmationCode, forgotPassword } from 'api/cognito';

import globalSwal from 'config/swal';
import CircleSpinner from 'components/atoms/Spinner';

const Styled = {
	Wrapper: styled.form`
		display: flex;
		flex-direction: column;
		width: 100%;
		align-items: flex-end;
		justify-content: center;
		height: 100%;
		min-height: 500px;
	`,
	TermWrapper: styled(GlobalStyled.HeightRow)`
		height: 70%;
		align-items: flex-end;
		padding: 1rem;
	`,
	ButtonWrapper: styled(GlobalStyled.Row)`
		height: 30%;
		align-items: flex-end;
	`,
	HideInput: styled.input`
		display: none;
	`,
};

interface UserConfirmInterface {
	onSubmit: any;
	submitLevel?: number;
	isSubmitLoading: boolean;
	type: 'signUp' | 'forgotPassword';
	userInfo: {
		nickname?: string;
		password: string;
		phoneNumber: string;
		cognitoUserObj?: any;
	};
}

const UserConfirm = ({
	onSubmit,
	userInfo,
	isSubmitLoading,
	submitLevel,
	type,
}: UserConfirmInterface): JSX.Element => {
	const [API] = useAPI();
	const [{ phoneNumber, confirmCode }, onChange] = useInput({
		phoneNumber: '',
		confirmCode: '',
	});

	const [isSendConfirmPhoneNumber, setIsSendConfirmPhoneNumber] = useState(
		false,
	);

	const [
		isSendConfirmPhoneNumberLoading,
		setIsSendConfirmPhoneNumberLoading,
	] = useState(false);

	const [isSubmitButtonLoading, setIsSubmitButtonLoading] = useState(false);

	const [cognitoUser, setCognitoUser] = useState('');

	const [cognitoUserObj, setCognitoUserObj] = useState('');

	const [isClickConfirmButton, setIsClickConfirmButton] = useState(false);

	const [confirmTime, setConfirmTime] = useState(
		moment('2020-01-01 16:05:00'),
	);

	const [
		isStateRegularExpressionInfo,
		setIsStateRegularExpressionInfo,
	] = useState({
		phoneNumber: false,
	});

	const isConfirm = isSendConfirmPhoneNumber && confirmCode;

	const handleOnChangeRegularExpression = (name: string, value: any) => {
		setIsStateRegularExpressionInfo(prevState => {
			return { ...prevState, [name]: value };
		});
	};

	const handleSendConfirmCode = async () => {
		try {
			const formatPhoneNumber = `+82${phoneNumber}`;
			setIsSendConfirmPhoneNumberLoading(true);

			if (type === 'signUp') {
				if (isSendConfirmPhoneNumber) {
					console.log('resend');
					await resendConfirmationCode(cognitoUser);
					setConfirmTime(moment('2020-01-01 16:00:05'));
				} else {
					const {
						data: { checkStatus },
					} = await API.user.isConfirm({
						userPhone: formatPhoneNumber,
					});

					let user = undefined;

					console.log('checkStatus : ', checkStatus);

					switch (checkStatus) {
						case 1:
							await Swal.fire(globalSwal.overlapPhoneNumber);
							break;
						case 2:
							await API.user.notConfirmUserDelete({
								userPhone: formatPhoneNumber,
							});
							await API.user.tempUserInsert({
								userPhone: formatPhoneNumber,
								nickname: userInfo.nickname
									? userInfo.nickname
									: '',
								password: userInfo.password,
							});
							await signUp({
								phoneNumber: formatPhoneNumber,
								password: userInfo.password,
								nickname: userInfo.nickname,
							});

							// await API.user.sendConfirmCode({
							// 	userPhone: formatPhoneNumber,
							// });

							setCognitoUser(user as any);
							setIsSendConfirmPhoneNumber(true);
							setIsClickConfirmButton(true);
							break;
						case 3:
							Swal.fire(globalSwal.overlapPhoneNumber);
							break;
						default:
							await API.user.tempUserInsert({
								userPhone: formatPhoneNumber,
								nickname: userInfo.nickname
									? userInfo.nickname
									: '',
								password: userInfo.password,
							});
							console.log('tempUserInsert1');
							await signUp({
								phoneNumber: formatPhoneNumber,
								password: userInfo.password,
								nickname: userInfo.nickname,
							});
							console.log('tempUserInsert2');
							// await API.user.sendConfirmCode({
							// 	userPhone: formatPhoneNumber,
							// });
							console.log('tempUserInsert3');
							// user = await signUp({
							// 	...userInfo,
							// 	phoneNumber: formatPhoneNumber,
							// 	nickname: userInfo.nickname
							// 		? userInfo.nickname
							// 		: '',
							// });

							setCognitoUser(user as any);
							setIsSendConfirmPhoneNumber(true);
							setIsClickConfirmButton(true);
							break;
					}

					setConfirmTime(moment('2020-01-01 16:05:00'));
				}
			} else if (type === 'forgotPassword') {
				if (isSendConfirmPhoneNumber) {
					await resendConfirmationCode(cognitoUser);
					setConfirmTime(moment('2020-01-01 16:05:00'));
				} else {
					const signUpCheck = await API.user.signUpCheck({
						userPhone: formatPhoneNumber,
					});
					const { user_check } = signUpCheck.data;
					setConfirmTime(moment('2020-01-01 16:05:00'));
					if (user_check) {
						const user: any = await forgotPassword(
							formatPhoneNumber,
						);
						setCognitoUser(user?.cognitoUser);
						setCognitoUserObj(user?.obj);
						setIsSendConfirmPhoneNumber(true);
						setIsClickConfirmButton(true);
					} else {
						Swal.fire(globalSwal.notSignUpPhoneNumber);
					}
				}
			}
		} catch (err) {
			console.log('confirm err : ', err);
			// if (err.code === 'UsernameExistsException') {
			// 	Swal.fire(globalSwal.overlapPhoneNumber);
			// } else if (err.code === 'LimitExceededException') {
			// 	Swal.fire(globalSwal.limitConfirmErr);
			// }
			if (err?.response?.error === 'error01') {
				Swal.fire(globalSwal.overlapPhoneNumber);
			} else if (err?.response?.error === 'error02') {
				Swal.fire(globalSwal.confirmTimeOver);
			} else if (err?.response?.error === 'error03') {
				Swal.fire(globalSwal.confirmErr);
			} else if (err?.response?.error === 'error04') {
				Swal.fire(globalSwal.DBErr);
				console.log('err : ', err?.response);
			} else {
				console.log('err : ', err?.response);
				// Swal.fire(globalSwal.limitConfirmErr);
			}
			console.log('sign up err : ', err);
		} finally {
			setIsSendConfirmPhoneNumberLoading(false);
		}
	};

	const handleSubmit = async (e: any): Promise<void> => {
		setIsSubmitButtonLoading(true);
		e.preventDefault();
		console.log(confirmTime.diff(moment('2020-01-01 16:05:00'), 'second'));
		// try {
		// 	if (
		// 		confirmTime.diff(moment('2020-01-01 16:05:00'), 'second') < -300
		// 	) {
		// 		Swal.fire(globalSwal.confirmTimeOut);
		// 	} else if (isConfirm) {
		// 		onSubmit(submitLevel, {
		// 			confirmCode: confirmCode,
		// 			cognitoUser: cognitoUser,
		// 			phoneNumber: phoneNumber,
		// 			cognitoUserObj: cognitoUserObj,
		// 		});
		// 	}
		// } catch (err: any) {
		// 	console.log('err : ', err);
		// } finally {
		// 	setIsSubmitButtonLoading(false);
		// }
	};

	return (
		<Styled.Wrapper onSubmit={handleSubmit}>
			<Styled.TermWrapper>
				<GlobalStyled.FadeInUpRow bottom={2.5}>
					<SignUpInput
						label="전화번호"
						type="text"
						name="phoneNumber"
						value={phoneNumber}
						onChange={onChange}
						isConfirmButton={true}
						regularExpression={regularExpression.phoneNumber}
						onChangeRegularExpression={
							handleOnChangeRegularExpression
						}
						required={true}
						readOnly={isSendConfirmPhoneNumber}
						onClickConfirmButton={
							isStateRegularExpressionInfo.phoneNumber
								? handleSendConfirmCode
								: () => {}
						}
						confirmButtonText={
							isSendConfirmPhoneNumber
								? '인증번호 재발송'
								: '인증번호 발송'
						}
						isConfirmButtonLoading={isSendConfirmPhoneNumberLoading}
						confirmTime={confirmTime}
						isClickConfirmButton={isClickConfirmButton}
					/>
					<Styled.HideInput name="userId" value={phoneNumber} />
					<Styled.HideInput
						name="password"
						value={userInfo.password}
					/>
				</GlobalStyled.FadeInUpRow>
				<GlobalStyled.FadeInUpRow bottom={2.5}>
					<LabelInput
						label="인증번호"
						type="text"
						name="confirmCode"
						value={confirmCode}
						onChange={onChange}
						required={true}
					/>
				</GlobalStyled.FadeInUpRow>
			</Styled.TermWrapper>
			<Styled.ButtonWrapper>
				<SubmitButton
					css={css`
						width: 100%;
						height: 5rem;
						font-size: 1.5rem;
						border-radius: 0;
					`}
					isActive={isConfirm}
					type="submit"
					isLoading={isSubmitButtonLoading}
				>
					<CircleSpinner size="1.5rem" isLoading={isSubmitLoading}>
						{type === 'signUp' ? '회원가입' : '다음'}
					</CircleSpinner>
				</SubmitButton>
			</Styled.ButtonWrapper>
		</Styled.Wrapper>
	);
};

UserConfirm.defaultProps = {
	onSubmit: () => {},
	submitLevel: 3,
	isSubmitLoading: false,
	userInfo: {
		nickName: '',
		password: '',
		phoneNumber: '',
	},
};

export default UserConfirm;
