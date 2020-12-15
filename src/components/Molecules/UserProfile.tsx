import React from 'react';
import styled from 'styled-components';

import GlobalStyled from 'style/GlobalStyled';
import Svg from 'components/Atoms/Svg';

import theme from 'style/theme';

const Styled = {
	Wrapper: styled(GlobalStyled.Row)`
		font-size: 1rem;
	`,
};

interface UserProfileInterface {
	isLogin: boolean;
}

const UserProfile = (props: UserProfileInterface) => {
	const { isLogin } = props;
	return (
		<Styled.Wrapper>
			{isLogin ? (
				<Svg
					name="userProfile"
					stroke={theme.gray}
					fill={theme.blue}
					size="2rem"
				/>
			) : (
				<GlobalStyled.Link to="/login">
					<Svg
						name="userProfile"
						stroke={theme.gray}
						fill={theme.white}
						size="2rem"
					/>
				</GlobalStyled.Link>
			)}
		</Styled.Wrapper>
	);
};
UserProfile.defaultProps = {
	isLogin: '',
};

export default UserProfile;
