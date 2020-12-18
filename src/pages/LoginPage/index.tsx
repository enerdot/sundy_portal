import React, { useState } from 'react';
import styled from 'styled-components';
// import useSWR from 'swr';

import GlobalStyled from 'style/GlobalStyled';

import routerUrl from 'config/routerUrl';

import useCurrentUser from 'hooks/useCurrentUser';
// import useAPI from 'hooks/useAPI';
import useInput from 'hooks/useInput';

import LabelInput from 'components/Atoms/LabelInput';
import SubmitButton from 'components/Molecules/SubmitButton';

const Styled = {
	Wrapper: styled(GlobalStyled.Card)`
		flex-direction: column;
		width: 90%;
		max-width: 520px;
		box-shadow: none;
		margin: 0 auto;
		margin-top: 1rem;
		color: ${props => props.theme.gray};
		font-size: 1.25rem;
	`,
	ContentWrapper: styled.form`
		margin: 5rem 0;
	`,
	Logo: styled(GlobalStyled.CenterRow)`
		font-size: 2rem;
		font-weight: bold;
		color: ${props => props.theme.lightBlack};
	`,
	SubmitButton: styled(GlobalStyled.ActiveButton)`
		border-radius: 3rem;
		font-size: 1.25rem;
		padding: 1.25rem;
	`,
	ErrMessageRow: styled(GlobalStyled.Row)`
		font-size: 1rem;
		color: ${props => props.theme.red};
	`,
};

interface LoginPageInterface {
	match: any;
	location: any;
	history: any;
}

const LoginPage = ({
	match,
	location,
	history,
}: LoginPageInterface): JSX.Element => {
	const { createCurrentUser } = useCurrentUser();

	// const [API] = useMemo(useAPI, []);

	// const { data: customName, error } = useSWR('/get/all');

	const [{ userId, password }, onChange] = useInput({
		userId: '',
		password: '',
	});

	const [isLoginFail, setIsLoginFail] = useState(false);

	const [isSubmitButtonLoading, setIsSubmitButtonLoading] = useState(false);

	const handleSubmit = async (e: any): Promise<void> => {
		e.preventDefault();
		setIsSubmitButtonLoading(true);
		try {
			await createCurrentUser({
				userId: `+82${userId}`,
				password: password,
			});
			window.location.href = '/';
		} catch (err: any) {
			if (err.code === 'NotAuthorizedException') {
				setIsLoginFail(true);
			}
			console.log('err : ', err);
		} finally {
			setIsSubmitButtonLoading(false);
		}
	};

	return (
		<GlobalStyled.Body>
			<GlobalStyled.Container>
				<Styled.Wrapper>
					<Styled.Logo>로그인</Styled.Logo>
					<Styled.ContentWrapper onSubmit={handleSubmit}>
						<GlobalStyled.FadeInUpRow bottom={isLoginFail ? 1 : 2}>
							<LabelInput
								label="아이디"
								name="userId"
								value={userId}
								onChange={onChange}
							/>
						</GlobalStyled.FadeInUpRow>
						{isLoginFail ? (
							<Styled.ErrMessageRow bottom={2}>
								아이디 또는 비밀번호가 일치하지 않습니다.
							</Styled.ErrMessageRow>
						) : (
							''
						)}
						<GlobalStyled.FadeInUpRow bottom={4}>
							<LabelInput
								label="비밀번호"
								type="password"
								name="password"
								value={password}
								onChange={onChange}
							/>
						</GlobalStyled.FadeInUpRow>
						<GlobalStyled.FadeInUpRow bottom={4}>
							<SubmitButton
								type="submit"
								isActive={userId && password}
								isLoading={isSubmitButtonLoading}
							>
								로그인
							</SubmitButton>
						</GlobalStyled.FadeInUpRow>
						<GlobalStyled.CenterRow bottom={3}>
							<GlobalStyled.Link to="/">
								비밀번호 재설정
							</GlobalStyled.Link>
						</GlobalStyled.CenterRow>
						<GlobalStyled.CenterRow>
							<GlobalStyled.Link to={routerUrl.signUpPage}>
								<b>회원가입</b>
							</GlobalStyled.Link>
						</GlobalStyled.CenterRow>
					</Styled.ContentWrapper>
				</Styled.Wrapper>
			</GlobalStyled.Container>
		</GlobalStyled.Body>
	);
};

export default LoginPage;
