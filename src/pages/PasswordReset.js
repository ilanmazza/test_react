import React from 'react';
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
import {useResetPassword} from '../hooks/useUser.js';
import AppBar from "../components/AppBar";



const theme = createTheme();

export default function SignUp() {
  const {isPasswordResetingLoading, hasPasswordResetError, hasPasswordReset, passwordReset} = useResetPassword()

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    var object = {};
    data.forEach(function(value, key){
        object[key] = value;
    });

    console.log(JSON.stringify(object));
    try {
      passwordReset(object)
    } catch(e) {
      console.log(e)
      console.log('Error while reseting password')
    }
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
          <Typography variant="h5">
            Restablecer Contraseña
          </Typography>
          <Typography variant="body1">
            Si la cuenta existe, la nueva contraseña sera enviada por correo
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  autoComplete="given-email"
                  name="email"
                  required
                  fullWidth
                  id="email"
                  label="Email registrado"
                  autoFocus
                />
              </Grid>
            </Grid>
            {!isPasswordResetingLoading &&
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Restablecer
            </Button>
            }
            {isPasswordResetingLoading &&
            <Button
              type="submit"
              disabled
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Restableciendo...
            </Button>
            }
          {hasPasswordResetError && <strong>Error</strong>}
          {hasPasswordReset && !hasPasswordResetError && <strong>Restablecida exitosamente</strong>}
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}