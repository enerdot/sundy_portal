import React, { InputHTMLAttributes, useState, useEffect } from 'react';
import styled from 'styled-components';
import moment from 'moment';

import GlobalStyled from 'style/GlobalStyled';
import theme from 'style/theme';

import LabelInput from 'components/atoms/LabelInput';
import Spinner from 'components/atoms/Spinner';
import TimeCount from 'components/atoms/TimeCount';

const Styled = {
	Body: styled(GlobalStyled.Row)`
		flex-direction: column;
	`,
	InputRow: styled(GlobalStyled.Row)`
		text-align: center;
		margin-bottom: 0.5rem;
	`,
	InputLabel: styled.p`
		vertical-align: middle;
		margin: 0;
		text-align: right;
		font-weight: bold;
		font-size: 0.875rem;
	`,
	RegularRow: styled(GlobalStyled.Row)<{ isHide: boolean }>`
		display: ${props => (props.isHide ? 'none' : 'flex')};
		padding: 0 0.5rem;
	`,

	RegularMessage: styled.span`
		text-align: left;
		font-size: 0.875rem;
		color: ${props => props.color};
	`,
	ButtonCol: styled(GlobalStyled.RightCol)`
		align-items: flex-end;
	`,
	ConfirmButton: styled(GlobalStyled.ActiveButton)`
		font-size: 0.875rem;
		width: 90%;
		height: 3rem;
	`,
};

interface SignUpInputInterface extends InputHTMLAttributes<HTMLInputElement> {
	confirmValue?: any;
	confirmButtonText?: string;
	isConfirmButton?: boolean;
	onChangeRegularExpression?: any;
	onClickConfirmButton?: any;
	overlapUserIdInfos?: any;
	regularExpression: {
		successMessage: string;
		failMessage: string;
		minLength: number;
		expressionType?: string;
		maxLength: number;
		expression: any;
		isRequired?: boolean;
		requiredValue?: any;
	};
	isConfirmButtonLoading?: boolean;
	label?: string;
	confirmTime?: moment.Moment;
	// type: string;
	// name: string;
	// onChange: Function;
	// placeholder: string;

	// value: any;
	// required: boolean;
}

