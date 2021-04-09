import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useCookies } from 'react-cookie';
import moment from 'moment';

import GlobalStyled from 'style/GlobalStyled';
import UserProfile from 'components/molecules/UserProfile';

import useCurrentUser from 'hooks/useCurrentUser';

import Popup from 'components/atoms/Popup';

const Styled = {
	Wrapper: styled(GlobalStyled.CenterRow)`
		font-size: 2rem;
		color: ${props => props.theme.colors.sky};
		font-weight: bold;
		cursor: default;
		text-align: center;
	`,
	PopupWrapper: styled(GlobalStyled.HeightRow)`
		font-family: Nanum Gothic;
		font-size: 1.5rem;
		width: 100vw;
		max-width: 425px;
		margin: 1rem;
		padding: 1.7rem;
		background-color: ${props => props.theme.colors.popupBlue};
		color: ${props => props.theme.colors.white};
		border-radius: 1rem;
		align-items: center;
		justify-content: center;
	`,
	PopupSubText: styled(GlobalStyled.HeightRow)``,
	PopupCancelButton: styled(GlobalStyled.Button)`
		background-color: ${props => props.theme.colors.popupBlue};
		border: 1px solid ${props => props.theme.colors.white};
	`,
};

const GlobalHeader = () => {
	const { currentUser } = useCurrentUser();

	const [cookies, setCookies] = useCookies();

	const [isPopup, setIsPopup] = useState(false);

	useEffect(() => {
		console.log('popupTime2 : ', cookies?.popupTime2);
		if (cookies?.popupTime2) {
			if (moment().diff(moment(cookies?.popupTime2), 'days') > 7) {
				setIsPopup(true);
			}
		} else {
			setIsPopup(true);
		}
	}, [cookies?.popupTime2]);

	const handleClickCancelPopup = () => {
		setCookies('popupTime2', moment().format('YYYY-MM-DD HH:mm'));
		setIsPopup(false);
	};

	return (
		<GlobalStyled.Body>
			<GlobalStyled.Container>
				<GlobalStyled.ContentRow>
					<Styled.Wrapper>
						<GlobalStyled.Col width={10}></GlobalStyled.Col>
						<GlobalStyled.CenterCol width={80}>
							<GlobalStyled.Link to="/">
								SUNDY PORTAL
							</GlobalStyled.Link>
						</GlobalStyled.CenterCol>
						<GlobalStyled.Col width={10}>
							<UserProfile currentUser={currentUser} />
						</GlobalStyled.Col>
					</Styled.Wrapper>
				</GlobalStyled.ContentRow>
			</GlobalStyled.Container>
			<Popup open={isPopup}>
				<Styled.PopupWrapper>
					<GlobalStyled.Row bottom={1.5}>
						안녕하세요 고객님,
					</GlobalStyled.Row>
					<GlobalStyled.Row bottom={1.5}>
						‘레디포인트 조회’ 정상 복구 작업에 지연이 발생되어 해당
						상황을 안내드립니다.
					</GlobalStyled.Row>
					<GlobalStyled.Row bottom={1.5}>
						<div>
							모든 이용자에게 정확한 정보가 표기될 수 있도록
							단계적으로 수정 중에 있으나, 최근 회원가입자 수가
							급히 증가되며 복구 작업이 지연되고 있습니다.
						</div>
					</GlobalStyled.Row>
					<GlobalStyled.Row bottom={1.5}>
						현재 서비스 이용 또는 프로모션 기간 내 받은 리워드에
						대한 이상은 없음을 알려드리며, 최대한 빠르게 조치하도록
						하겠습니다.
					</GlobalStyled.Row>
					<GlobalStyled.Row bottom={1.5}>
						이용에 불편을 드려 대단히 죄송합니다. 감사합니다.
					</GlobalStyled.Row>
					<GlobalStyled.Row>
						<Styled.PopupCancelButton
							onClick={handleClickCancelPopup}
						>
							일주일 동안 보지 않기
						</Styled.PopupCancelButton>
					</GlobalStyled.Row>
				</Styled.PopupWrapper>
			</Popup>
		</GlobalStyled.Body>
	);
};

export default GlobalHeader;
