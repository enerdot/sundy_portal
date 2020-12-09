import styled from 'styled-components'
import { typography, TypographyProps, space, SpaceProps,color, ColorProps, layout } from 'styled-system'
import {Link} from 'react-router-dom'

const Parent = {
    Card: styled.div<ColorProps & TypographyProps & SpaceProps>`
        display : flex;
        width : 100%;
        padding : 1rem;
        background-color : ${props => props.theme.white};
        border-radius : 0.5rem;
        box-shadow : ${props => props.theme.shadow}  0px 0px 10px 0px;
        ${typography}
        ${space}
        ${color}
        ${layout}
    `,
    Col: styled.div<{ width?: number} & ColorProps & TypographyProps & SpaceProps>`
        display : flex;
        width : ${props => props.width}%;
        ${typography}
        ${space}
        ${color}
    `,
    Button: styled.button<ColorProps & TypographyProps & SpaceProps>`
        display : flex;
        align-items : center;
        justify-content : center;
        outline : none;
        color : ${props => props.theme.white};
        border : 0px;
        border-radius : 0.25rem;
        padding : 0;
        cursor : pointer;
        ${typography}
        ${space}
        ${color}
        ${layout}
    `,
    Row: styled.div<{ bottom?: number } & ColorProps & TypographyProps & SpaceProps>`
        display : flex;
        width : 100%;
        margin-bottom : ${props => props.bottom}rem;
        ${typography}
        ${space}
        ${color}
        ${layout}
    `,
    Link : styled(Link)<ColorProps & TypographyProps & SpaceProps>`
        display : flex;
        color : inherit;
        ${typography}
        ${space}
        ${color}
        ${layout}
    `,
}


// const ButtonTheme = {
//     blue: {
//         backgroundColor: theme.color.blue,
//         color: theme.color.white,
//         hover: {
//             backgroundColor: theme.color.deepBlue
//         },
//         active: {
//             backgroundColor: theme.color.blackBlue
//         }
//     },
//     indigo: {
//         backgroundColor: theme.color.whiteIndigo,
//         color: theme.color.white,
//         hover: {
//             backgroundColor: theme.color.blueIndigo
//         },
//         active: {
//             backgroundColor: theme.color.realIndigo
//         }
//     },
//     gray: {
//         backgroundColor: theme.color.whiteBlue,
//         color: theme.color.white,
//         hover: {
//             backgroundColor: theme.color.realBlueGray
//         },
//         active: {
//             backgroundColor: theme.color.blackGray
//         }
//     }
// }


const GlobalStyled = {
    Card: styled(Parent.Card)`

    `,
    Body: styled.div`
        display : flex;
        flex-direction : column;
        width : 100%;
    `,

    Container: styled.div`
        width : 100%;
        max-width : 720px;
        margin : 0 auto;
        ${typography}
        ${space}
        ${color}
    `,

    Row: styled(Parent.Row)`
        
    `,

    HeightRow: styled(Parent.Row)`
        flex-direction : column;
    `,

    ContentRow: styled(Parent.Row)`
        padding : 1rem;
        flex-direction : column;
        border-bottom : 1px solid ${props => props.theme.lightGray};
        :nth-child(even){
            background-color : ${props =>props.theme.ivory};
        }
        ${typography}
        ${space}
        ${color}
    `,

    CenterRow: styled(Parent.Row)`
        align-items : center;
        justify-content : center;
        
    `,

    Col: styled(Parent.Col)``,

    CenterCol: styled(Parent.Col)`
        align-items : center;
        justify-content : center;
    `,

    RightCol: styled(Parent.Col)`
        align-items : center;
        justify-content : flex-end;
    `,
    Button : styled(Parent.Button)``,
    RowLink : styled(Parent.Link)`
        width : 100%;
    `,
    Link : styled(Parent.Link)``,
    Title : styled(Parent.Row)`
        font-size : 1rem;
        font-weight: bold;
        color : ${props => props.theme.lightBlack};
    `
    // ButtonCard: styled(Parent.Card)`
    //     width : 100%;
    //     padding : 2rem 0;
    //     padding-top : 4rem;
    //     flex-direction : column;
    //     align-items : center;
    //     justify-content : center;
    //     border : 0.175rem solid ${props => props.theme.color.white};
    //     :hover {
    //         background-color : ${props => props.theme.color.whiteSky};
    //     }
    //     :active {
    //         border : 0.175rem solid ${props => props.theme.color.sky};
    //     }
    // `,


    // Button: styled(Parent.Button)`
    //     width : ${props=>props.width}
    //     color : ${props => ButtonTheme[props.colorTheme ? props.colorTheme : 'blue'].color};
    //     background-color : ${props => ButtonTheme[props.colorTheme ? props.colorTheme : 'blue'].backgroundColor};
    //     :hover {
    //         background-color : ${props => ButtonTheme[props.colorTheme ? props.colorTheme : 'blue'].hover.backgroundColor};
    //     }
    //     :active {
    //         background-color : ${props => ButtonTheme[props.colorTheme ? props.colorTheme : 'blue'].active.backgroundColor};
    //     }
    // `,

    // ThemeButton: styled(Parent.Button)`

    // `,

    // ActiveButton: styled(Parent.Button)`
    //     cursor: ${props => props.isActive ? 'pointer' : 'default'};
    //     color : ${props => ButtonTheme[props.colorTheme ? props.colorTheme : 'blue'].color};
    //     background-color : ${props => ButtonTheme[props.colorTheme ? props.colorTheme : 'blue'].backgroundColor};
    //     opacity: ${props => props.isActive ? 1 : 0.6};
    //     :hover {
    //         background-color : ${props => props.isActive ?
    //         ButtonTheme[props.colorTheme ? props.colorTheme : 'blue'].hover.backgroundColor :
    //         ButtonTheme[props.colorTheme ? props.colorTheme : 'blue'].backgroundColor
    //     };
    //     }
    //     :active {
    //         background-color : ${props => props.isActive ?
    //         ButtonTheme[props.colorTheme ? props.colorTheme : 'blue'].active.backgroundColor :
    //         ButtonTheme[props.colorTheme ? props.colorTheme : 'blue'].backgroundColor
    //     };
    //     }
    // `,

    // ActiveRow: styled(Parent.Row)`
    //     display: ${props => props.isActive ? 'flex' : 'none'};
    // `,

    // TransparentButton: styled.button`
    //     display : flex;
    //     width : 100%;
    //     align-items : center;
    //     justify-content : center;
    //     outline : none;
    // `,

    // BorderButton: styled.button`
    //     border : 2px solid ${props => props.borderColor ? props.borderColor : props.theme.color.blue};
    //     color : ${props => props.borderColor ? props.borderColor : props.theme.color.blue};
    //     border-radius : 0.5rem;
    //     width : 100%;
    //     padding : 0.5rem 0;
    //     outline : none;
    //     ${typography}
    //     ${space}
    //     ${color}
    //     ${layout}
    // `,


}




export default GlobalStyled