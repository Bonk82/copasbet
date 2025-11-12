import { ThemeProvider } from '@emotion/react';
import { CssBaseline } from '@mui/material';

import { euroTheme } from './euroTheme';

export const AppTheme = ({ children }) => {
  return (
    <ThemeProvider theme={ euroTheme }>
      <CssBaseline />
      { children }
    </ThemeProvider>
  )
}
