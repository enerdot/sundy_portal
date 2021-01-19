import React, { useState } from 'react';
import styled from 'styled-components';

import GlobalStyled from 'style/GlobalStyled';
import Svg from 'components/atoms/Svg';

import theme from 'style/theme';
import MyPageTemplate from 'components/templates/MyPageTemplate';

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

	const [isShowMyPageTemplate, setIsShowMyPageTemplate] = useState(false);

	const handleClickProfile = () => {
		setIsShowMyPageTemplate(!isShowMyPageTemplate);
	};

	return (
		<>
			<Styled.Wrapper>
				<GlobalStyled.TransparentButton onClick={handleClickProfile}>
					<Svg
						name="userProfile"
						stroke={
							currentUser
								? theme.colors.blue
								: theme.colors.gray500
						}
						fill={theme.colors.white}
						size="2rem"
					/>
				</GlobalStyled.TransparentButton>
			</Styled.Wrapper>
			<MyPageTemplate
				isShow={isShowMyPageTemplate}
				onClickCancel={handleClickProfile}
			/>
		</>
	);
};
UserProfile.defaultProps = {
	currentUser: '',
};

export default UserProfile;
