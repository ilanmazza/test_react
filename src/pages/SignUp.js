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
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';
import dayjs from 'dayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import AppBar from "../components/AppBar";



const theme = createTheme();

export default function SignUp() {
  const navigate = useNavigate();

  const [rol, setRol] = useState('Student');
  const [education, setEducation] = useState('Secundario');

  const {isCreateLoading, hasCreateError, hasCreated, createUser} = useCreateUser()
  const [birthdate, setBirthdate] = React.useState(dayjs('2000-01-01T00:00:00'));
  const handleBirthdateChange = (newValue) => {
    setBirthdate(newValue);
  };

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
    object['education'] = education
    object['birthdate'] = birthdate

    console.log(JSON.stringify(object));
    try {
      createUser(object)
    } catch(e) {
      console.log(e)
      console.log('Error while creating user')
    }
  }

  const handleRolChange = (event) => {
    setRol(event.target.value);
  }
  const handleEducationChange = (event) => {
    setEducation(event.target.value);
  }


  return (
    <ThemeProvider theme={theme}>
      <AppBar></AppBar>
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
                  id="phone"
                  label="Telefono"
                  name="phone"
                  autoComplete="phone"
                />
              </Grid>
              <Grid item xs={6}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
              <MobileDatePicker
                label="Fecha de nacimiento"
                inputFormat="DD/MM/YYYY"
                value={birthdate}
                onChange={handleBirthdateChange}
                renderInput={(params) => <TextField {...params} />}
              />
              </LocalizationProvider>
              </Grid>
              <Grid item xs={6} >
              <Select
                required
                fullWidth
                label="Educacion"
                id="education"
                value={education}
                onChange={handleEducationChange}
              >
              <MenuItem value={'Primario'}>Primario</MenuItem>
              <MenuItem value={'Secundario'}>Secundario</MenuItem>
              <MenuItem value={'Terciario'}>Terciario</MenuItem>
              <MenuItem value={'Universitario'}>Universitario</MenuItem>
              </Select>
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
                onChange={handleRolChange}
              >
              <MenuItem value={'Student'}>Alumno</MenuItem>
              <MenuItem value={'Teacher'}>Profesor</MenuItem>
              </Select>
              </Grid>
              {rol === 'Teacher' &&
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
              />
              </Grid>
              </>
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