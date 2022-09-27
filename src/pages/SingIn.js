import * as React from 'react';
import AppBar from "../components/appbar/AppBar";
import { Container } from '@mui/system';
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel';
import Input from '@mui/material/Input'
import FormHelperText from '@mui/material/FormHelperText'

function SingIn() {
  return (
    <div className="HomePage">
      <AppBar></AppBar>
      <Container>
        <FormControl>
            <InputLabel htmlFor="my-input">Email address</InputLabel>
            <Input id="my-input" aria-describedby="my-helper-text" />
            <FormHelperText id="my-helper-text">We'll never share your email.</FormHelperText>
        </FormControl>
      </Container>
    </div>
  );
}

export default SingIn;