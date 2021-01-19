import React from 'react';
import styled from 'styled-components';

import GlobalStyled from 'style/GlobalStyled';
import routerUrl from 'config/routerUrl';

const Styled = {
	Wrapper: styled(GlobalStyled.HeightRow)`
		padding: 1rem;
		margin: auto;
	`,
	Title: styled(GlobalStyled.FadeInUpRow)`
		font-size: 1.667rem;
		font-weight: bold;
		margin-bottom: 2rem;
		justify-content: center;
	`,
	Content: styled(GlobalStyled.FadeInUpRow)`
		font-size: 1.333rem;
		margin-bottom: 2rem;
		justify-content: center;
	`,
	CoinText: styled(GlobalStyled.FadeInUpRow)`
		font-size: 1.667rem;
		color: ${props => props.theme.colors.sky};
		font-weight: bold;
		margin-bottom: 3rem;
		justify-content: center;
	`,
	CoinCompleteImgRow: styled(GlobalStyled.FadeInUpRow)`
		width: 15rem;
		height: 15rem;
		margin-bottom: 3rem;
		justify-content: center;
	`,
	HomeLink: styled(GlobalStyled.Link)`
		margin: auto;
		width: 80%;
	`,
	HomeButton: styled(GlobalStyled.Button)`
		padding: 1.5rem 0;
		font-size: 1.333rem;
	`,
};

const ForgotPasswordCompleatSection = () => {
	return (
		<Styled.Wrapper>
			<Styled.Title>비밀번호가 재설정 되었습니다.</Styled.Title>
			<Styled.Content>새로운 비밀번호로 로그인하세요.</Styled.Content>
			<GlobalStyled.CenterRow>
				<Styled.CoinCompleteImgRow>
					<img
						alt="token"
						src={
							require('images/ic-forgot-password-compleat.svg')
								.default
						}
					/>
				</Styled.CoinCompleteImgRow>
			</GlobalStyled.CenterRow>
			<GlobalStyled.FadeInUpRow>
				<Styled.HomeLink to={routerUrl.loginPage}>
					<Styled.HomeButton>로그인으로 돌아가기</Styled.HomeButton>
				</Styled.HomeLink>
			</GlobalStyled.FadeInUpRow>
		</Styled.Wrapper>
	);
};

export default ForgotPasswordCompleatSection;
