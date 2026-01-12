import { createTheme } from '@mui/material/styles';

const glassStyle = {
    background: 'rgba(20, 25, 40, 0.65)',
    backdropFilter: 'blur(16px)',
    WebkitBackdropFilter: 'blur(16px)', // Safari support
    border: '1px solid rgba(255, 255, 255, 0.08)',
    boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
};

const theme = createTheme({
    palette: {
        mode: 'dark',
        primary: {
            main: '#00d4ff', // Cyan glow
            light: '#5ee2ff',
            dark: '#009bb3',
        },
        secondary: {
            main: '#b721ff', // Violet glow
        },
        background: {
            default: '#0a0e17', // Deep dark blue/black
            paper: '#131926',
        },
        text: {
            primary: '#ffffff',
            secondary: '#a0aec0',
        },
    },
    typography: {
        fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
        h1: { fontWeight: 700 },
        h2: { fontWeight: 700 },
        h3: { fontWeight: 600 },
        h4: { fontWeight: 600 },
        h5: { fontWeight: 600 },
        h6: { fontWeight: 600 },
        button: { textTransform: 'none', fontWeight: 600 },
    },
    components: {
        MuiCssBaseline: {
            styleOverrides: {
                body: {
                    backgroundImage: 'radial-gradient(circleAt 50% 0%, #1a2035 0%, #0a0e17 60%)',
                    minHeight: '100vh',
                    scrollbarColor: '#2d3748 #0a0e17',
                    '&::-webkit-scrollbar': {
                        width: '8px',
                    },
                    '&::-webkit-scrollbar-track': {
                        background: '#0a0e17',
                    },
                    '&::-webkit-scrollbar-thumb': {
                        background: '#2d3748',
                        borderRadius: '4px',
                    },
                    '&::-webkit-scrollbar-thumb:hover': {
                        background: '#4a5568',
                    },
                },
            },
        },
        MuiPaper: {
            styleOverrides: {
                root: {
                    backgroundImage: 'none',
                    ...glassStyle,
                    transition: 'all 0.3s ease-in-out',
                },
            },
        },
        MuiCard: {
            styleOverrides: {
                root: {
                    backgroundImage: 'none',
                    ...glassStyle,
                    borderRadius: '16px',
                    overflow: 'visible', // For glow effects
                    transition: 'all 0.3s ease-in-out',
                },
            },
        },
        MuiButton: {
            styleOverrides: {
                root: {
                    borderRadius: '10px',
                    textTransform: 'none',
                    backdropFilter: 'blur(4px)',
                    boxShadow: '0 0 10px rgba(0, 212, 255, 0.1)',
                    transition: 'all 0.2s ease-in-out',
                    '&:hover': {
                        boxShadow: '0 0 20px rgba(0, 212, 255, 0.4)',
                        transform: 'translateY(-1px)',
                    },
                },
                containedPrimary: {
                    background: 'linear-gradient(135deg, rgba(0, 212, 255, 0.8) 0%, rgba(0, 155, 179, 0.8) 100%)',
                    border: '1px solid rgba(255,255,255,0.2)',
                }
            },
        },
        MuiDrawer: {
            styleOverrides: {
                paper: {
                    background: 'rgba(10, 14, 23, 0.85)',
                    backdropFilter: 'blur(20px)',
                    borderRight: '1px solid rgba(255, 255, 255, 0.05)',
                },
            },
        },
        MuiAppBar: {
            styleOverrides: {
                root: {
                    backgroundImage: 'none',
                    background: 'rgba(10, 14, 23, 0.7)',
                    backdropFilter: 'blur(20px)',
                    borderBottom: '1px solid rgba(255, 255, 255, 0.05)',
                    boxShadow: 'none',
                },
            },
        },
    },
});

export default theme;
