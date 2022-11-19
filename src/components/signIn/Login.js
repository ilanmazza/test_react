import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
//import Login from '../../services/Login'
import useUser from '../../hooks/useUser.js';
import LoginForm from '../loginForm/LoginForm.js';
import {useNavigate} from 'react-router-dom';



const theme = createTheme();

export default function SignIn() {
  const navigate = useNavigate();
  const [username, setUsername] = React.useState('')
  const [password, setPassword] = React.useState('')
  const {isLoginLoading, hasLoginError, login} = useUser()

  const handleLogin = async (event) => {
    event.preventDefault()
  
    try {
      await login({
        username, password
      })
      //navigate('/profile')
      
      setUsername('')
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
        {isLoginLoading && <strong>Verificando...</strong>}
        {!isLoginLoading &&
            <><LoginForm
              username={username}
              password={password}
              handleUsernameChange={({ target }) => setUsername(target.value)}
              handlePasswordChange={({ target }) => setPassword(target.value)}
              handleSubmit={handleLogin} /><Grid container>
                <Grid item xs>
                  <Link href="#" variant="body2">
                    Olvidaste el password?
                  </Link>
                </Grid>
                <Grid item>
                  <Link href="singIn/" variant="body2">
                    "Todavia no tenes cuenta! Registrate"
                  </Link>
                </Grid>
              </Grid></>
         }
         {hasLoginError && <strong>Credenciales Erroneas</strong>}
        </Box>

      </Container>
    </ThemeProvider>
  );
}