import { createGlobalStyle } from "styled-components";
import theme from "./theme";

const GlobalStyle = () => {
	return <Body />;
};

const Body = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css?family=Noto+Sans+KR:100,300,400,500,700,900&display=swap&subset=korean');
    html {
        font-size : 12px;
    }
    body{
        color : ${theme.dark.text};
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        font-family: 'Noto Sans KR', sans-serif ;
        background-color : ${theme.white.background};
        margin : 0;
    }
    img{
        max-width: 100%;
        vertical-align: middle;
        border-style: none;
    }
    ul{
        list-style-type: none;
        margin-top: 0;
        margin-bottom : 0;
        padding-left : 0px;
    }
    a{
        text-decoration : none;
    }
    *, ::before, ::after {
        box-sizing : border-box;
    }
    ::-webkit-scrollbar {
        width: 6px;
        height: 6px;
        background-color: #161d37;
    }
    ::-webkit-scrollbar-thumb {
        border-radius: 3px;
        -moz-border-radius: 3px;
        -webkit-border-radius: 3px;
        background-color: #c3c3c3;
  }
`;

export default GlobalStyle;
