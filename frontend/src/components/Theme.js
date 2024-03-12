import { createTheme } from '@mui/material/styles';

// the consistant theming of the website

const theme = createTheme({
    palette: {
        mode: 'light',
        primary: {
            main: '#00457C',
        },
        secondary: {
            main: '#EFC530',
        },
    },
    typography: {
        fontFamily: 'Do Hyeon',
    },
    shape: {
        borderRadius: 16,
    },
    spacing: 4,
});

export default theme;