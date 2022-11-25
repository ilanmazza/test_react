import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import useUser from '../hooks/useUser.js';
import LoginForm from './LoginForm.js';
import Typography from '@mui/material/Typography';
import { BrowserRouter as Router, Link as RouterLink } from "react-router-dom";





const theme = createTheme();

export default function SignIn() {
  const [email, setEmail] = React.useState('')
  const [password, setPassword] = React.useState('')
  const {isLoginLoading, hasLoginError, login} = useUser()

  const handleLogin = async (event) => {
    event.preventDefault()
  
    try {
      login({
        email, password
      })      
      setEmail('')
      setPassword('')
    } catch(e) {
      console.log('Wrong credentials')
    }
  
  }

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 4,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
        <Typography variant="h4" gutterBottom>Iniciar Sesión</Typography>
          {isLoginLoading && <strong>Verificando...</strong>}
          {!isLoginLoading &&
            <><LoginForm
              email={email}
              password={password}
              handleEmailChange={({ target }) => setEmail(target.value)}
              handlePasswordChange={({ target }) => setPassword(target.value)}
              handleSubmit={handleLogin} />
              <Link component={RouterLink} to="/signUp/" variant="body2" underline="hover">
                ¿Todavia no tenes cuenta? Registrate
              </Link>
            </>
          }
          {hasLoginError && <strong>Credenciales Erroneas</strong>}
        </Box>
      </Container>
    </ThemeProvider>
  );
}