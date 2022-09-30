import * as React from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';

import mock from "../../data/mock.json"

let mockuser = mock.user.find(x => x.id === 1)

export default function UserData() {
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      name: data.get('name'),

    });
  };
  return (
    <div className="UserForm">
      <Container component="UserForm" >
        <CssBaseline />
        <Box
          sx={{
            marginTop: 4,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Typography component="h4" variant="h5">
            Datos del Usuario
          </Typography>
          <Typography>
          <ul>
            <li>{mockuser.name}</li>
            <li>{mockuser.lastname}</li>
            <li>{mockuser.cel}</li>
            <li>{mockuser.mail}</li>
          </ul>
          </Typography>
          <Box component="UserForm" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="title"
              required
              fullWidth
              id="title"
              label="Titulo - Estudios"
              name="title"
              autoComplete="title"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="Experience"
              label="Experiencia"
              name="Experience"
              autoComplete="Experience"
              autoFocus
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Guardar
            </Button>
          </Box>
        </Box>
      </Container>
      </div>
  );
}