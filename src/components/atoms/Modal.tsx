import React from 'react';
import styled from 'styled-components';

const Styled = {
	Wrapper: styled.div<{ isModal: boolean; position: string }>`
		display: ${props => (props.isModal ? 'flex' : 'none')};
		color: #ffffff;
		position: fixed;
		z-index: 31;
		top: 0;
		right: 0;
		bottom: 0;
		left: 0;
		flex-direction: row;
		align-items: ${props => props.position};
		justify-content: center;
		background-color: ${props => props.theme.colors.modalBlack};
		text-align: center;
	`,

	ModalContent: styled.div`
		background-color: ${props => props.theme.colors.modalWhite};
		margin: 20% auto;
		border-radius: 10px;
		animation: modalShow 0.15s;
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
		h2 {
			font-size: 25px;
		}
	`,
};

const positionTheme = {
	middle: 'center',
	top: 'flex-start',
	bottom: 'flex-end',
};

export type modalPosition = {
	position: 'top' | 'middle' | 'bottom';
};

export interface ModalInterface extends modalPosition {
	isModal: boolean;
	children?: any;
}

const Modal = (props: ModalInterface) => {
	const { isModal, position, children } = props;
	console.log('position : ', position);
	return (
		<Styled.Wrapper position={positionTheme[position]} isModal={isModal}>
			{children}
		</Styled.Wrapper>
	);
};
Modal.defaultProps = {
	children: '',
	isModal: false,
	position: 'middle',
};

export default Modal;
