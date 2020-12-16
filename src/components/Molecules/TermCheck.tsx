import React from 'react';
import styled from 'styled-components';

import GlobalStyled from 'style/GlobalStyled';
import CheckBox, { CheckBoxInterface } from 'components/Atoms/CheckBox';

const Styled = {
	Wrapper: styled(GlobalStyled.Row)``,
};

export interface TermCheckInterface extends CheckBoxInterface {
	label: any;
	isCursor: boolean;
}

const TermCheck = (props: TermCheckInterface) => {
	const { label, onChange, value, name, isCursor } = props;

	const handleOnChange = () => {
		onChange({
			target: {
				name: name,
				checked: !value,
			},
		});
	};

	return (
		<Styled.Wrapper>
			<GlobalStyled.CenterCol width={12.5}>
				<CheckBox {...props} />
			</GlobalStyled.CenterCol>
			<GlobalStyled.Col onClick={handleOnChange} width={77.5}>
				{label}
			</GlobalStyled.Col>
			<GlobalStyled.CenterCol onClick={handleOnChange} width={10}>
				{isCursor ? (
					<img
						alt="right-cursor"
						src={require('images/ic-right-cursor.svg').default}
					/>
				) : (
					''
				)}
			</GlobalStyled.CenterCol>
		</Styled.Wrapper>
	);
};
TermCheck.defaultProps = {
	label: '',
	isCursor: true,
};

export default TermCheck;
