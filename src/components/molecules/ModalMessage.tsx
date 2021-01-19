import React from 'react';
import styled from 'styled-components';

import GlobalStyled from 'style/GlobalStyled';

import Modal, { ModalInterface } from 'components/atoms/Modal';

const Styled = {
	Body: styled.div<{ borderRadius: string }>`
		width: 100%;
		max-width: 720px;
		background-color: ${props => props.theme.colors.modalBackgroundBlue};
		padding: 2rem;
		animation: modalShow 0.15s;
		border-radius: ${props => props.borderRadius};
		@keyframes modalShow {
			from {
				transform: scale(0);
			}
			to {
				transform: scale(1);
			}
		}
		@keyframes modalClose {
			from {
				transform: scale(0);
			}
			to {
				transform: scale(1);
			}
		}
	`,
	Wrapper: styled(GlobalStyled.HeightRow)`
		max-width: 300px;
		margin: auto;
	`,
	Title: styled(GlobalStyled.HeightRow)`
		text-align: left;
		font-weight: bold;
		font-size: 1.667rem;
	`,
	GrayTitle: styled(GlobalStyled.HeightRow)`
		text-align: left;
		font-size: 1rem;
		color: ${props => props.theme.colors.white};
		opacity: 0.6;
	`,
	GrayCenterTitle: styled(GlobalStyled.HeightRow)`
		text-align: center;
		font-size: 1rem;
		color: ${props => props.theme.colors.white};
		opacity: 0.6;
	`,
	SubmitButton: styled(GlobalStyled.Button)`
		border-radius: 5rem;
		width: auto;
		padding: 0.5rem 2.5rem;
	`,
};

const positionBorder = {
	top: '3rem 3rem 0 0',
	middle: '3rem 3rem 0 0',
	bottom: '3rem 3rem 0 0',
};

export interface ModalMessageInterface extends ModalInterface {
	submitButtonText?: string | undefined;
	onClickSubmitButton: (e: any) => void;
}

const ModalMessage = (props: ModalMessageInterface) => {
	const {
		isModal,
		submitButtonText,
		onClickSubmitButton,
		children,
		position,
	} = props;

	return (
		<Modal position={position} isModal={isModal}>
			<Styled.Body borderRadius={positionBorder[position]}>
				<Styled.Wrapper>
					{submitButtonText ? (
						<GlobalStyled.CenterRow>
							<Styled.SubmitButton onClick={onClickSubmitButton}>
								{submitButtonText}
							</Styled.SubmitButton>
						</GlobalStyled.CenterRow>
					) : (
						''
					)}

					<GlobalStyled.Row>{children}</GlobalStyled.Row>
				</Styled.Wrapper>
			</Styled.Body>
		</Modal>
	);
};
ModalMessage.defaultProps = {
	children: '',
	subTopTitle: '',
	title: '',
	subBottomTitle: '',
	onClickSubmitButton: () => {},
	isModal: false,
	position: 'middle',
};

export default ModalMessage;
