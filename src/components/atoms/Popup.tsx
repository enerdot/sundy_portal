import React from 'react';
// import styled from 'styled-components';
import ReactPopup from 'reactjs-popup';
import { PopupProps } from 'reactjs-popup/dist/types';

// import GlobalStyled from 'style/GlobalStyled';

interface PopupInterface extends PopupProps {
	children: React.ReactChild;
}

const Popup = (props: PopupInterface) => {
	const { children } = props;
	return <ReactPopup {...props}>{children}</ReactPopup>;
};
Popup.defaultProps = {
	position: 'bottom center',
	on: 'click',
};

export default Popup;
