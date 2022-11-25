import React, { useState } from 'react'
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import HomeIcon from '@mui/icons-material/Home';
import SearchIcon from '@mui/icons-material/Search';
import AccountCircle from '@mui/icons-material/AccountCircle';
import LoginDialog from './LoginDialog';
import {Form, useNavigate} from 'react-router-dom';
import useUser from '../hooks/useUser.js';

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
}));


export default function PrimaryAppBar() {
  const navigate = useNavigate();
  const {isLogged, logout, session} = useUser()
  const [searchTerm,setSearchTerm] = useState('')


  const handleLogout = () => {
    logout()
    navigate('/')
  }
  const [anchorEl, setAnchorEl] = React.useState(null);

  const isMenuOpen = Boolean(anchorEl);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };


  // Seguro que hay una mejor manera de hacer esto
  const handleHome = () => {
    navigate('/')
  }

  // Seguro que hay una mejor manera de hacer esto
  const handleProfile = () => {
    navigate('/profile')
  }
  // Seguro que hay una mejor manera de hacer esto
  const handleContracts = () => {
    navigate('/myContracts')
  }

    // Seguro que hay una mejor manera de hacer esto
    const handleCourses = () => {
      navigate('/myCourses')
    }

  const handleSearch = event => {
    event.preventDefault()
    navigate('/coursesList?search='+searchTerm)
  }

  const handleSearchChange = event => {
    event.preventDefault()
    setSearchTerm(event.target.value)
  }

  const menuId = 'primary-search-account-menu';
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      { isLogged 
      ?<div>
      <MenuItem onClick={handleLogout}>Cerrar Sesion</MenuItem>
      <MenuItem onClick={handleProfile}>Perfil</MenuItem>
      <MenuItem onClick={handleContracts}>Mis Contratos</MenuItem>
      { session.role === "Teacher" &&
      <MenuItem onClick={handleCourses}>Mis Cursos Dictados</MenuItem>
      }
      </div>
      : <LoginDialog></LoginDialog> 
    }

    </Menu>
  );


  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar sx={{ bgcolor: "green" }} position="static">
        <Toolbar>
          <IconButton
            onClick={handleHome}
            size="large"
            edge="start"
            color="inherit"
            aria-label="open drawer"
            sx={{ mr: 2 }}
          >
            <HomeIcon />
          </IconButton>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ display: { xs: 'none', sm: 'block' } }}
          >
            StudyTime
          </Typography>
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <Form onSubmit={handleSearch}>
            <StyledInputBase
              onChange={handleSearchChange}
              placeholder="Buscar cursos.."
              value={searchTerm}
            />
            </Form>
          </Search>
          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
            <IconButton
              size="large"
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
          </Box>
          <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="show more"
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      {renderMenu}
    </Box>
  );
}
