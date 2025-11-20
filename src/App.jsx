
import { Route, Routes } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import { DataProvider } from './context/DataContext'
import './App.css'
import { Info } from './pages/Info'
import ProtectedRoute from './components/ProtectedRoutes'
import { Login } from './pages/Login'
import { AppTheme } from './themes/AppTheme'
import { SnackbarProvider } from 'notistack'
import { Slide, styled } from '@mui/material'
import { MaterialDesignContent } from 'notistack'
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { AppLayout } from './layout/AppLayout'
import { Bet } from './pages/Bet'
import { Rank } from './pages/Rank'
import { Admin } from './pages/Admin'

function App() {

  const slideAlert = (props) => {
    return <Slide {...props} direction="up" />;
  }

  const StyledMaterialDesignContent = styled(MaterialDesignContent)(() => ({
    '&.notistack-MuiContent-success': {
      backgroundColor: '#116399ff',
    },
    '&.notistack-MuiContent-error': {
      backgroundColor: '#810808ff',
    },
    '&.notistack-MuiContent-default': {
      backgroundColor: '#242e35ff',
    },
    '&.notistack-MuiContent-warning': {
      backgroundColor: '#be8c00ff',
    },
    '&.notistack-MuiContent-info': {
      backgroundColor: '#3e96acff',
    },
  }));

  return (
    <AuthProvider>
      <DataProvider>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
        <AppTheme>
          <SnackbarProvider maxSnack={3} preventDuplicate autoHideDuration={7000} anchorOrigin={{vertical:'top',horizontal:'right'}} TransitionComponent={slideAlert} Components={{
              success: StyledMaterialDesignContent,
              error: StyledMaterialDesignContent,
              default: StyledMaterialDesignContent,
              warning: StyledMaterialDesignContent,
              info: StyledMaterialDesignContent,
            }}>
            <AppLayout>
              <Routes>
                <Route path="/login" element={<Login/>} />
                <Route path="/" element={<ProtectedRoute allowedRoles={[1,2]}><Info/></ProtectedRoute>} />
                <Route path="/bet" element={<ProtectedRoute allowedRoles={[1,2]}><Bet/></ProtectedRoute>} />
                <Route path="/ranking" element={<ProtectedRoute allowedRoles={[1,2]}><Rank/></ProtectedRoute>} />
                <Route path="/admin" element={<ProtectedRoute allowedRoles={[2]}><Admin/></ProtectedRoute>} />
                <Route path="*" element={<div style={{height:'calc(100vh - 80px)',display:'grid',placeItems:'center'}}><h1>404 Página no encontrada</h1></div>} />
              </Routes>
            </AppLayout>
          </SnackbarProvider>
        </AppTheme>
        </LocalizationProvider>
      </DataProvider>
    </AuthProvider>
  )
}

export default App
