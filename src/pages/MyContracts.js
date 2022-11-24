import React, {useEffect,useContext,useState} from 'react';
import AppBar from "../components/appbar/AppBar";
import {Typography} from '@mui/material';
import Box from '@mui/material/Box';
import {useNavigate} from 'react-router-dom';
import useUser from '../hooks/useUser.js';
import Context from "../context/UserContext";
import Grid2 from '@mui/material/Unstable_Grid2';
import {GetContracts} from '../services/Contracts'
import {ContractCard} from '../components/ContractCard'



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

  const [contracts, setContracts] = useState([])
  useEffect(function() {
    GetContracts(session.token).then(topCourses =>setContracts(topCourses))
  },[session, setContracts])

  return (
    
    <div className="UserContracts">
      <AppBar></AppBar>
      { isLogged &&
      <>
      <Box sx={{ fontStyle: 'oblique' }}><Typography>Bienvenido de nuevo  {session.name}</Typography></Box>
      <Box sx={{ fontStyle: 'normal' }}><Typography>Estos son tus contratos:</Typography></Box> 
      <Grid2 container spacing={2} display="flex" justifyContent="center" alignItems="center">
      {contracts.length === 0 &&
        <Typography paragraph>No tienes contratos, contacta a algun profesor!</Typography>
      }
      {contracts.map(lessons => (
        <ContractCard {...lessons} key={lessons.id}/>
      ))}
      </Grid2>     
      </>
      }
    </div>
  );
}