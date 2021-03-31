import React from 'react';
// import styled from 'styled-components';
import ReactPopup from 'reactjs-popup';
import styled from 'styled-components';
import { PopupProps } from 'reactjs-popup/dist/types';

import GlobalStyled from 'style/GlobalStyled';

const Styled = {
	Body: styled(GlobalStyled.Row)`
		width: 100vw;
		height: 100vh;
		align-items: center;
		justify-content: center;
		background-color: rgba(0, 0, 0, 0.5);
	`,
};

interface PopupInterface extends PopupProps {
	children: React.ReactChild;
}

const Popup = (props: PopupInterface) => {
	const { children } = props;
	return (
		<ReactPopup {...props}>
			<Styled.Body>{children}</Styled.Body>
		</ReactPopup>
	);
};
Popup.defaultProps = {
	position: 'bottom center',
	on: 'click',
};

export default Popup;
