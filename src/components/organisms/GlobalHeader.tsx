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
		console.log('popupTime : ', cookies?.popupTime);
		if (cookies?.popupTime) {
			if (moment().diff(moment(cookies?.popupTime), 'days') > 7) {
				setIsPopup(true);
			}
		} else {
			setIsPopup(true);
		}
	}, [cookies?.popupTime]);

	const handleClickCancelPopup = () => {
		setCookies('popupTime', moment().format('YYYY-MM-DD HH:mm'));
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
						썬디 포털(sundy portal) 서비스에 관심주시고 이용해
						주셔서 먼저 감사의 말씀드립니다.
					</GlobalStyled.Row>
					<GlobalStyled.Row bottom={1.5}>
						<div>
							많은 성원에 힘입어 서비스 정식 오픈 3주 내{' '}
							<b>가입자가 10,000명을 돌파</b>
							하며, 아쉽게도 오픈 시 진행되었던 이벤트는 조기
							마감되었음을 알려드립니다.
						</div>
					</GlobalStyled.Row>
					<GlobalStyled.Row bottom={1.5}>
						많은 이용에 다시 한번 감사의 말씀드리며, 보다 더 좋은
						서비스와 더 다양한 이벤트로 빠른 시일 내에 찾아뵙도록
						하겠습니다.
					</GlobalStyled.Row>
					<GlobalStyled.Row bottom={1.5}>
						감사합니다.
					</GlobalStyled.Row>
					<GlobalStyled.HeightRow bottom={1.5} fontSize="1rem">
						<GlobalStyled.Row bottom={1.5}>
							이벤트 마감일시: 2021년 3월 30일 14:00
						</GlobalStyled.Row>
						<GlobalStyled.Row>
							- 마감 전에 가입 하신 분은 포인트가 정상 지급됩니다
							<br />
						</GlobalStyled.Row>
						<GlobalStyled.Row>
							- 현재 일부 사용자들에게 마이페이지에서 포인트가
							정상 표기 안되는 오류를 해결하기 위해 시스템 점검
							중이오니, 빠른 시일내 다시 정상화할 수 있도록
							하겠습니다. 이용에 불편을 드린 점 양해 부탁드립니다.
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
