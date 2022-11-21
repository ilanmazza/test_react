import React, {useEffect, useState} from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import {useCreateUser} from '../hooks/useUser.js';
import {useNavigate} from 'react-router-dom';



const theme = createTheme();

export default function SignUp() {
  const navigate = useNavigate();

  const [rol, setRol] = useState('Student');
  const {isCreateLoading, hasCreateError, hasCreated, createUser} = useCreateUser()

  useEffect(() => {
    if (hasCreated && !hasCreateError){
      console.log('Back to home')
      navigate('/')  
    }
  },[hasCreated,hasCreateError,navigate])

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    var object = {};
    data.forEach(function(value, key){
        object[key] = value;
    });
    object['role'] = rol

    console.log(JSON.stringify(object));
    try {
      createUser(object)
    } catch(e) {
      console.log(e)
      console.log('Error while creating user')
    }
  }

  const handleChange = (event) => {
    setRol(event.target.value);
  }


  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
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
          <Typography component="h1" variant="h5">
            Crear Cuenta
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
            <Grid item xs={12}>
                <TextField
                  autoComplete="given-username"
                  name="username"
                  required
                  fullWidth
                  id="username"
                  label="Nombre de usuario"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  autoComplete="given-name"
                  name="name"
                  required
                  fullWidth
                  id="name"
                  label="Nombre completo"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email"
                  name="email"
                  autoComplete="email"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                />
              </Grid>
              <Grid item xs={12} >
              <Select
                required
                fullWidth
                labelId="rol-select-label"
                id="rol-select"
                value={rol}
                label="rol"
                onChange={handleChange}
              >
              <MenuItem value={'Student'}>Alumno</MenuItem>
              <MenuItem value={'Teacher'}>Profesor</MenuItem>
              </Select>
              </Grid>
              {rol === 'Teacher' &&
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="qualifications"
                  label="Calificaciones"
                  type="text"
                  id="qualifications"
                  autoComplete="qualifications"
                />
              </Grid>
              }
            </Grid>
            {!isCreateLoading &&
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Crear
            </Button>
            }
            {isCreateLoading &&
            <Button
              type="submit"
              disabled
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Creando...
            </Button>
            }
          {hasCreateError && <strong>Campos faltantes</strong>}
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}