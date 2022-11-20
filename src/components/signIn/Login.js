import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import useUser from '../../hooks/useUser.js';
import LoginForm from '../loginForm/LoginForm.js';

const theme = createTheme();

export default function SignIn() {
  const [username, setUsername] = React.useState('')
  const [password, setPassword] = React.useState('')
  const {isLoginLoading, hasLoginError, login} = useUser()

  const handleLogin = async (event) => {
    event.preventDefault()
  
    try {
      login({
        username, password
      })      
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
              handleSubmit={handleLogin} />
              <Link href="signUp/" variant="body2">
                "Todavia no tenes cuenta! Registrate"
              </Link>
            </>
          }
          {hasLoginError && <strong>Credenciales Erroneas</strong>}
        </Box>

      </Container>
    </ThemeProvider>
  );
}