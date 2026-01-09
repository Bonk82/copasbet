import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserAuth } from '../context/AuthContext';
import { useEffect } from 'react';
import { ThemeSwitcher } from '../themes/ThemeSwitcher';
import { ThemeToggle } from '../themes/ThemeToggle';

const settings = ['Dashboard', 'Salir'];
const Header = () => {
  const { user,logout,avatar,pages } = UserAuth();
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);

  useEffect(() => {
    console.log('efect header',user);
  }, [user])
  

  const navigate = useNavigate();

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = (e) => {
    const destino = e.target.textContent
    console.log({destino});
    setAnchorElNav(null);
    if(destino === 'Partidos') navigate('/');
    if(destino === 'Apuestas') navigate('/bet');
    if(destino === 'Posiciones') navigate('/ranking');
    if(destino === 'Admin') navigate('/admin');
  };

  const handleCloseUserMenu = async (e) => {
    console.log(e.target?.textContent);
    if(e.target?.textContent === 'Salir'){
      try {
        await logout();
      } catch (error) {
        console.error(error.message);
      }
    }
  };

  return (
    <>
    {user &&
    // <Box sx={{height:60,justifyContent:'center',backgroundColor:'primary.main',position:'sticky',top:0,zIndex:999}}>
      <AppBar position="sticky" sx={{height:60,justifyContent:'center',backgroundColor:'primary.main'}}>
        <Container maxWidth="xl" sx={{paddingX:{xs:1,sm:2,md:3,lg:4,xl:5}}}>
          <Toolbar disableGutters>
            {/* <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} /> */}
            <Avatar sx={{ display: { xs: 'none', md: 'flex' }, mr: 1,objectFit:'contain'}} src="../assets/icono.png" variant='rounded' />
            <Typography
              noWrap
              href="/"
              sx={{
                mr: { md: 2,lg:6,xl:10 },
                display: { xs: 'none', md: 'flex' },
                fontWeight: 700,
                letterSpacing: '.2rem',
                color: 'antiquewhite',
                textDecoration: 'none',
                fontSize:'.8rem'
              }}
            >
              CopasBet
            </Typography>

            <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' },maxWidth:'80px' }}>
              <IconButton
                size="large"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="inherit"
              >
                <MenuIcon fontSize='2.5rem' />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'left',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'left',
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{
                  display: { xs: 'block', md: 'none' },
                }}
              >
                {pages.map((page) => (
                  <MenuItem key={page.id_menu} onClick={()=>navigate(page.ruta)}>
                    <Typography sx={{fontSize:'2rem',color:'primary.main',fontWeight:700}} textAlign="center">{page.descripcion}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
            <Avatar sx={{ display: { xs: 'flex', md: 'none' }, mr: 1,objectFit:'contain',width:'50px' }} src="../assets/icono.png" variant='rounded'/>
            <Typography
              noWrap
              href=""
              sx={{
                mr: 2,
                display: { xs: 'flex', md: 'none' },
                flexGrow: 1,
                fontWeight: 700,
                letterSpacing: '.2rem',
                color: 'antiquewhite',
                textDecoration: 'none',
                fontSize:'0.6rem',
                marginRight:10
              }}
            >
              CopasBet
            </Typography>
            <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
              {pages.map((page) => (
                <Button
                  key={page.id_menu}
                  onClick={()=>navigate(page.ruta)}
                  sx={{ my: 2,mx:{ md: 2,lg:3,xl:6 }, color: 'antiquewhite',fontSize:'clamp(1rem, 1.2vw, 2rem)', display: 'block',":hover":{backgroundColor:'secondary.main'}}}
                >
                  {page.descripcion}
                </Button>
              ))}
            </Box>

            <Box sx={{ flexGrow: 1,display:'block ruby',textAlign:'right' }}>
              {/* <ThemeSwitcher /> */}
              <ThemeToggle/>
              <Typography sx={{display:{xs:'none',md:'inline-flex'},marginRight:2,color:'antiquewhite',fontSize:'clamp(1rem, 1vw, 1.5rem)'}}>{user.usuario || user.cuenta}</Typography>
              <Tooltip title="Configuraciones">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt={avatar} src={avatar} sx={{bgcolor:'antiquewhite'}} />
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: '45px' }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                {settings.map((setting) => (
                  <MenuItem key={setting} onClick={handleCloseUserMenu}>
                    <Typography variant='h2' sx={{fontSize:'2rem'}} textAlign="center">{setting}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    // </Box> 
    }
    </>
  );
}

export default Header