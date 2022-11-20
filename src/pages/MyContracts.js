import React, {useEffect,useContext,useState} from 'react';
import AppBar from "../components/appbar/AppBar";
import { Typography } from '@mui/material';
import Box from '@mui/material/Box';
import {useNavigate} from 'react-router-dom';
import useUser from '../hooks/useUser.js';
import Context from "../context/UserContext";
import Grid2 from '@mui/material/Unstable_Grid2';


export default function UserContracts() {
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
    
    <div className="UserContracts">
      <AppBar></AppBar>
      { isLogged &&
      <>
      <Box sx={{ fontStyle: 'oblique' }}><Typography>Bienvenido de nuevo  {session.name}</Typography></Box>
      <Box sx={{ fontStyle: 'normal' }}><Typography>Estos son tus contratos:</Typography></Box> 
      <Grid2 container spacing={2} display="flex" justifyContent="center" alignItems="center">
      </Grid2>     
      </>
      }
    </div>
  );
}