const SignUpInput = (props: SignUpInputInterface) => {
	const {
		type,
		name,
		onChange,
		placeholder,
		confirmValue,
		confirmButtonText,
		isConfirmButton,
		onChangeRegularExpression,
		onClickConfirmButton,
		value,
		overlapUserIdInfos,
		label,
		regularExpression,
		required,
		isConfirmButtonLoading,
		readOnly,
		confirmTime,
	} = props;

	const {
		successMessage,
		failMessage,
		minLength,
		expressionType,
		maxLength,
		expression,
		isRequired,
		requiredValue,
	} = regularExpression;

	const requiredValueFormat =
		requiredValue === undefined ? [expression] : requiredValue;

	const [regularMessage, setRegularMessage] = useState('');
	const [isHide, setIsHide] = useState(true);
	const [regularMessageColor, setRegularMessageColor] = useState('');
	const [isConfirmButtonClick, setIsConfirmButtonClick] = useState(false);

	const successColor = theme.colors.blue;
	const failColor = theme.colors.red;

	const checkOverlapUserId = (info: any, checkValue: any) => {
		let isOverlapUserId = false;
		info.map((res: any) => {
			if (checkValue === res) {
				isOverlapUserId = true;
			}
			return res;
		});
		return isOverlapUserId;
	};

	useEffect(() => {
		if (name === 'userId') {
			const isOverlapUserId = checkOverlapUserId(
				overlapUserIdInfos,
				value,
			);
			if (isOverlapUserId) {
				setRegularMessage('중복된 아이디 입니다.');
				setRegularMessageColor(failColor);
			}
		}
	}, [name, failColor, value, overlapUserIdInfos]);

	const valueRegularExpression = () => {
		if (typeof value === 'string') {
			let result = {
				message: '',
				messageColor: '#ffffff',
				isConfirm: false,
			};

			if (value === '') {
				//값이 비었을때
				if (isRequired) {
					result = {
						message: '필수 항목입니다!',
						messageColor: failColor,
						isConfirm: false,
					};
				} else {
					result = {
						message: '',
						messageColor: successColor,
						isConfirm: true,
					};
				}
			} else {
				if (expressionType === 'confirm') {
					//값이 재확인 값일때
					if (confirmValue === value) {
						result = {
							message: successMessage,
							messageColor: successColor,
							isConfirm: true,
						};
					} else {
						result = {
							message: failMessage,
							messageColor: failColor,
							isConfirm: false,
						};
					}
				} else if (value.length < minLength) {
					result = {
						message: failMessage,
						messageColor: failColor,
						isConfirm: false,
					};
				} else if (expression.exec(value)) {
					let isRequiredCheckArray = true;

					const requiredCheckArray = requiredValueFormat.map(
						(res: any) => {
							let isRequiredValue = false;
							value.split('').map((valueRes: any) => {
								if (res.exec(valueRes)) {
									isRequiredValue = true;
								}
								return valueRes;
							});
							return isRequiredValue;
						},
					);

					requiredCheckArray.map((res: any) => {
						if (!res) {
							isRequiredCheckArray = false;
						}
						return res;
					});

					if (isRequiredCheckArray) {
						if (name === 'userId') {
							const isOverlapUserId = checkOverlapUserId(
								overlapUserIdInfos,
								value,
							);
							if (isOverlapUserId) {
								result = {
									message: '중복된 아이디 입니다.',
									messageColor: failColor,
									isConfirm: false,
								};
							} else {
								result = {
									message: successMessage,
									messageColor: successColor,
									isConfirm: true,
								};
							}
						} else {
							result = {
								message: successMessage,
								messageColor: successColor,
								isConfirm: true,
							};
						}
					} else {
						result = {
							message: failMessage,
							messageColor: failColor,
							isConfirm: false,
						};
					}
				} else {
					result = {
						message: failMessage,
						messageColor: failColor,
						isConfirm: false,
					};
				}
			}
			return result;
		}
	};

	const handleOnBlur = () => {
		const result: any = valueRegularExpression();

		setRegularMessage(result.message || '');
		setRegularMessageColor(result.messageColor || '');
		onChangeRegularExpression(name, result.isConfirm);
		if (result.message === '') {
			setIsHide(true);
		} else {
			setIsHide(false);
		}
	};

	const handleOnChangeInput = (e: any) => {
		setRegularMessage('');
		if (onChange) {
			onChange(e);
		}
	};

	// const hidePassword = () => {
	//     if (type === 'password') {
	//         let result = ''
	//         for (let i = 0; i < value.length; i++) {
	//             result += '*'
	//         }
	//         return result
	//     } else {
	//         return value
	//     }
	// }

	return (
		<Styled.Body>
			<Styled.InputRow>
				<GlobalStyled.Col width={isConfirmButton ? 60 : 100}>
					<LabelInput
						label={label}
						type={type}
						autoComplete={name}
						placeholder={placeholder}
						name={name}
						value={value}
						maxLength={maxLength}
						onChange={handleOnChangeInput}
						onBlur={handleOnBlur}
						required={required}
						readOnly={readOnly}
					/>
				</GlobalStyled.Col>
				{isConfirmButton ? (
					<Styled.ButtonCol width={40}>
						<Styled.ConfirmButton
							onClick={(e: any) => {
								e.preventDefault();
								setIsConfirmButtonClick(true);
								onClickConfirmButton();
							}}
							isActive={
								isConfirmButtonLoading
									? false
									: valueRegularExpression()?.isConfirm!
							}
						>
							<Spinner
								isLoading={isConfirmButtonLoading}
								size={'1.25rem'}
							>
								{confirmButtonText}
								<TimeCount
									isStart={isConfirmButtonClick}
									time={confirmTime}
								/>
							</Spinner>
						</Styled.ConfirmButton>
					</Styled.ButtonCol>
				) : (
					''
				)}
			</Styled.InputRow>

			<Styled.RegularRow isHide={isHide}>
				<GlobalStyled.Col width={100}>
					<Styled.RegularMessage color={regularMessageColor}>
						{isConfirmButton
							? readOnly
								? regularMessage
								: ''
							: regularMessage}
					</Styled.RegularMessage>
				</GlobalStyled.Col>
			</Styled.RegularRow>
		</Styled.Body>
	);
};

SignUpInput.defaultProps = {
	type: 'text',
	name: '',
	value: '',
	isPassword: true,
	required: true,
	onChange: () => {},
	placeholder: '',
	confirmValue: '-',
	label: '',
	regularExpression: [],
	confirmButtonText: '인증번호 전송',
	onChangeRegularExpression: () => {},
	isActive: true,
	isConfirmButtonLoading: false,
};

export default SignUpInput;
