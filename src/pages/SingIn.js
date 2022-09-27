import * as React from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';

import AppBar from "../components/appbar/AppBar"
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';




export default function SignIn() {
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get('email'),
      password: data.get('password'),
      name: data.get('name'),
      lastname: data.get('lastname'),
      tel: data.get('tel')

    });
  };


  const [rol, setRol] = React.useState('');

  const handleChange = (event) => {
    setRol(event.target.value);
  };

  return (
    <div className="SingIn">
      <AppBar></AppBar>
      <Container component="main" >
        <CssBaseline />
        <Box
          sx={{
            marginTop: 4,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Typography component="h1" variant="h5">
            Crear tu cuenta
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Direccion de Correo"
              name="email"
              autoComplete="email"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="name"
              label="Nombre"
              name="name"
              autoComplete="name"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="lastname"
              label="Apellido"
              name="lastname"
              autoComplete="lastname"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="tel"
              label="Telefono"
              name="tel"
              autoComplete="tel"
              autoFocus
            />
            <Box sx={{ minWidth: 120 }}>
                <InputLabel id="Rol">Rol</InputLabel>
                <Select
                  labelId="Rol"
                  id="Rol"
                  value={rol}
                  label="Rol"
                  onChange={handleChange}
                  fullWidth
                >
                  <MenuItem value={10}>Alumno</MenuItem>
                  <MenuItem value={20}>Profesor</MenuItem>
                </Select>
            </Box>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Iniciar
            </Button>
          </Box>
        </Box>
      </Container>
      </div>
  );
}