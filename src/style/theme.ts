interface DefaultTheme {
    sky : any,
    white : any,
    black : any,
    lightBlack : any,
    blue: any,
    shadow :any ,
    gray : any,
    lightGray : any,
    darkSky : any,
    ivory : any,
    darkGray : any,

    levelBlue : any,
}

const theme : DefaultTheme = {
    white: '#ffffff',

    ivory : '#F9F9F9',

    black: '#000000',
    lightBlack : '#2D2D2D',

    sky : '#0098FF',
    darkSky : '#0B82DC',

    blue:'#0676ED',

    shadow : 'rgba(0, 0, 0, 0.18)',

    lightGray : '#F0F0F0',
    darkGray : '#575757',
    gray : '#747474',

    levelBlue : {
        1: '#E5F2FB',
        2: '#B0D7F4',
        3: '#78BAEC',
        4: '#419EE3',
        5: '#0B82DC',
    }
};

export default theme