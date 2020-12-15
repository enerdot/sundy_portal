import React, { useState } from 'react';
import styled from 'styled-components';
// import useSWR from 'swr';

import GlobalStyled from 'style/GlobalStyled';

// import useCurrentUser from 'hooks/useCurrentUser';
// import useAPI from 'hooks/useAPI';
import useInput from 'hooks/useInput';

import LabelInput from 'components/Atoms/LabelInput';
import SubmitButton from 'components/Molecules/SubmitButton';
import { login } from 'api/cognito';

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
	// const { currentUser } = useCurrentUser();

	// const [API] = useMemo(useAPI, []);

	// const { data: customName, error } = useSWR('/get/all');

	const [{ userId, password }, onChange] = useInput({
		userId: '',
		password: '',
	});

	const [isSubmitButtonLoading, setIsSubmitButtonLoading] = useState(false);

	const handleSubmit = async (e: any): Promise<void> => {
		e.preventDefault();
		setIsSubmitButtonLoading(true);
		try {
			await login({
				userId: `+82${userId}`,
				password: password,
			});
		} catch (err: any) {
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
						<GlobalStyled.FadeInUpRow bottom={2}>
							<LabelInput
								title="아이디"
								name="userId"
								value={userId}
								onChange={onChange}
							/>
						</GlobalStyled.FadeInUpRow>
						<GlobalStyled.FadeInUpRow bottom={4}>
							<LabelInput
								title="비밀번호"
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
							<GlobalStyled.Link to="/register">
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
