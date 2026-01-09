import { ThemeProvider } from '@emotion/react';
import { createTheme, CssBaseline } from '@mui/material';

import { originalTheme } from './originalTheme';
import { createContext } from 'react';
import { useEffect } from 'react';
import { useMemo } from 'react';
import { useState } from 'react';

// eslint-disable-next-line react-refresh/only-export-components
export const ColorModeContext = createContext({ toggleColorMode: () => {} });

export const AppTheme = ({ children }) => {

  const getSystemTheme = () =>
    window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";

  const [mode, setMode] = useState(() => localStorage.getItem("themeMode") || getSystemTheme());

  useEffect(() => {
    localStorage.setItem("themeMode", mode);
    // originalTheme.palette.mode = mode;
    console.log('theme',originalTheme);
    
  }, [mode]);

  const colorMode = useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prev) => (prev === "light" ? "dark" : "light"));
      },
    }),
    []
  );

  console.log('el tema',originalTheme)
  const theme = useMemo(
    () =>
      createTheme({
        ...originalTheme,
      palette: {
        ...originalTheme.palette,
        mode,
        },
        
      }),
      // createTheme(originalTheme, { palette: { mode } }),
    [mode]
  );

  console.log('theme final',theme);

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={ theme }>
        <CssBaseline />
        { children }
      </ThemeProvider>
    </ColorModeContext.Provider>
  )
}
