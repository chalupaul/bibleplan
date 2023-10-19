import React from 'react';
import { ChakraProvider, extendTheme, StyleFunctionProps, type ThemeConfig } from '@chakra-ui/react';
import { mode } from "@chakra-ui/theme-tools";
import ReactDOM from 'react-dom/client';
import App from './App.tsx';

const config: ThemeConfig = {
  initialColorMode: 'system',
  useSystemColorMode: true,
}

const theme = extendTheme({
  config,
  styles: {
    global: (props: StyleFunctionProps) => ({
      body: {
        bg: mode('#fafafa', '#1f1f1f')(props),
      }
    })
  }
});

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
    <App />
    </ChakraProvider>
  </React.StrictMode>,
)
