import { SweetAlertOptions } from 'sweetalert2';

interface GlobalSwalType {
	confirm: SweetAlertOptions;
	urlErr: SweetAlertOptions;
	apiErr: SweetAlertOptions;
}

const globalSwal: GlobalSwalType = {
	confirm: {
		icon: 'success',
		title: '성공',
		confirmButtonText: '확인',
	},
	apiErr: {
		icon: 'success',
		title: '통신 실패',
		confirmButtonText: '확인',
	},
	urlErr: {
		icon: 'error',
		title: '잘못된 URL 접속입니다.',
		confirmButtonText: '확인',
	},
};

export default globalSwal;
