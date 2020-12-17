import { useContext, useCallback } from 'react';

import useAPI from 'hooks/useAPI';

import { CurrentUserContext } from 'contexts/CurrentUserContext';

function useCurrentUser() {
	const [currentUser, setCurrentUser] = useContext(CurrentUserContext);
	const [API] = useAPI();
	const accessToken = API.cookie.get();

	const createCurrentUser = useCallback(
		async (params: { userId: string; password: string }) => {
			try {
				await API.cookie.delete();
				await API.session.delete();
				const userSession = await API.session.create({
					...params,
					userId: `+82${params.userId}`,
				});
				console.log('userSession : ', userSession);
				setCurrentUser(userSession);
				API.cookie.create(userSession);
			} catch (error) {
				setCurrentUser(null);
				throw error;
			}
			// eslint-disable-next-line
		},
		[API, setCurrentUser],
	);

	const getCurrentUser = useCallback(async () => {
		try {
			const userSession = await API.session.update();
			const idToken = userSession.signInUserSession.idToken.jwtToken;
			console.log('idToken : ', idToken);
			setCurrentUser(idToken);
			API.cookie.create(idToken);
		} catch (error) {
			setCurrentUser(null);
			API.cookie.delete();
		}
		// eslint-disable-next-line
	}, [accessToken, setCurrentUser]);

	const deleteSession = useCallback(async () => {
		try {
			await API.session.delete();
		} finally {
			API.cookie.delete();
			window.location.href = '/login';
		}
	}, [API]);

	return {
		createCurrentUser,
		currentUser,
		accessToken,
		getCurrentUser,
		deleteSession,
	};
}

export default useCurrentUser;
