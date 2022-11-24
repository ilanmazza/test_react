import React from 'react'
import PropTypes from 'prop-types'
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';


export default function LoginForm ({handleSubmit, ...props}) {
  return (
      <form>
        <div>
          <TextField
            margin="normal"
            required
            fullWidth
            type='text'
            value={props.email}
            name='Email'
            placeholder='Email'
            autoComplete="email"
            onChange={props.handleEmailChange}
          />
        </div>
        <div>
          <TextField
            margin="normal"
            required
            fullWidth
            type='password'
            value={props.password}
            name='Password'
            placeholder='Password'
            autoComplete="current-password"
            onChange={props.handlePasswordChange}
          />
        </div>
        <Box textAlign='center' sx={{ m: 1 }}>
          <Button variant="contained" color="success" onClick={handleSubmit}>
            Login
          </Button>
        </Box>
      </form>
  )
}

LoginForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  email: PropTypes.string,

}