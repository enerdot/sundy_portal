import React from 'react';
import styled from 'styled-components';

import GlobalStyled from 'style/GlobalStyled';
import CheckBox, { CheckBoxInterface } from 'components/atoms/CheckBox';

const Styled = {
	Wrapper: styled(GlobalStyled.Row)`
		cursor: pointer;
	`,
	TermLink: styled.a`
		display: flex;
		width: 100%;
		height: 100%;
		align-items: center;
		justify-content: center;
	`,
};

export interface TermCheckInterface extends CheckBoxInterface {
	label: any;
	isCursor: boolean;
	url: string;
}

const TermCheck = (props: TermCheckInterface) => {
	const { label, onChange, value, name, isCursor, url } = props;

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
			<GlobalStyled.CenterCol width={10}>
				{isCursor ? (
					<Styled.TermLink href={url} target="_blank">
						<img
							alt="right-cursor"
							src={require('images/ic-right-cursor.svg').default}
						/>
					</Styled.TermLink>
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
	url: '',
};

export default TermCheck;
