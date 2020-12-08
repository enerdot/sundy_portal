import { Suspense, lazy } from 'react';
import { SWRConfig } from 'swr';
import { ThemeProvider } from 'styled-components';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import createFetcher from 'config/fetcher';

import theme from 'style/theme';

import GlobalHeader from 'components/Organisms/GlobalHeader';
import GlobalFooter from 'components/Organisms/GlobalFooter';

const MainPage = lazy(() => import('./pages/MainPage'));
const RegionPage = lazy(() => import('./pages/RegionPage'));

const swrConfig: object = {
	onErrorRetry: (
		error: any,
		key: any,
		option: any,
		revalidate: any,
		{ retryCount }: any,
	) => {
		if (retryCount >= 3) return;
		if (error.response && error.response.status === 404) return;
		setTimeout(() => revalidate({ retryCount: retryCount + 1 }), 5000);
	},
};

function App() {
	const fetcher = createFetcher('accessToken');
	return (
		<Router>
			<SWRConfig value={{ ...swrConfig, fetcher }}>
				<ThemeProvider theme={theme}>
					<GlobalHeader />
					<Suspense fallback={<div>Loading</div>}>
						<Switch>
							<Route exact path="/" component={MainPage} />
							<Route
								path="/region/:region?"
								component={RegionPage}
							/>
							<Route
								component={() => {
									return <div>Err</div>;
								}}
							/>
						</Switch>
					</Suspense>
					<GlobalFooter />
				</ThemeProvider>
			</SWRConfig>
		</Router>
	);
}

export default App;
