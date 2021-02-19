import theme from 'style/theme';

const Svg = props => {
	const svgInfo = {
		map: {
			viewBox: '0 0 159 283',
			path:
				'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAJ8AAAEbCAYAAADETVaaAAAACXBIWXMAAAsSAAALEgHS3X78AAAC4UlEQVR4Xu3SoREAIBDAMGD/nZ8RUFxNoiu7Z2ZB4bwC+MV8ZMxHxnxkzEfGfGTMR8Z8ZMxHxnxkzEfGfGTMR8Z8ZMxHxnxkzEfGfGTMR8Z8ZMxHxnxkzEfGfGTMR8Z8ZMxHxnxkzEfGfGTMR8Z8ZMxHxnxkzEfGfGTMR8Z8ZMxHxnxkzEfGfGTMR8Z8ZMxHxnxkzEfGfGTMR8Z8ZMxHxnxkzEfGfGTMR8Z8ZMxHxnxkzEfGfGTMR8Z8ZMxHxnxkzEfGfGTMR8Z8ZMxHxnxkzEfGfGTMR8Z8ZMxHxnxkzEfGfGTMR8Z8ZMxHxnxkzEfGfGTMR8Z8ZMxHxnxkzEfGfGTMR8Z8ZMxHxnxkzEfGfGTMR8Z8ZMxHxnxkzEfGfGTMR8Z8ZMxHxnxkzEfGfGTMR8Z8ZMxHxnxkzEfGfGTMR8Z8ZMxHxnxkzEfGfGTMR8Z8ZMxHxnxkzEfGfGTMR8Z8ZMxHxnxkzEfGfGTMR8Z8ZMxHxnxkzEfGfGTMR8Z8ZMxHxnxkzEfGfGTMR8Z8ZMxHxnxkzEfGfGTMR8Z8ZMxHxnxkzEfGfGTMR8Z8ZMxHxnxkzEfGfGTMR8Z8ZMxHxnxkzEfGfGTMR8Z8ZMxHxnxkzEfGfGTMR8Z8ZMxHxnxkzEfGfGTMR8Z8ZMxHxnxkzEfGfGTMR8Z8ZMxHxnxkzEfGfGTMR8Z8ZMxHxnxkzEfGfGTMR8Z8ZMxHxnxkzEfGfGTMR8Z8ZMxHxnxkzEfGfGTMR8Z8ZMxHxnxkzEfGfGTMR8Z8ZMxHxnxkzEfGfGTMR8Z8ZMxHxnxkzEfGfGTMR8Z8ZMxHxnxkzEfGfGTMR8Z8ZMxHxnxkzEfGfGTMR8Z8ZMxHxnxkzEfGfGTMR8Z8ZMxHxnxkzEfGfGTMR8Z8ZMxHxnxkzEfGfGTMR8Z8ZMxHxnxkzEfGfGTMR8Z8ZMxHxnxkzEfGfGTMR8Z8ZMxHxnxkzEfGfGTMR8Z8ZMxHxnxkzEfGfGQuI7cFM8/KCRwAAAAASUVORK5CYII=',
		},
		seoulAndGyeonggiDoMarker: {
			viewBox: '0 0 43.389 61.951',
			path: 'M-22086.5-10596.5v-61.451h-42.889',
			strokeMiterlimit: 10,
			fill: 'none',
		},
		chungnamMarker: {
			viewBox: '0 0 106.82 18.96',
			path:
				'M0,.5H34.25l69.07,15m-3,0a3,3,0,1,0,3-3A3,3,0,0,0,100.32,15.46Z',
			strokeMiterlimit: 10,
			fill: 'none',
		},
		jeonbukMarker: {
			viewBox: '0 0 109.23 45.32',
			path:
				'M103.32,4.82l-69.07,40H0M102.73,3.5a3,3,0,1,0,3-3A3,3,0,0,0,102.73,3.5Z',
			strokeMiterlimit: 10,
			fill: 'none',
		},
		jeonnamMarker: {
			viewBox: '0 0 109 76.82',
			path:
				'M103.32,4.83,34.25,76.32H0M102.5,3.5a3,3,0,1,0,3-3A3,3,0,0,0,102.5,3.5Z',
			strokeMiterlimit: 10,
			fill: 'none',
		},
		gangwonMarker: {
			viewBox: '0 0 117.96 55.86',
			path:
				'M3.5,52.36,84.66.5H118M.5,52.36a3,3,0,1,0,3-3A3,3,0,0,0,.5,52.36Z',
			strokeMiterlimit: 10,
			fill: 'none',
		},
		chungbukMarker: {
			viewBox: '0 0 159.67 7',
			path: 'M159.67,3.5H3.5m-3,0a3,3,0,1,0,3-3A3,3,0,0,0,.5,3.5Z',
			strokeMiterlimit: 10,
			fill: 'none',
		},
		gyeongbukMarker: {
			viewBox: '0 0 117.96 74.9',
			path:
				'M118,74.4H84.66L3.5,3.5m-3,0a3,3,0,1,0,3-3A3,3,0,0,0,.5,3.5Z',
			strokeMiterlimit: 10,
			fill: 'none',
		},
		gyeongnamMarker: {
			viewBox: '0 0 117.96 96.15',
			path:
				'M118,95.65H87.29L3.5,3.5m-3,0a3,3,0,1,0,3-3A3,3,0,0,0,.5,3.5Z',
			strokeMiterlimit: 10,
			fill: 'none',
		},
		jejuMarker: {
			viewBox: '0 0 27.75 7',
			path: 'M6.5,3.5H27.75M.5,3.5a3,3,0,1,0,3-3A3,3,0,0,0,.5,3.5Z',
			strokeMiterlimit: 10,
			fill: 'none',
		},
		miniMapMarker: {
			viewBox: '0 0 12.02 16.77',
			path:
				'M6,.5A5.51,5.51,0,0,1,11.52,6C11.52,10.8,6,16.09,6,16.09S.5,10.92.5,6A5.51,5.51,0,0,1,6,.5ZM3,6A3,3,0,1,0,6,3,3,3,0,0,0,3,6Z',
			strokeMiterlimit: 10,
			fill: 'none',
		},
		sunny: {
			path:
				'M29.05,13.54A15.51,15.51,0,1,1,13.54,29.05,15.5,15.5,0,0,1,29.05,13.54Zm0,44.55V50m0-50V8.08M8.51,49.59l5.71-5.72M49.59,8.51l-5.72,5.71M58.09,29.05H50m-41.93,0H0M8.51,8.51l5.71,5.71M49.59,49.59l-5.72-5.72',
			viewBox: '0 0 58.09 58.09',
			fill: 'none',
			strokeWidth: 3,
		},
		cloudy: {
			path:
				'M13.5,39.4c-6.6,0-12-5.4-12-12s5.4-12,12-12c0.5,0,1,0,1.5,0.1C16.8,6.1,25.9,0,35.3,1.8c7.9,1.5,13.7,8.3,14,16.4c5.8,1.2,9.6,6.8,8.4,12.6c-1,5.1-5.5,8.7-10.7,8.6H13.5z',
			viewBox: '0 0 59.2 40.9',
			fill: 'none',
			strokeWidth: 3,
		},
		rain_cloudy: {
			path:
				'M6.9,38.3c-5.6-3.8-7.1-11.4-3.3-17.1c2.3-3.4,6.1-5.4,10.2-5.4c0.5,0,1,0,1.5,0.1C17.2,6.3,26.5,0,36.2,1.8c8.1,1.6,14.1,8.5,14.4,16.8c5.9,1.3,9.7,7.1,8.5,13.1c-0.6,2.8-2.2,5.2-4.6,6.8 M15.1,29.9v8.6 M15.1,44v8.6 M25.2,34.6v8.6 M25.2,48.7v8.6 M35.3,29.9v8.6 M35.3,44v8.6 M45.4,34.6v8.6 M45.4,48.7v8.6',
			viewBox: '0 0 60.8 57.3',
			fill: 'none',
			strokeWidth: 3,
		},
		rain_shower: {
			path:
				'M14,41.1C7.1,40.6,1.9,34.6,2.4,27.7C2.8,21.5,7.8,16.5,14,16.1c0.5,0,1,0,1.5,0.1C17.5,6.4,27,0,36.8,1.9C45,3.5,51.1,10.6,51.4,19c6,1.4,9.8,7.5,8.3,13.5c-1.2,5-5.6,8.5-10.7,8.6 M23.8,29.2l-6.1,17 M30.4,33.5l-6.1,17 M39.8,29.2l-6.1,17 M46.4,33.5l-6.1,17',
			viewBox: '0 0 61.8 51.1',
			fill: 'none',
			strokeWidth: 3,
		},
		rain_snow_cloudy: {
			path:
				'M3,35.5c-3.3-6.3-0.9-14.1,5.4-17.5c1.9-1,3.9-1.5,6-1.5c0.5,0,1.1,0,1.6,0.1C18,6.5,27.9,0,38,2c8.4,1.7,14.6,8.9,15,17.5c6.2,1.3,10.2,7.5,8.9,13.7c-0.3,1.6-1,3.1-2,4.4 M22.7,57.3l0.1-29.8 M15.7,53.9l7.1-6.8l6.8,7.1 M29.8,30.8l-7.1,6.8l-6.8-7.1 M7.9,42.3l29.8,0.1 M11.3,35.3l6.8,7.1L11,49.2 M34.3,49.5l-6.8-7.1l7.1-6.8M44,49.3v-6.7 M51.7,53.1v-6.7 M44,38.1v-6.7 M51.7,42v-6.7',
			viewBox: '0 0 63.7 57.3',
			fill: 'none',
			strokeWidth: 3,
		},
		rain_snow_sunny: {
			path:
				'M14.9,29.8L14.9,0 M7.8,26.4l7.1-6.8l6.8,7.1 M22,3.4l-7.1,6.8L8.1,3.1 M0,14.9l29.8,0.1M3.4,7.8l6.8,7.1l-7.1,6.8 M26.5,22l-6.8-7.1l7.1-6.8 M36.2,21.8v-6.7 M43.9,25.6v-6.7 M36.2,10.6V3.9 M43.9,14.5V7.8',
			viewBox: '0 0 45.4 29.8',
			fill: 'none',
			strokeWidth: 3,
		},
		rain_sunny: {
			path:
				'M19.3,38.8c0,4.9-4,8.9-8.9,8.9c-4.9,0-8.9-4-8.9-8.9c0-7,8.9-15.5,8.9-15.5S19.3,31.6,19.3,38.8z M43.6,46.2c0,4.9-4,8.9-8.9,8.9s-8.9-4-8.9-8.9c0,0,0,0,0,0c0-7,8.9-15.5,8.9-15.5S43.6,38.9,43.6,46.2zM36.2,17.6c0,4.9-4,8.9-8.9,8.9c-4.9,0-8.9-4-8.9-8.9c0-7,8.9-15.5,8.9-15.5S36.2,10.3,36.2,17.6z',
			viewBox: '0 0 45.1 56.6',
			fill: 'none',
			strokeWidth: 3,
		},
		shower_sunny: {
			path:
				'M7.5,0.5l-6.1,17 M14.1,4.9L8,21.9 M23.5,0.5l-6.1,17 M30.1,4.9l-6.1,17',
			viewBox: '0 0 31.5 22.4',
			fill: 'none',
			strokeWidth: 3,
		},
		snow_cloudy: {
			path:
				'M14.4,42.4C7.3,42.6,1.3,37,1.1,29.8s5.4-13.1,12.6-13.3c0.2,0,0.5,0,0.7,0c0.5,0,1.1,0,1.6,0.1C18,6.5,27.9-0.1,38,2c8.4,1.7,14.6,8.9,15,17.5c6.2,1.4,10.2,7.5,8.8,13.8c-1.2,5.3-5.8,9.1-11.2,9.1M32.3,51.1l0.1-29.8 M25.3,47.7l7.1-6.8l6.8,7.1 M39.5,24.7l-7.1,6.8l-6.8-7.1 M17.5,36.2l29.8,0.1 M20.9,29.1l6.8,7.1l-7.1,6.8M43.9,43.3l-6.8-7.1l7.1-6.8',
			viewBox: '0 0 63.7 51.1',
			fill: 'none',
			strokeWidth: 3,
		},
		snow_sunny: {
			path:
				'M11.3,1.1L35,41 M19.8,0.4L17,10.7L6.6,7.9 M26.5,41.8l2.8-10.3l10.3,2.8 M35.9,1.7L10.4,40.4 M40.3,9l-10.5,2l-2-10.5 M6,33.2l10.5-2l2,10.5 M46.4,21.1L0,21 M42.7,28.8l-7.5-7.7l7.7-7.4 M3.7,13.4l7.4,7.7l-7.7,7.5',
			viewBox: '0 0 46.4 42.2',
			fill: 'none',
			strokeWidth: 3,
		},
		raindrop_sunny: {
			path:
				'M18.28,28.05a9.77,9.77,0,1,1,9.77-9.77M18.28,36.57V31.48M18.28,0V5.09M9,27.62,5.36,31.21M31.21,5.36,27.62,9m9,9.33H31.48m-26.39,0H0M9,9,5.36,5.36M28.87,21.73s-5.61,5.36-5.61,9.76a5.61,5.61,0,0,0,11.22,0C34.48,26.94,28.87,21.73,28.87,21.73Z',
			viewBox: '0 0 36.57 37.1',
			fill: 'none',
			strokeWidth: 2,
		},
		raindrop_cloudy: {
			path:
				'M34.53,25.45a5.61,5.61,0,1,1-11.22,0c0-4.4,5.61-9.76,5.61-9.76S34.53,20.9,34.53,25.45Zm3.71-3a7.47,7.47,0,0,0-5-10.87A12.07,12.07,0,0,0,9.37,9.76a8.77,8.77,0,0,0-1-.06,8.34,8.34,0,0,0,0,16.68h10.8',
			viewBox: '0 0 39.15 31.06',
			fill: 'none',
			strokeWidth: 2,
		},
		snow_drifting_sunny: {
			path:
				'M29.15,25.39l0-18.76m4.29,16.78L29.18,19l-4.46,4.3m.15-14.67L29.17,13l4.46-4.29M19.79,16,38.56,16M21.78,20.31,26.23,16l-4.29-4.46m14.66.15L32.14,16l4.3,4.45M0,9.9H16.6a4.45,4.45,0,1,0-4.45-4.45M9.44,17.39a3.24,3.24,0,1,0,3.23-3.24H0',
			viewBox: '0 0 38.56 25.4',
			fill: 'none',
			strokeWidth: 2,
		},
		snow_drifting_cloudy: {
			path:
				'M2,14A8.14,8.14,0,0,1,9.24,9.46a8.26,8.26,0,0,1,1,.07,11.77,11.77,0,0,1,23.31,1.8,7.28,7.28,0,0,1,5.74,7.12m-10.1-2.1,0,18.77m4.33-2-4.3-4.45L24.72,33m.15-14.66,4.3,4.45,4.46-4.29M19.79,25.71l18.77,0M21.78,30l4.45-4.3-4.29-4.46m14.66.15-4.46,4.3,4.3,4.46M0,19.62H16.6a4.45,4.45,0,1,0-4.45-4.45M9.44,27.11a3.24,3.24,0,1,0,3.23-3.24H0',
			viewBox: '0 0 39.29 35.12',
			fill: 'none',
			strokeWidth: 2,
		},
		cancel: {
			path:
				'M415.4,495.42,256,336,96.59,495.42a56.58,56.58,0,0,1-80-80L176,256,16.57,96.59a56.58,56.58,0,0,1,80-80L256,176,415.4,16.57a56.58,56.58,0,0,1,80,80L336,256,495.42,415.4a56.58,56.58,0,0,1-80,80Z',
			viewBox: '0 0 511.99 511.99',
		},
		userProfile: {
			path:
				'M18.1,19.9v-2.3c0.1-2.5-1.8-4.5-4.3-4.6H5.3c-2.5,0.1-4.4,2.2-4.3,4.6v2.3 M14.3,5.6c0,2.6-2.1,4.7-4.6,4.7S5,8.2,5,5.7S7.1,1,9.6,1c0,0,0,0,0,0C12.2,1,14.3,3.1,14.3,5.6z',
			viewBox: '0 0 19.1 20.9',
			strokeWidth: 2,
		},
		infoPopup: {
			viewBox: '0 0 15 15',
			path:
				'M6.8,11.3h1.5V6.8H6.8V11.3z M7.5,0C3.4,0,0,3.4,0,7.5S3.4,15,7.5,15' +
				'S15,11.6,15,7.5S11.6,0,7.5,0z M7.5,13.5c-3.3,0-6-2.7-6-6s2.7-6,6-6s6,2.7,6,6C13.5,10.8,10.8,13.5,7.5,13.5z M6.8,5.3h1.5V3.8H6.8' +
				'V5.3z',
		},
		linkMarker: {
			viewBox: '0 0 20.775 15.582',
			path:
				'M20.775,10a1.83,1.83,0,0,1-1.818,1.778H14.906a2,2,0,0,1-.256,2.879,1.859,1.859,0,0,1-.667,2.529c.364,1.994-.891,2.892-2.946,2.892-.111,0-.539-.008-.649-.008-2.515.007-3.12-1.261-5.021-1.555a.973.973,0,0,1-.822-.962V10.6h0A1.948,1.948,0,0,1,5.7,8.818c1.172-.527,3.872-1.99,4.363-3.138A1.73,1.73,0,0,1,11.686,4.5a1.949,1.949,0,0,1,1.79,2.715A5.515,5.515,0,0,1,12.9,8.226h6.055A1.859,1.859,0,0,1,20.775,10ZM3.9,10.018v7.791a.974.974,0,0,1-.974.974H.974A.974.974,0,0,1,0,17.809V10.018a.974.974,0,0,1,.974-.974H2.922A.974.974,0,0,1,3.9,10.018ZM2.759,16.835a.812.812,0,1,0-.812.812A.812.812,0,0,0,2.759,16.835Z',
		},
	};

	const { name, size, fill, stroke, strokeWidth, strokeMiterlimit } = props;

	const formatSvgInfo = svgInfo[name] ? svgInfo[name] : svgInfo['cancel'];

	return (
		<svg width={size} height={size} viewBox={formatSvgInfo.viewBox}>
			<path
				fill={fill ? theme.colors[fill] : formatSvgInfo.fill}
				stroke={stroke ? stroke : formatSvgInfo.stroke}
				strokeWidth={
					strokeWidth ? strokeWidth : formatSvgInfo.strokeWidth
				}
				strokeMiterlimit={
					strokeMiterlimit
						? strokeMiterlimit
						: formatSvgInfo.strokeMiterlimit
				}
				d={formatSvgInfo.path}
			/>
		</svg>
	);
};

Svg.defaultProps = {
	name: 'miniMapMarker',
	size: '100%',
};

export default Svg;
