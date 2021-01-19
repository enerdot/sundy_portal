import styled, { keyframes } from 'styled-components';
import {
	typography,
	TypographyProps,
	space,
	SpaceProps,
	color,
	ColorProps,
	layout,
	LayoutProps,
} from 'styled-system';
import { Link } from 'react-router-dom';

const animation: any = {
	fadeInUp: keyframes`
		0%{
			opacity: 0;
			transform: translateY(20px);
		}
		100% {
			opacity: 1;
			transform: translateY(0px);
		}
		`,
};

const Parent = {
	Card: styled.div<ColorProps & TypographyProps & SpaceProps & LayoutProps>`
		display: flex;
		width: 100%;
		padding: 1rem;
		background-color: ${props => props.theme.colors.white};
		border-radius: 0.5rem;
		box-shadow: ${props => props.theme.colors.shadow} 0px 0px 10px 0px;
		${typography}
		${space}
        ${color}
        ${layout}
	`,
	Col: styled.div<
		{ width?: number } & ColorProps &
			TypographyProps &
			SpaceProps &
			LayoutProps
	>`
		display: flex;
		width: ${props => props.width}%;
		align-items: center;
		${typography}
		${space}
        ${color}
	`,
	Button: styled.button<
		ColorProps & TypographyProps & SpaceProps & LayoutProps
	>`
		display: flex;
		align-items: center;
		justify-content: center;
		outline: none;
		color: ${props => props.theme.colors.white};
		border: 0px;
		border-radius: 0.25rem;
		padding: 0;
		cursor: pointer;
		padding: 1rem;
		font-weight: bold;
		background-color: ${props => props.theme.colors.sky};
		${typography}
		${space}
        ${color}
        ${layout}
	`,
	Row: styled.div<
		{ bottom?: number } & ColorProps &
			TypographyProps &
			SpaceProps &
			LayoutProps
	>`
		display: flex;
		width: 100%;
		margin-bottom: ${props => props.bottom}rem;
		${typography}
		${space}
        ${color}
        ${layout}
	`,
	Link: styled(Link)<ColorProps & TypographyProps & SpaceProps & LayoutProps>`
		display: flex;
		color: inherit;
		${typography}
		${space}
        ${color}
        ${layout}
	`,
	PopupWrapper: styled.div<
		ColorProps & TypographyProps & SpaceProps & LayoutProps
	>`
		border: 2px solid ${props => props.theme.colors.gray200};
		border-radius: 0.5rem;
		padding: 1rem;
		color: ${props => props.theme.colors.lightBlack};
		background-color: ${props => props.theme.colors.white};
		${typography}
		${space}
        ${color}
        ${layout}
	`,
};

// const ButtonTheme = {
//     blue: {
//         backgroundColor: theme.colors.color.blue,
//         color: theme.colors.color.white,
//         hover: {
//             backgroundColor: theme.colors.color.deepBlue
//         },
//         active: {
//             backgroundColor: theme.colors.color.blackBlue
//         }
//     },
//     indigo: {
//         backgroundColor: theme.colors.color.whiteIndigo,
//         color: theme.colors.color.white,
//         hover: {
//             backgroundColor: theme.colors.color.blueIndigo
//         },
//         active: {
//             backgroundColor: theme.colors.color.realIndigo
//         }
//     },
//     gray500: {
//         backgroundColor: theme.colors.color.whiteBlue,
//         color: theme.colors.color.white,
//         hover: {
//             backgroundColor: theme.colors.color.realBlueGray
//         },
//         active: {
//             backgroundColor: theme.colors.color.blackGray
//         }
//     }
// }

const GlobalStyled = {
	Card: styled(Parent.Card)``,
	Body: styled.div`
		display: flex;
		flex-direction: column;
		width: 100%;
		height: 100%;
	`,

	Container: styled.div<
		ColorProps & TypographyProps & SpaceProps & LayoutProps
	>`
		width: 100%;
		max-width: 720px;
		margin: 0 auto;
		height: 100%;
		${typography}
		${space}
        ${color}
	`,

	Row: styled(Parent.Row)``,

	ImgRow: styled(Parent.Row)`
		align-items: center;
	`,

	FadeInUpRow: styled(Parent.Row)`
		animation: ${animation.fadeInUp} 1s;
	`,

	HeightRow: styled(Parent.Row)`
		flex-direction: column;
	`,

	ContentRow: styled(Parent.Row)`
		padding: 1rem;
		flex-direction: column;
		border-bottom: 1px solid ${props => props.theme.colors.gray100};
		:nth-child(even) {
			background-color: ${props => props.theme.colors.ivory};
		}
		${typography}
		${space}
        ${color}
	`,

	CenterRow: styled(Parent.Row)`
		align-items: center;
		justify-content: center;
	`,

	Col: styled(Parent.Col)``,

	CenterCol: styled(Parent.Col)`
		align-items: center;
		justify-content: center;
	`,

	RightCol: styled(Parent.Col)`
		align-items: center;
		justify-content: flex-end;
	`,
	Button: styled(Parent.Button)`
		width: 100%;
	`,
	ActiveButton: styled(Parent.Button)<{ isActive: boolean | undefined }>`
		width: 100%;
		background-color: ${props =>
			props.isActive
				? props.theme.colors.sky
				: props.theme.colors.gray500};
	`,
	TransparentButton: styled.button`
		display: flex;
		align-items: center;
		justify-content: center;
		outline: none;
		background-color: inherit;
		border: 0px;
		cursor: pointer;
	`,
	RowLink: styled(Parent.Link)`
		width: 100%;
	`,
	Link: styled(Parent.Link)``,
	Title: styled(Parent.Row)`
		font-size: 1rem;
		font-weight: bold;
		color: ${props => props.theme.colors.lightBlack};
	`,

	PopupWrapper: styled(Parent.PopupWrapper)``,

	// ButtonCard: styled(Parent.Card)`
	//     width : 100%;
	//     padding : 2rem 0;
	//     padding-top : 4rem;
	//     flex-direction : column;
	//     align-items : center;
	//     justify-content : center;
	//     border : 0.175rem solid ${props => props.theme.colors.color.white};
	//     :hover {
	//         background-color : ${props => props.theme.colors.color.whiteSky};
	//     }
	//     :active {
	//         border : 0.175rem solid ${props => props.theme.colors.color.sky};
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

	// BorderButton: styled.button`
	//     border : 2px solid ${props => props.borderColor ? props.borderColor : props.theme.colors.color.blue};
	//     color : ${props => props.borderColor ? props.borderColor : props.theme.colors.color.blue};
	//     border-radius : 0.5rem;
	//     width : 100%;
	//     padding : 0.5rem 0;
	//     outline : none;
	//     ${typography}
	//     ${space}
	//     ${color}
	//     ${layout}
	// `,
};

export default GlobalStyled;
