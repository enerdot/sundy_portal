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
	isCursor: boolean;
	url: string;
}

const TermCheck = (props: TermCheckInterface) => {
	const { isCursor, url } = props;

	// const handleOnChange = () => {
	// 	onChange({
	// 		target: {
	// 			name: name,
	// 			checked: !value,
	// 		},
	// 	});
	// };

	return (
		<Styled.Wrapper>
			<GlobalStyled.CenterCol width={90}>
				<CheckBox {...props} />
			</GlobalStyled.CenterCol>
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
	isCursor: true,
	url: '',
};

export default TermCheck;
