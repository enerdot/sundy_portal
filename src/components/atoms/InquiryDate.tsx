import React from 'react';
import styled from 'styled-components';
import moment from 'moment';

const Styled = {
	Wrapper: styled.span`
		font-size: 1rem;
		color: ${props => props.theme.gray};
	`,
};

interface InquiryDateInterface {
	date: any;
}

const InquiryDate = (props: InquiryDateInterface) => {
	const { date } = props;
	return (
		<Styled.Wrapper>
			조회일 {moment(date).format('YYYY년 MM월 DD일')}
		</Styled.Wrapper>
	);
};
InquiryDate.defaultProps = {
	date: moment(),
};

export default InquiryDate;
