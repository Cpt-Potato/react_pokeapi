import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import {createTheme, ThemeProvider} from "@mui/material";

const darkTheme = createTheme({
    palette: {
        mode: "dark",
    },
    typography: {
        "fontFamily": "Raleway",
        "fontStyle": "normal"
    }
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <ThemeProvider theme={darkTheme}>
        <App/>
    </ThemeProvider>
);