import React, { useState } from 'react';
import styled from 'styled-components';
import Swal from 'sweetalert2';

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
	NextButton: styled(SubmitButton)`
		width: 100%;
		height: 5rem;
		font-size: 1.5rem;
		border-radius: 0;
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
		if (!isSendConfirmPhoneNumber) {
			try {
				const formatPhoneNumber = `+82${phoneNumber}`;
				setIsSendConfirmPhoneNumberLoading(true);
				if (type === 'signUp') {
					if (isSendConfirmPhoneNumber) {
						await resendConfirmationCode(cognitoUser);
					} else {
						const user = await signUp({
							...userInfo,
							phoneNumber: formatPhoneNumber,
							nickname: userInfo.nickname
								? userInfo.nickname
								: '',
						});
						setCognitoUser(user as any);
						setIsSendConfirmPhoneNumber(true);
					}
				} else if (type === 'forgotPassword') {
					if (isSendConfirmPhoneNumber) {
						await resendConfirmationCode(cognitoUser);
					} else {
						const { user_check } = await API.user.signUpCheck({
							userPhone: formatPhoneNumber,
						});
						if (user_check) {
							const user: any = await forgotPassword(
								formatPhoneNumber,
							);
							setCognitoUser(user?.cognitoUser);
							setCognitoUserObj(user?.obj);
							setIsSendConfirmPhoneNumber(true);
						} else {
							Swal.fire(globalSwal.notSignUpPhoneNumber);
						}
					}
				}
			} catch (err) {
				console.log('confirm err : ', err);
				if (err.code === 'UsernameExistsException') {
					Swal.fire(globalSwal.overlapPhoneNumber);
				} else if (err.code === 'LimitExceededException') {
					Swal.fire(globalSwal.limitConfirmErr);
				}
				console.log('sign up err : ', err);
			} finally {
				setIsSendConfirmPhoneNumberLoading(false);
			}
		}
	};

	const handleSubmit = async (e: any): Promise<void> => {
		setIsSubmitButtonLoading(true);
		e.preventDefault();
		try {
			if (isConfirm) {
				onSubmit(submitLevel, {
					confirmCode: confirmCode,
					cognitoUser: cognitoUser,
					phoneNumber: phoneNumber,
					cognitoUserObj: cognitoUserObj,
				});
			}
		} catch (err: any) {
			console.log('err : ', err);
		} finally {
			setIsSubmitButtonLoading(false);
		}
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
				<Styled.NextButton
					isActive={isConfirm}
					type="submit"
					isLoading={isSubmitButtonLoading}
				>
					<CircleSpinner size="1.5rem" isLoading={isSubmitLoading}>
						{type === 'signUp' ? '회원가입' : '다음'}
					</CircleSpinner>
				</Styled.NextButton>
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