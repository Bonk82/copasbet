import { createTheme, ThemeOptions } from '@mui/material/styles';
import { esES as dataGridDeDE } from "@mui/x-data-grid/locales";
import { esES as coreDeDE } from "@mui/material/locale";
import { esES } from "@mui/x-date-pickers/locales";

const lightThemeOptions: ThemeOptions = {
  palette: {
    mode: 'light',
    primary: {
      main: "#0864a1",
    },
    secondary: {
      main: "#37b5f0",
    },
    success: {
      main: "#116399ff",
    },
    error: {
      main: "#810808ff",
    },
    info: {
      main: "#3e96acff",
    },
    warning: {
      main: "#be8c00ff",
    },
    background: {
      default: '#f5f5f5',
      paper: '#ffffff',
    },
    text: {
      primary: '#F5F5F5',
      secondary: '#d2d2d2',
    },
  },
  typography: {
    fontFamily: ["Michroma", "Quicksand", "monospace", "arial"].join(","),
  },
  shape: {
    borderRadius: 8,
  },
};

const darkThemeOptions: ThemeOptions = {
  palette: {
    mode: 'dark',
    primary: {
      main: "#0882a1",
    },
    secondary: {
      main: "#45b4b4",
    },
    success: {
      main: "#076981",
    },
    error: {
      main: "#9c1d1dff",
    },
    info: {
      main: "#478b9cff",
    },
    warning: {
      main: "#918700ff",
    },
    background: {
      default: '#242424',
      paper: '#1e1e1e',
    },
    text: {
      primary: '#F5F5F5',
      secondary: '#e2e2e2',
    },
  },
  typography: {
    fontFamily: ["Michroma", "Quicksand", "monospace", "arial"].join(","),
  },
  shape: {
    borderRadius: 8,
  },
};

export const lightTheme = createTheme(lightThemeOptions, esES, dataGridDeDE, coreDeDE);
export const darkTheme = createTheme(darkThemeOptions, esES, dataGridDeDE, coreDeDE);