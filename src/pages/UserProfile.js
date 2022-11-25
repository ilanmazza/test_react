import React, {useEffect,useContext} from 'react';
import AppBar from "../components/AppBar";
import { Typography } from '@mui/material';
import Box from '@mui/material/Box';
import {useNavigate} from 'react-router-dom';
import useUser,{useUserInfo,useChangeUserInfo} from '../hooks/useUser.js';
import Context from "../context/UserContext";
import TextField from '@mui/material/TextField';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';


const theme = createTheme();

export default function UserProfile() {
  const {session} = useContext(Context)
  const navigate = useNavigate();
  const {isLogged} = useUser()


  const {isUserInfoLoading, hasUserInfo, userInfo, getUserInfo} = useUserInfo()
  const {isChangingInfoLoading, hasChangedInfoError, hasChangedInfo, changeUserInfo} = useChangeUserInfo()

  
  useEffect(() => {
      if (!isLogged){
        console.log('User is not logged in')
        navigate('/')  
      }
  },[isLogged,navigate])

  useEffect(() => {
    getUserInfo(session.token)
},[getUserInfo, session.token])


const handleEducationChange = (event) => {
  userInfo.education = event.target.value;
}

const handleSubmit = (event) => {
  event.preventDefault();
  const data = new FormData(event.currentTarget);
  var object = {};
  data.forEach(function(value, key){
      object[key] = value;
  });
  object['education'] = userInfo.education

  console.log(JSON.stringify(object));
  try {
    changeUserInfo(object,session.token)
  } catch(e) {
    console.log(e)
    console.log('Error while changing user info')
  }
}


return (
  <ThemeProvider theme={theme}>
    <AppBar></AppBar>
    <Container component="main" maxWidth="xs">
    {isUserInfoLoading &&
    <Box sx={[{ display: 'flex' },{ justifyContent: 'center' }]}>
      <CircularProgress />
    </Box>
    }
    {!isUserInfoLoading && hasUserInfo &&
    <>
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Typography component="h1" variant="h5">
          Mi Perfil
        </Typography>
        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                autoComplete="given-name"
                name="name"
                required
                fullWidth
                id="name"
                defaultValue={userInfo.name}
                label="Nombre completo"
                autoFocus
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                disabled
                id="email"
                label="Email"
                name="email"
                InputProps={{
                  readOnly: true,
                }}
                defaultValue={userInfo.email}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="phone"
                label="Telefono"
                name="phone"
                autoComplete="phone"
                defaultValue={userInfo.phone}
              />
            </Grid>
            <Grid item xs={12} >
            <Select
              required
              fullWidth
              label="Educacion"
              id="education"
              defaultValue={userInfo.education}
              onChange={handleEducationChange}
            >
            <MenuItem value={'Primario'}>Primario</MenuItem>
            <MenuItem value={'Secundario'}>Secundario</MenuItem>
            <MenuItem value={'Terciario'}>Terciario</MenuItem>
            <MenuItem value={'Universitario'}>Universitario</MenuItem>
            </Select>
            </Grid>
            {session.role === 'Teacher' &&
            <>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                name="titles"
                label="Titulos/Certificaciones"
                type="text"
                id="titles"
                autoComplete="titles"
                defaultValue={userInfo.titles}
              />
            </Grid>
            <Grid item xs={12}>
            <TextField
              required
              fullWidth
              name="experience"
              label="Experiencia"
              type="text"
              id="experience"
              autoComplete="experience"
              defaultValue={userInfo.experience}
            />
            </Grid>
            </>
          }
          </Grid>
          {!isChangingInfoLoading &&
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Modificar
          </Button>
          }
          {isChangingInfoLoading &&
          <Button
            type="submit"
            disabled
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Modificando...
          </Button>
          }
        {hasChangedInfoError && <strong>Campos Erroneos</strong>}
        {hasChangedInfo && !hasChangedInfoError && <strong>Perfil Modificado</strong>}
        </Box>
      </Box>
      </>
    }
    </Container>
  </ThemeProvider>
);
}