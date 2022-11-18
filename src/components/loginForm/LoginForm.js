import React from 'react'
import PropTypes from 'prop-types'
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';



export default function LoginForm ({handleSubmit, ...props}) {
  return (
      <form>
        <div>
          <TextField
            margin="normal"
            required
            fullWidth
            type='text'
            value={props.username}
            name='Username'
            placeholder='Username'
            onChange={props.handleUsernameChange}
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
            onChange={props.handlePasswordChange}
          />
        </div>
        <Button onClick={handleSubmit}>
          Login
        </Button>
      </form>
  )
}

LoginForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  username: PropTypes.string,

}