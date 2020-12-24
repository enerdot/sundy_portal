import React from 'react';
import styled from 'styled-components';

import GlobalStyled from 'style/GlobalStyled';

const Styled = {
	Wrapper: styled(GlobalStyled.Row)``,
};

export interface CheckBoxInterface {
	value: any;
	name: string;
	onChange: any;
	required?: boolean;
}

const CheckBox = (props: CheckBoxInterface) => {
	const { value, name, onChange, required } = props;
	return (
		<Styled.Wrapper>
			<input
				type="checkbox"
				name={name}
				checked={value}
				onChange={onChange}
				required={required}
			/>
		</Styled.Wrapper>
	);
};
CheckBox.defaultProps = {
	value: false,
	name: '',
	onChange: () => {},
	required: false,
};

export default CheckBox;
