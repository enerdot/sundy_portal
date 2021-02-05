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
		isConfirm: (params: { userPhone: string }) =>
			API.post('/users/check-status', params),
		notConfirmUserDelete: (params: { userPhone: string }) =>
			API.post('/users/delete-noauth', params),
		tempUserInsert: (params: {
			userPhone: string;
			nickname: string;
			password: string;
		}) => API.post('/users/insert-noauth', params),
		confirmUserUpdate: (params: { userPhone: string }) =>
			API.post('/users/update-status', params),
		confirmUserCreateWallet: (params: { userPhone: string }) =>
			API.post('/users/create-wallet', params),
		forgotPassword: (params: { new_password: string }) =>
			API.post('/users/change-pwd', params),
		signUpCheck: (params: { userPhone: string }) =>
			API.get('/users/check', { params }),
	};

	const token = {
		insert: (params: { contents: string }) =>
			API.post('/users/get-token', params),
		payment: (params: { contents: string; date: string }) =>
			API.post('/users/use-token', params),
	};

	const session = {
		insert: (params: { userId: string; password: string }) =>
			signIn(params),
		get: () => getSession(),
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
