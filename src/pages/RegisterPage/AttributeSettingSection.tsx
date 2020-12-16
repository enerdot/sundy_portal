import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

import GlobalStyled from 'style/GlobalStyled';

import LabelInput from 'components/Atoms/LabelInput';
import SubmitButton from 'components/Molecules/SubmitButton';
import RegisterInput from 'components/Molecules/RegisterInput';

import useInput from 'hooks/useInput';

import regularExpression from 'config/reqularExpression';

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
	match: any;
	location: any;
	history: any;
}

const AttributeSettingSection = ({
	match,
	location,
	history,
}: AttributeSettingSectionInterface): JSX.Element => {
	useEffect(() => {
		console.log(window.scrollX, window.scrollY);
	}, []);

	const [{ password, passwordConfirm, nickname }, onChange] = useInput({
		password: '',
		passwordConfirm: '',
		nickname: '',
	});

	const [isSubmitButtonLoading, setIsSubmitButtonLoading] = useState(false);

	const [
		isStateRegularExpressionInfo,
		setIsStateRegularExpressionInfo,
	] = useState({
		password: false,
		passwordConfirm: false,
		nickname: false,
	});

	const handleSubmit = async (e: any): Promise<void> => {
		e.preventDefault();
		setIsSubmitButtonLoading(true);
		try {
			// await login({
			// 	userId: `+82${userId}`,
			// 	password: password,
			// });
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
		<Styled.Wrapper>
			<Styled.TermWrapper>
				<GlobalStyled.FadeInUpRow bottom={2.5}>
					<RegisterInput
						title="닉네임"
						type="text"
						name="nickname"
						value={nickname}
						onChange={onChange}
						regularExpression={regularExpression.name}
						onChangeRegularExpression={
							handleOnChangeRegularExpression
						}
					/>
				</GlobalStyled.FadeInUpRow>
				<GlobalStyled.FadeInUpRow bottom={2.5}>
					<LabelInput
						title="비밀번호"
						type="password"
						name="password"
						value={password}
						onChange={onChange}
					/>
				</GlobalStyled.FadeInUpRow>
				<GlobalStyled.FadeInUpRow>
					<LabelInput
						title="비밀번호 재입력"
						type="password"
						name="passwordConfirm"
						value={passwordConfirm}
						onChange={onChange}
						onFocus={() => {
							window.scrollTo(0, 300);
						}}
					/>
				</GlobalStyled.FadeInUpRow>
			</Styled.TermWrapper>
			<Styled.ButtonWrapper>
				<Styled.NextButton
					onClick={handleSubmit}
					isActive={false}
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
	processHeaderInfos: [],
	termHeaderInfo: {},
	termInfos: [],
	onChange: () => {},
};

export default AttributeSettingSection;
