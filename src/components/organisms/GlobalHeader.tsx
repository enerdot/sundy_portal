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
		console.log('popupTime1 : ', cookies?.popupTime1);
		if (cookies?.popupTime1) {
			if (moment().diff(moment(cookies?.popupTime1), 'days') > 7) {
				setIsPopup(true);
			}
		} else {
			setIsPopup(true);
		}
	}, [cookies?.popupTime1]);

	const handleClickCancelPopup = () => {
		setCookies('popupTime1', moment().format('YYYY-MM-DD HH:mm'));
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
						일부 유저 대상으로 포인트가 정상 조회 안되는 오류는 현재
						정상 복구 중에 있습니다.
					</GlobalStyled.Row>
					<GlobalStyled.Row bottom={1.5}>
						<div>
							빠른 시일 내 정상화하기 위해 서비스 점검 및
							업데이트를 아래 기간에 실시할 예정이오니, 점검 시간
							중 일부 접속이 원할하지 못할 수 있어 이용 시 참고
							바랍니다.
						</div>
					</GlobalStyled.Row>
					<GlobalStyled.Row bottom={1.5}>
						이용에 불편을 드린 점 양해 부탁드립니다.
					</GlobalStyled.Row>
					<GlobalStyled.HeightRow bottom={1.5} fontSize="1rem">
						<GlobalStyled.Row bottom={1.5}>
							점검 시기: 2021년 04월 05일 (월) 오전 9시 ~ 04월
							10일 (금)
						</GlobalStyled.Row>
						<GlobalStyled.Row>
							점검 사유: 포인트 조회 기능 정상화 및 서버 점검
							<br />
						</GlobalStyled.Row>
						<GlobalStyled.Row>
							비고: 이벤트를 통한 포인트 지급과 무관한
							오류사항으로 시스템 정상화 후 정상 표기될 예정
						</GlobalStyled.Row>
					</GlobalStyled.HeightRow>

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
