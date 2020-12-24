import React from 'react';
import styled from 'styled-components';

import GlobalStyled from 'style/GlobalStyled';

import SignUpTermSectionCheck from 'components/templates/SignUpTermTemplate';
import routerUrl from 'config/routerUrl';

import useCheckBox from 'hooks/useCheckBox';

const Styled = {
	Wrapper: styled.form`
		display: flex;
		flex-direction: column;
		width: 100%;
		align-items: flex-end;
		justify-content: center;
		height: 100%;
	`,
	TermWrapper: styled(GlobalStyled.Row)`
		height: 85%;
		align-items: flex-end;
		padding: 1rem;
	`,
	ButtonWrapper: styled(GlobalStyled.Row)`
		height: 15%;
		align-items: flex-end;
	`,
	NextButton: styled(GlobalStyled.ActiveButton)`
		width: 100%;
		height: 5rem;
		font-size: 1.5rem;
		border-radius: 0;
	`,
};

interface SignUpTermSectionInterface {
	onSubmit: any;
	submitLevel?: number;
}

const SignUpTermSection = ({
	onSubmit,
	submitLevel,
}: SignUpTermSectionInterface): JSX.Element => {
	const [{ all, term, personalProfile }, onChange] = useCheckBox({
		all: false,
		term: false,
		personalProfile: false,
	});

	const termHeaderInfo = {
		label: '약관 전체 동의하기',
		value: all,
		name: 'all',
		required: true,
	};

	const termInfos = [
		{
			label: '이용약관 동의 (필수)',
			value: term,
			name: 'term',
			required: true,
			url: routerUrl.termPage,
		},
		{
			label: '개인정보 취급방침 (필수)',
			value: personalProfile,
			name: 'personalProfile',
			required: true,
			url: routerUrl.privacyPage,
		},
	];

	const handleSubmit = (e: any) => {
		e.preventDefault();
		onSubmit(submitLevel);
	};

	return (
		<Styled.Wrapper onSubmit={handleSubmit}>
			<Styled.TermWrapper>
				<SignUpTermSectionCheck
					headerInfo={termHeaderInfo}
					infos={termInfos}
					onChange={onChange}
				/>
			</Styled.TermWrapper>
			<Styled.ButtonWrapper>
				<Styled.NextButton isActive={all} type="submit">
					다음
				</Styled.NextButton>
			</Styled.ButtonWrapper>
		</Styled.Wrapper>
	);
};
SignUpTermSection.defaultProps = {
	onSubmit: () => {},
	submitLevel: 1,
};

export default SignUpTermSection;
