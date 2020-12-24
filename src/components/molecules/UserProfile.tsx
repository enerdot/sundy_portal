import React, { useState } from 'react';
import styled from 'styled-components';

import GlobalStyled from 'style/GlobalStyled';
import Svg from 'components/atoms/Svg';

import theme from 'style/theme';
import MySettingForm from 'components/templates/MySettingForm';

const Styled = {
	Wrapper: styled(GlobalStyled.Row)`
		font-size: 1rem;
	`,
};

interface UserProfileInterface {
	currentUser: string;
}

const UserProfile = (props: UserProfileInterface) => {
	const { currentUser } = props;

	const [isShowMySettingForm, setIsShowMySettingForm] = useState(false);

	const handleClickProfile = () => {
		setIsShowMySettingForm(!isShowMySettingForm);
	};

	return (
		<>
			<Styled.Wrapper>
				<GlobalStyled.TransparentButton onClick={handleClickProfile}>
					<Svg
						name="userProfile"
						stroke={currentUser ? theme.blue : theme.gray}
						fill={theme.white}
						size="2rem"
					/>
				</GlobalStyled.TransparentButton>
			</Styled.Wrapper>
			{isShowMySettingForm ? (
				<MySettingForm
					isShow={isShowMySettingForm}
					onClickCancel={handleClickProfile}
				/>
			) : (
				''
			)}
		</>
	);
};
UserProfile.defaultProps = {
	currentUser: '',
};

export default UserProfile;
