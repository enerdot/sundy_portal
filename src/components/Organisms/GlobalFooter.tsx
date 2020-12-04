import styled from 'styled-components';

import GlobalStyled from '../../style/GlobalStyled';

const Styled = {
  Wrapper: styled(GlobalStyled.CenterRow)`
        padding : 1rem;
    `,

};

const GlobalFooter = () => (
  <GlobalStyled.Body>
    <GlobalStyled.Container>
      <Styled.Wrapper>
        <GlobalStyled.Card>
          <GlobalStyled.Col width={50}>
            Hello
          </GlobalStyled.Col>
          <GlobalStyled.Col width={50}>
            World
          </GlobalStyled.Col>
        </GlobalStyled.Card>
      </Styled.Wrapper>
    </GlobalStyled.Container>
  </GlobalStyled.Body>

);

export default GlobalFooter;
