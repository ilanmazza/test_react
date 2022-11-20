import React, {useEffect,useContext} from 'react';
import AppBar from "../components/appbar/AppBar";
import { Typography } from '@mui/material';
import Box from '@mui/material/Box';
import {useNavigate} from 'react-router-dom';
import useUser from '../hooks/useUser.js';
import Context from "../context/UserContext";


export default function UserProfile() {
  const {session} = useContext(Context)
  const navigate = useNavigate();
  const {isLogged} = useUser()
  
  useEffect(() => {
      if (!isLogged){
        console.log('User is not logged in')
        navigate('/')  
      }
  },[isLogged,navigate])


  return (
    
    <div className="UserProfile">
      <AppBar></AppBar>
      { isLogged &&
      <>
      <Box sx={{ fontStyle: 'oblique' }}><Typography>Bienvenido de nuevo  {session.name}</Typography></Box>
      <Box sx={{ fontStyle: 'normal' }}><Typography>Estos son tus cursos:</Typography></Box>      
      </>
      }
    </div>
  );
}