import React from 'react';
import styled, { keyframes } from 'styled-components';

import GlobalStyled from '../../style/GlobalStyled';

const Keyframes = {
	spinnerSpin: keyframes`
    to {
      -moz-transform: rotate(360deg);  /* FF3.5/3.6 */
      -o-transform: rotate(360deg);  /* Opera 10.5 */
      -webkit-transform: rotate(360deg);  /* Saf3.1+ */
      transform: rotate(360deg);  /* Newer browsers (incl IE9) */
    }
  `,
};

const Styled = {
	LoadingCircle: styled.div<{ size: string }>`
		margin: 0 auto;
		width: ${props => props.size};
		height: ${props => props.size};
		border: 0.75rem solid ${props => props.theme.lightGray};
		border-radius: 50%;
		border-top-color: ${props => props.theme.sky};
		animation: ${Keyframes.spinnerSpin} 1s ease-in-out infinite;
	`,

	Body: styled(GlobalStyled.CenterRow)`
		width: 100%;
		min-height: 80vh;
		margin: auto;
	`,
};

interface CircleSpinnerInterface {
	size: string;
}

const CircleSpinner = (props: CircleSpinnerInterface) => {
	const { size } = props;

	return (
		<Styled.Body>
			<Styled.LoadingCircle size={size} />
		</Styled.Body>
	);
};

CircleSpinner.defaultProps = {
	size: '10rem',
};

export default CircleSpinner;
