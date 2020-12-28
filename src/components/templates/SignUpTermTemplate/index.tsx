import React, { InputHTMLAttributes } from 'react';
import styled from 'styled-components';

import GlobalStyled from 'style/GlobalStyled';
import TermCheck from 'components/molecules/TermCheck';
import TermCheckList from 'components/organisms/TermCheckList';

const Styled = {
	Wrapper: styled(GlobalStyled.HeightRow)``,

	ContentWrapper: styled(GlobalStyled.HeightRow)`
		padding: 1rem 0;
		border-top: 1px solid ${props => props.theme.lightGray};
	`,
};

interface SignUpTermCheckInterface
	extends InputHTMLAttributes<HTMLInputElement> {
	infos: any;
	headerInfo: {
		label: string;
		value: boolean;
		name: string;
		required?: boolean;
	};
}

const SignUpTermCheck = (props: SignUpTermCheckInterface) => {
	const { headerInfo, infos, onChange } = props;

	const { name, value, label, required } = headerInfo;

	return (
		<Styled.Wrapper>
			<GlobalStyled.Row padding="1rem 0">
				<TermCheck
					name={name}
					value={value}
					label={label}
					onChange={onChange}
					isCursor={false}
					required={required}
				/>
			</GlobalStyled.Row>
			<Styled.ContentWrapper>
				<TermCheckList infos={infos} onChange={onChange} />
			</Styled.ContentWrapper>
		</Styled.Wrapper>
	);
};
SignUpTermCheck.defaultProps = {
	headerInfo: {
		label: '-',
		value: '',
		name: 'all',
		required: false,
	},
	infos: [
		{
			label: '-',
			value: '',
			name: '',
		},
	],
	onChange: function () {},
};

export default SignUpTermCheck;
