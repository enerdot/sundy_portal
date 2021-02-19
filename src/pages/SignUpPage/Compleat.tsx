import React from 'react';
import styled from 'styled-components';

import GlobalStyled from 'style/GlobalStyled';

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
		justify-content: center;
	`,
	CoinAnimationWrapper: styled(GlobalStyled.FadeInUpRow)`
		video {
			width: 100%;
		}
		justify-content: center;
		margin-bottom: 3rem;
	`,
	HomeLink: styled.a`
		color: ${props => props.theme.colors.white};
		margin: auto;
		width: 80%;
	`,
	HomeButton: styled(GlobalStyled.Button)`
		padding: 1.5rem 0;
		font-size: 1.333rem;
	`,
};

interface SignUpCompleteSectionInterface {
	info: any;
}

const SignUpCompleteSection = (props: SignUpCompleteSectionInterface) => {
	return (
		<Styled.Wrapper>
			<Styled.Title>회원가입을 축하합니다</Styled.Title>
			<Styled.Content>회원가입 축하 포인트를 받았어요 !</Styled.Content>
			<Styled.CoinText>10000 REDi</Styled.CoinText>
			<GlobalStyled.CenterRow>
				<Styled.CoinAnimationWrapper>
					<video
						autoPlay
						src={require('videos/ani-gift-token.mp4').default}
					/>
				</Styled.CoinAnimationWrapper>
			</GlobalStyled.CenterRow>
			<GlobalStyled.FadeInUpRow>
				<Styled.HomeLink href="/">
					<Styled.HomeButton>홈으로 돌아가기</Styled.HomeButton>
				</Styled.HomeLink>
			</GlobalStyled.FadeInUpRow>
		</Styled.Wrapper>
	);
};
SignUpCompleteSection.defaultProps = {
	info: '',
};

export default SignUpCompleteSection;
