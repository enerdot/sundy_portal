import React, { useState, Suspense, lazy, useEffect } from 'react';
import styled from 'styled-components';
import { Route, Switch } from 'react-router-dom';
// import useSWR from 'swr';

import GlobalStyled from 'style/GlobalStyled';

// import useCurrentUser from 'hooks/useCurrentUser';
// import useAPI from 'hooks/useAPI';
import Spinner from 'components/Atoms/Spinner';

import ProcessHeader from 'components/Organisms/ProcessHeader';
import AttributeSettingSection from './AttributeSettingSection';

const TermSection = lazy(() => import('./TermSection'));

const Styled = {
	Wrapper: styled(GlobalStyled.HeightRow)`
		height: 100%;
	`,
	HeaderProcessWrapper: styled(GlobalStyled.HeightRow)`
		padding: 1rem;
		height: 20%;
	`,
	ContentWrapper: styled(GlobalStyled.HeightRow)`
		height: 80%;
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
	// const { currentUser } = useCurrentUser();

	// const [API] = useMemo(useAPI, []);

	// const { data: customName, error } = useSWR('/get/all');

	// const handleSubmit = async (): Promise<void> => {
	// 	try {
	// 		await API.APIs.getAll();
	// 		console.log(API);
	// 	} catch (err: any) {
	// 		console.log('err : ', err);
	// 	}
	// };

	useEffect(() => {
		console.log(match, location);
	}, [match, location]);

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

	return (
		<GlobalStyled.Body>
			<GlobalStyled.Container>
				<Styled.Wrapper>
					<Styled.HeaderProcessWrapper>
						<ProcessHeader infos={processHeaderInfos} />
					</Styled.HeaderProcessWrapper>
					<Styled.ContentWrapper>
						<Suspense fallback={<Spinner height="80vh" />}>
							<Switch>
								<Route
									exact
									path={`${match.path}`}
									component={TermSection}
								/>
								<Route
									exact
									path={`${match.path}/attribute`}
									component={AttributeSettingSection}
								/>
								<Route
									component={() => {
										return <div>Err</div>;
									}}
								/>
							</Switch>
						</Suspense>
					</Styled.ContentWrapper>
				</Styled.Wrapper>
			</GlobalStyled.Container>
		</GlobalStyled.Body>
	);
};

export default RegisterPage;
