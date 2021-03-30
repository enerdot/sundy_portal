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
	confirmTimeOut: {
		icon: 'error',
		title: '인증시간을 초과하였습니다.',
		confirmButtonText: '확인',
	},
	overlapPhoneNumber: {
		icon: 'error',
		title: '해당 전화번호는 이미 계정이 있는 전화번호입니다!',
		confirmButtonText: '확인',
	},
	confirmTimeOver: {
		icon: 'error',
		title: '인증 시간이 초과되었습니다',
		confirmButtonText: '확인',
	},
	confirmErr: {
		icon: 'error',
		title: '인증 번호가 잘못 입력되었습니다',
		confirmButtonText: '확인',
	},
	DBErr: {
		icon: 'error',
		title: 'DB 에러',
		confirmButtonText: '확인',
	},
	notSignUpPhoneNumber: {
		icon: 'error',
		title: '해당 전화번호는 없는 \n 계정입니다!',
		confirmButtonText: '확인',
	},
	limitConfirmErr: {
		icon: 'error',
		title: '너무많은 인증시도를 하였습니다.',
		text: '잠시후에 다시 시도해주세요.',
		confirmButtonText: '확인',
	},
	alreadySignUser: {
		icon: 'error',
		title: '이미 회원가입된 회원입니다.',
		confirmButtonText: '확인',
	},
	bannedUser: {
		icon: 'error',
		title: '차단된 회원입니다.',
		confirmButtonText: '확인',
	},
	needAccountInfo: {
		icon: 'warning',
		title: '입력되지 않은 정보가 있습니다.',
		confirmButtonText: '확인',
	},

	needNickName: {
		icon: 'warning',
		title: '닉네임의 가입 조건이 일치하지 않습니다.',
		confirmButtonText: '확인',
	},
	needPassword: {
		icon: 'warning',
		title: '비밀번호의 가입 조건이 일치하지 않습니다.',
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
