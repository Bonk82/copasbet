import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Alert, FormControl, Grid, IconButton, Input, InputAdornment, InputLabel, Link } from '@mui/material';
import { Google, HowToReg, LockOpen, Visibility, VisibilityOff } from '@mui/icons-material';
import { useEffect } from 'react';
import { UserAuth } from '../context/AuthContext';
import GoogleLoginButton from '../components/GoogleLoginButton';
import { useSnackbar } from 'notistack';

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © Bonk '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}
export const Login = () => {
  const {login,signUp} =  UserAuth()
  const [form, setForm] = useState({email:'',password:'',nombre:''})
  const [nuevo, setNuevo] = useState(false);
  const [error, setError] = useState();
  const [showPassword, setShowPassword] = useState(false);
  const { enqueueSnackbar } = useSnackbar();

  // useEffect(() => {
  //   console.log('revisando',usuario);
  //   if(usuario?.role) navigate('/');
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [])

  const loginOk = async(e)=>{
    e.preventDefault()
    console.log('login',form);
    const {email,password,nombre} = form;
    try {
      const r = nuevo ? await signUp(email,password) : await login(email,password,nombre);
      console.log('respuesta loginOK',r);
    } catch (error) {
      console.log(error);
      setError(error.message)
      enqueueSnackbar(error.message || error, { variant: 'error', autoHideDuration: 3000 });
    }
  }

  const handleChange = ({target:{value,name}})=>{
    // console.log('cambiando',value,name);
    setForm({...form,[name]:value})
  }
  
  return (
      <Container component="main" maxWidth="xs">
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5" color="primary.main">
            {nuevo ? 'Registro de Nuevo Usuario' : 'Iniciar Sesión'}
          </Typography>
          {error && <Alert severity="error">{error}</Alert>} 
          <Box component="form" onSubmit={loginOk} noValidate sx={{ mt: 1 }}>
            {nuevo && (
            <TextField
              required
              fullWidth
              name="nombre"
              label="Nombre"
              type="text"
              id="nombre"
              autoComplete="nombre"
              autoFocus={!nuevo}
              onChange={handleChange}
              variant='standard'
              visible={nuevo}
            />)}
            <TextField
              required
              fullWidth
              id="email"
              label="Correo Electrónico"
              name="email"
              autoComplete="email"
              autoFocus={!nuevo}
              onChange={handleChange}
              variant='standard'
            />
            <FormControl fullWidth required variant="standard">
              <InputLabel htmlFor="password">Contraseña</InputLabel>
              <Input
                id="password"
                name='password'
                onChange={handleChange}
                fullWidth
                required
                type={showPassword ? 'text' : 'password'}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton  onClick={() => setShowPassword(!showPassword)}>
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
              />
            </FormControl>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3 }}
              ><LockOpen/> {nuevo ? 'Registrarte' : 'Iniciar Sesión'}
            </Button>
            <Button type='button' title='Registrarte' fullWidth onClick={() => setNuevo(!nuevo)} variant="contained" color='secondary' sx={{ mt: 1, mb: 2 }}><HowToReg/> Regístrate</Button>
            <GoogleLoginButton/>
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
  )
}
