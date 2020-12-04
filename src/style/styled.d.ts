// import original module declarations
import 'styled-components'

// and extend them!
declare module 'styled-components' {
  // 우리가 아는 타입지정을 여기서 다해주고 불러서 쓰기
  // 1. 인터페이스 지정
//   export interface 인테페이스명지정 {
//     속성1 : 타입지정;
//   }
  // 2. 타입속성지정
//   export type // 타입~~~지정지정해~

  // ThemeProvider theme에 적용할 타입으로, theme의 속성과 동일하게 작성
  export interface DefaultTheme {
    white : {
        text : string,
        card : string,
        background : string,
    },
    dark : {
        text : string,
    },
    blue: {
        logo: string,
    },
    shadow : {
        card : string,
    },
    gray : {
        border : string
    }
    response: {};
  }
}