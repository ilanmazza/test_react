import React, {useEffect,useContext} from 'react';
import AppBar from "../components/appbar/AppBar";
import { Typography } from '@mui/material';
import Box from '@mui/material/Box';
import mock from "../data/mock.json";
import {useNavigate} from 'react-router-dom';
import useUser from '../hooks/useUser.js';
import Context from "../context/UserContext";



let mockuser = mock.user.find(x => x.id === 1)

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


const available_lessons = []
for (const lesson of mock.lessons){
    if(mockuser.lessons.includes(lesson.id)){
        available_lessons.push(lesson)
    }
}
  return (
    
    <div className="UserContracts">
      <AppBar></AppBar>
      <Box sx={{ fontStyle: 'oblique' }}><Typography>Bienvenido de nuevo  {session.name}</Typography></Box>
      <Box sx={{ fontStyle: 'normal' }}><Typography>Estos son tus cursos:</Typography></Box>      

    </div>
  );
}