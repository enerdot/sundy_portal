import React, { useState } from 'react';
import styled from 'styled-components';

import GlobalStyled from 'style/GlobalStyled';

import SubmitButton from 'components/Molecules/SubmitButton';
import SignUpInput from 'components/Molecules/SignUpInput';

import useInput from 'hooks/useInput';

import regularExpression from 'config/regularExpression';

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

interface AttributeSettingSectionInterface {
	onSubmit: any;
	submitLevel?: number;
}

const AttributeSettingSection = ({
	onSubmit,
	submitLevel,
}: AttributeSettingSectionInterface): JSX.Element => {
	const [{ password, confirmPassword, nickname }, onChange] = useInput({
		password: '',
		confirmPassword: '',
		nickname: '',
	});

	const [isSubmitButtonLoading, setIsSubmitButtonLoading] = useState(false);

	const [
		isStateRegularExpressionInfo,
		setIsStateRegularExpressionInfo,
	] = useState({
		password: false,
		confirmPassword: false,
		nickname: false,
	});

	const isConfirm = !(Object.keys(isStateRegularExpressionInfo) as Array<
		keyof typeof isStateRegularExpressionInfo
	>).some(res => {
		return !isStateRegularExpressionInfo[res];
	});

	const handleSubmit = async (e: any): Promise<void> => {
		setIsSubmitButtonLoading(true);
		e.preventDefault();
		try {
			if (isConfirm) {
				onSubmit(submitLevel, {
					password,
					nickname,
				});
			}
		} catch (err: any) {
			console.log('err : ', err);
		} finally {
			setIsSubmitButtonLoading(false);
		}
	};

	const handleOnChangeRegularExpression = (name: string, value: any) => {
		setIsStateRegularExpressionInfo(prevState => {
			return { ...prevState, [name]: value };
		});
	};

	return (
		<Styled.Wrapper onSubmit={handleSubmit}>
			<Styled.TermWrapper>
				<GlobalStyled.FadeInUpRow bottom={2.5}>
					<SignUpInput
						label="닉네임"
						type="text"
						name="nickname"
						value={nickname}
						onChange={onChange}
						regularExpression={regularExpression.nickname}
						onChangeRegularExpression={
							handleOnChangeRegularExpression
						}
						required={true}
					/>
				</GlobalStyled.FadeInUpRow>
				<GlobalStyled.FadeInUpRow bottom={2.5}>
					<SignUpInput
						label="비밀번호"
						type="password"
						name="password"
						value={password}
						onChange={onChange}
						regularExpression={regularExpression.password}
						onChangeRegularExpression={
							handleOnChangeRegularExpression
						}
						required={true}
					/>
				</GlobalStyled.FadeInUpRow>
				<GlobalStyled.FadeInUpRow>
					<SignUpInput
						label="비밀번호 재입력"
						type="password"
						name="confirmPassword"
						value={confirmPassword}
						confirmValue={password}
						onChange={onChange}
						onFocus={() => {
							window.scrollTo(0, 300);
						}}
						regularExpression={regularExpression.confirmPassword}
						onChangeRegularExpression={
							handleOnChangeRegularExpression
						}
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
					다음
				</Styled.NextButton>
			</Styled.ButtonWrapper>
		</Styled.Wrapper>
	);
};

AttributeSettingSection.defaultProps = {
	onSubmit: () => {},
	submitLevel: 2,
};

export default AttributeSettingSection;
