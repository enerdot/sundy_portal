const regularExpression = {
	userId: {
		expressionName: 'userId',
		expression: /^[0-9a-zA-Z]+$/,
		isRequired: true,
		maxLength: 8,
		minLength: 6,
		failMessage: '6~8자 이내의 영문 소문자, 숫자를 사용하세요',
		successMessage: '멋진 아이디에요!',
	},
	password: {
		expressionName: 'password',
		expression: /^[0-9a-z]+$/,
		isRequired: true,
		maxLength: 12,
		minLength: 6,
		failMessage: '6~12자 이내의 영문 소문자 + 숫자를 사용하세요',
		requiredValue: [/^[0-9]+$/, /^[a-z]+$/],
		successMessage: '안전한 비밀번호에요!',
	},
	confirmPassword: {
		expressionName: 'confirmPassword',
		expressionType: 'confirm',
		expression: /^[0-9a-z]+$/,
		isRequired: true,
		maxLength: 12,
		minLength: 6,
		failMessage: '비밀번호와 일치하지않습니다',
		successMessage: '일치합니다!',
	},
	nickname: {
		expressionName: 'expressionName',
		expression: /^[ㄱ-ㅎ|ㅏ-ㅣ|가-힣|a-z|A-Z]*$/,
		isRequired: true,
		maxLength: 6,
		minLength: 1,
		failMessage: '10자 미만으로 입력해주세요',
		successMessage: '',
	},
	birthDate: {
		expressionName: 'birthDate',
		expressionMinYear: new Date(1920, 1, 1, 0, 0, 0, 0),
		expressionMaxYear: new Date(),
		isRequired: true,
		failMessage: '생년월일을 다시 확인해주세요 ex)19980810',
		failMessageMin: '정말요...?',
		failMessageMax: '미래에서 오신분은 가입하실수 없습니다..^^',
		successMessage: '',
	},
	phoneNumber: {
		expressionName: 'phoneNumber',
		expression: /^[0-9]+$/,
		isRequired: true,
		maxLength: 11,
		minLength: 11,
		failMessage: '숫자만 입력하여 11자리를 채워주세요',
		successMessage: '',
	},
	confirmPhoneNumber: {
		expressionName: 'confirmPhoneNumber',
		expression: /^[0-9]+$/,
		isRequired: true,
		maxLength: 6,
		minLength: 6,
		failMessage: '숫자만 입력하여 6자리를 채워주세요',
		successMessage: '',
	},
	newPassword: {
		expressionName: 'newPassword',
		expression: /^[0-9a-z]+$/,
		isRequired: false,
		maxLength: 12,
		minLength: 8,
		failMessage: '8~12자 이내의 영문 소문자, 숫자를 사용하세요',
		successMessage: '안전한 비밀번호에요!',
	},
	newPasswordConfirm: {
		expressionName: 'newPasswordConfirm',
		expressionType: 'confirm',
		expression: /^[0-9a-z]+$/,
		isRequired: false,
		maxLength: 12,
		minLength: 8,
		failMessage: '비밀번호와 일치하지않습니다',
		successMessage: '일치합니다!',
	},
};

export default regularExpression;
