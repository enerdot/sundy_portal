import { SweetAlertOptions } from 'sweetalert2';

const globalSwal: { [key: string]: SweetAlertOptions } = {
	confirm: {
		icon: 'success',
		title: '성공',
		confirmButtonText: '확인',
	},
	apiErr: {
		icon: 'error',
		title: '통신 실패',
		confirmButtonText: '확인',
	},
	userErr: {
		icon: 'warning',
		title: '회원만 사용 가능한 기능입니다.',
		confirmButtonText: '확인',
	},
	urlErr: {
		icon: 'error',
		title: '잘못된 URL 접속입니다.',
		confirmButtonText: '확인',
	},
	overlapPhoneNumber: {
		icon: 'error',
		title: '해당 전화번호는 이미 계정이 있는 전화번호입니다!',
		confirmButtonText: '확인',
	},
	isPaymentToken: {
		icon: 'warning',
		title: '',
		text:
			'발전소 위치, 용량, 설비 정보와 발전량 그래프를\n확인해 볼 수 있습니다.',
		showConfirmButton: true,
		showCancelButton: true,
		confirmButtonText: '저장하기',
		cancelButtonText: '돌아가기',
	},
};

export default globalSwal;
