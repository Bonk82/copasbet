import { createTheme } from '@mui/material';
import { esES as dataGridDeDE } from '@mui/x-data-grid/locales';
import { esES as coreDeDE } from '@mui/material/locale';
import { esES } from '@mui/x-date-pickers/locales';

export const originalTheme = createTheme({
    //Ocean boat blue	#1077C3; Picton blue	#49BCE3
    palette: {
      primary: {
          main: '#0864a1'
      },
      secondary: {
          main: '#2da1d6'
      },
      success: {
          main: '#116399ff'
      },
      error: {
          main: '#810808ff'
      },
      info:{
          main: '#3e96acff'
      },
      warning:{
          main: '#be8c00ff'
      },
      persist: {
          main: '#242e35ff'
      },
    },
    typography:{
        fontFamily:['Michroma','Quicksand','monospace','arial'].join(','),
    } 
},
esES,
dataGridDeDE,
coreDeDE
)