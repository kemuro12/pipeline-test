import {createMuiTheme} from '@material-ui/core';

const theme = createMuiTheme({
    palette: {
        primary: {
            main: '#1B4266',
            dark: '#74528d',
            contrastText: '#fff',
        },
        error: {
            main: '#F45D3E',
            dark: '#c2482e',
            contrastText: '#fff',
        },
        secondary: {
            main: '#F08B1D',
            dark: '#d2ab11',
            contrastText: '#fff',
        },
        transparent: {
            default: '#fff',
        },
        text: {
            primary: '#000000',
        },
    }
});

export default theme;