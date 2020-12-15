import React, { useMemo, useState } from 'react';
import styled from 'styled-components';
import useSWR from 'swr';

import GlobalStyled from 'style/GlobalStyled';

import useCurrentUser from 'hooks/useCurrentUser';
import useAPI from 'hooks/useAPI';
import ProcessHeader from 'components/Organisms/ProcessHeader';

const Styled = {
	Wrapper: styled(GlobalStyled.Row)`
		padding: 1rem;
		min-height: 500px;
	`,
	NextButton: styled(GlobalStyled.ActiveButton)`
		width: 100%;
		padding: 2rem;
		font-size: 1.5rem;
		border-radius: 0;
	`,
};

interface RegisterPageInterface {
	match: any;
	location: any;
	history: any;
}

const RegisterPage = ({
	match,
	location,
	history,
}: RegisterPageInterface): JSX.Element => {
	const { currentUser } = useCurrentUser();

	const [API] = useMemo(useAPI, []);

	const { data: customName, error } = useSWR('/get/all');

	const [processHeaderInfos, setProcessHeaderInfos] = useState([
		{
			title: '약관동의',
			sub: '약관 동의 후 회원가입을 진행합니다.',
			value: 1,
			status: 'active',
		},
		{
			title: '휴대전화 번호 인증',
			sub:
				'휴대전화 번호를 입력해주세요.\n 휴대전화 번호는 로그인에 이용됩니다.',
			value: 2,
			status: 'beActive',
		},
		{
			title: '비밀번호와 닉네임 설정',
			sub: '이제 마지막이에요. \n 비밀번호와 닉네임을 설정합니다.',
			value: 3,
			status: 'beActive',
		},
	]);

	const handleSubmit = async (): Promise<void> => {
		try {
			await API.APIs.getAll();
			console.log(API);
		} catch (err: any) {
			console.log('err : ', err);
		}
	};

	return (
		<GlobalStyled.Body>
			<GlobalStyled.Container>
				<Styled.Wrapper>
					<ProcessHeader infos={processHeaderInfos} />
				</Styled.Wrapper>
				<Styled.NextButton isActive={false}>다음</Styled.NextButton>
			</GlobalStyled.Container>
		</GlobalStyled.Body>
	);
};

export default RegisterPage;
