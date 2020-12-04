import axios from 'axios';
// import { useCookies } from 'react-cookie'

function useAPI() : any {
	//   const [cookies, setCookie] = useCookies()

	const API : any = axios.create({
		baseURL: process.env.REACT_APP_API_URL,
		headers: {
			Authorization: '',
		},
	});

	const APIs : any = {
		getAll:() : any => API.get('/get'),
	};


	return [
		{
			API,
			APIs,
		},
	];
}

export default useAPI;
