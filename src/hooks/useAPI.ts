import axios from 'axios';
import { useCookies } from 'react-cookie';
import { getSession, signOut, signIn } from 'api/cognito';

function useAPI(): any {
	const [cookies, setCookie, removeCookie] = useCookies();
	const idToken = cookies.id_token;

	const API: any = axios.create({
		baseURL: process.env.REACT_APP_API_URL,
		headers: {
			Authorization: idToken,
		},
	});

	const APIs: any = {
		getAll: () => API.get('/get'),
	};

	const user = {
		create: (params: {
			user_phone: string;
			nickname: string;
			password: string;
		}) => API.post('/users/insert', params),
	};

	const token = {
		insert: (params: { contents: string }) =>
			API.post('/users/get-token', params),
	};

	const session = {
		create: (params: { userId: string; password: string }) =>
			signIn(params),
		update: () => getSession(),
		delete: () => signOut(),
	};

	const cookie = {
		get: () => idToken,
		create: (value: string) => setCookie('id_token', value, { path: '/' }),
		delete: () => removeCookie('id_token', { path: '/' }),
	};

	return [
		{
			API,
			APIs,
			token,
			user,
			cookie,
			session,
		},
	];
}

export default useAPI;
