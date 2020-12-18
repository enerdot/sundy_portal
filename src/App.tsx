import { Suspense, lazy, useEffect } from 'react';
import { SWRConfig } from 'swr';
import styled, { ThemeProvider } from 'styled-components';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import createFetcher from 'config/fetcher';

import theme from 'style/theme';

import GlobalHeader from 'components/Organisms/GlobalHeader';
import GlobalFooter from 'components/Organisms/GlobalFooter';
import Spinner from 'components/Atoms/Spinner';
// import Swal from 'sweetalert2';

// import globalSwal from 'config/alert';

import routerUrl from 'config/routerUrl';

import useCurrentUser from 'hooks/useCurrentUser';

const MainPage = lazy(() => import('./pages/MainPage'));
const RegionPage = lazy(() => import('./pages/RegionPage'));
const InfoPage = lazy(() => import('./pages/InfoPage'));
const RankingPage = lazy(() => import('./pages/RankingPage'));
const LoginPage = lazy(() => import('./pages/LoginPage'));
const SignUpPage = lazy(() => import('./pages/SignUpPage'));

const swrConfig: object = {
	onErrorRetry: (
		error: any,
		key: any,
		option: any,
		revalidate: any,
		{ retryCount }: any,
	) => {
		// if (retryCount >= 3) return;
		if (error.response && error.response.status === 404) return;
		// if (error.response && error.response.status === 403) {
		// 	Swal.fire(globalSwal.apiErr);
		// 	return;
		// }
		// setTimeout(() => revalidate({ retryCount: retryCount + 1 }), 5000);
	},
};

const Styled = {
	Header: styled.div`
		width: 100%;
		height: 10vh;
	`,
	Wrapper: styled.div`
		width: 100%;
		height: 90vh;
	`,
};

function App() {
	const { accessToken, getCurrentUser } = useCurrentUser();

	useEffect(() => {
		async function loading() {
			await getCurrentUser();
		}
		loading();
	}, [getCurrentUser]);

	const fetcher = createFetcher(accessToken);
	return (
		<Router>
			<SWRConfig value={{ ...swrConfig, fetcher }}>
				<ThemeProvider theme={theme}>
					<Styled.Header>
						<GlobalHeader />
					</Styled.Header>
					<Styled.Wrapper>
						<Suspense fallback={<Spinner height="80vh" />}>
							<Switch>
								<Route exact path="/" component={MainPage} />
								<Route
									path={`${routerUrl.regionPage}/:region/:date`}
									component={RegionPage}
								/>
								<Route
									path={`${routerUrl.rankingPage}/:region/:date`}
									component={RankingPage}
								/>
								<Route
									path={`${routerUrl.infoPage}/:id/:date`}
									component={InfoPage}
								/>
								<Route
									path={`${routerUrl.loginPage}`}
									component={LoginPage}
								/>
								<Route
									path={`${routerUrl.signUpPage}`}
									component={SignUpPage}
								/>
								<Route
									component={() => {
										return <div>Err</div>;
									}}
								/>
							</Switch>
						</Suspense>
					</Styled.Wrapper>
					<GlobalFooter />
				</ThemeProvider>
			</SWRConfig>
		</Router>
	);
}

export default App;
