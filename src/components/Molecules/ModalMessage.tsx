import React from 'react';
import styled from 'styled-components';

import GlobalStyled from 'style/GlobalStyled';

import Modal, { ModalInterface } from 'components/Atoms/Modal';
import TextBrFormat from 'components/Atoms/TextBrFormat';

const Styled = {
	Content: styled.div`
		width: 100%;
		max-width: 720px;
		background-color: rgba(53, 169, 255, 0.25);
		padding: 6rem 2rem;
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
	`,
	Title: styled(GlobalStyled.HeightRow)`
		text-align: left;
		font-weight: bold;
		font-size: 1.667rem;
	`,
	GrayTitle: styled(GlobalStyled.HeightRow)`
		text-align: left;
		font-size: 1rem;
		color: ${props => props.theme.white};
		opacity: 0.6;
	`,
	GrayCenterTitle: styled(GlobalStyled.HeightRow)`
		text-align: center;
		font-size: 1rem;
		color: ${props => props.theme.white};
		opacity: 0.6;
	`,
	SubmitButton: styled(GlobalStyled.Button)`
		border-radius: 5rem;
		width: auto;
		padding: 1rem 2.5rem;
	`,
};

export interface ModalMessageInterface extends ModalInterface {
	subTopTitle: string;
	title: string;
	subBottomTitle: string;
	submitButtonText?: string;
	onClickSubmitButton: (e: any) => void;
}

const ModalMessage = (props: ModalMessageInterface) => {
	const {
		subTopTitle,
		title,
		subBottomTitle,
		isModal,
		submitButtonText,
		onClickSubmitButton,
		children,
	} = props;

	return (
		<Modal isModal={isModal}>
			<Styled.Content>
				<Styled.GrayTitle bottom={1}>
					<TextBrFormat value={subTopTitle} />
				</Styled.GrayTitle>
				<Styled.Title bottom={2}>
					<TextBrFormat value={title} />
				</Styled.Title>
				<Styled.GrayCenterTitle bottom={2}>
					<TextBrFormat value={subBottomTitle} />
				</Styled.GrayCenterTitle>
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
			</Styled.Content>
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
};

export default ModalMessage;
