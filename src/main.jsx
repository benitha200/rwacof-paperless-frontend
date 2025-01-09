import React, { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import './globals.css';
import { ChakraProvider } from '@chakra-ui/react';
import { ThemeProvider, createTheme } from '@mui/material/styles';

// Create a Material UI theme
const muiTheme = createTheme();

const root = createRoot(document.getElementById('root'));
root.render(
  <StrictMode>
    <ChakraProvider>
      <ThemeProvider theme={muiTheme}>
        <App />
      </ThemeProvider>
    </ChakraProvider>
  </StrictMode>
);
