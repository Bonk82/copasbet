import { ThemeProvider } from '@emotion/react';
import { CssBaseline } from '@mui/material';

import { originalTheme } from './originalTheme';

export const AppTheme = ({ children }) => {
  return (
    <ThemeProvider theme={ originalTheme }>
      <CssBaseline />
      { children }
    </ThemeProvider>
  )
}
