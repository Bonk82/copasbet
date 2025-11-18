
import { Route, Routes } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import { DataProvider } from './context/DataContext'
import './App.css'
import { Info } from './pages/Info'
import ProtectedRoute from './components/ProtectedRoutes'
import { Login } from './pages/Login'
import { AppTheme } from './themes/AppTheme'
import { SnackbarProvider } from 'notistack'
import { Slide } from '@mui/material'

function App() {

  const slideAlert = (props) => {
    return <Slide {...props} direction="up" />;
  }

  return (
    <AuthProvider>
      <DataProvider>
        <AppTheme>
          <SnackbarProvider maxSnack={3} autoHideDuration={5000} anchorOrigin={{vertical:'top',horizontal:'right'}} TransitionComponent={slideAlert}>
            <Routes>
              <Route path="/login" element={<Login/>} />
              <Route path="/" element={<ProtectedRoute allowedRoles={[1,4]}><Info/></ProtectedRoute>} />
              <Route path="*" element={<div style={{height:'calc(100vh - 80px)',display:'grid',placeItems:'center'}}><h1>404 Página no encontrada</h1></div>} />
            </Routes>
          </SnackbarProvider>
        </AppTheme>
      </DataProvider>
    </AuthProvider>
  )
}

export default App
