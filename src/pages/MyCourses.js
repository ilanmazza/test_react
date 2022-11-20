import React, {useEffect,useContext,useState} from 'react';
import AppBar from "../components/appbar/AppBar";
import { Typography } from '@mui/material';
import Box from '@mui/material/Box';
import {useNavigate} from 'react-router-dom';
import useUser from '../hooks/useUser.js';
import Context from "../context/UserContext";
import {GetTeacherCourses} from '../services/Courses'
import Grid2 from '@mui/material/Unstable_Grid2';
import Card from '../components/courseCard/CourseCard';


export default function UserContracts() {
  const {session} = useContext(Context)
  const navigate = useNavigate();
  const {isLogged} = useUser()
  
  useEffect(() => {
      if (!isLogged || session.role !== 'Teacher'){
        console.log('User is not logged in')
        navigate('/')  
      }
  },[isLogged, navigate, session.role])

  const [topCourses,setTopCourses] = useState([])
  useEffect(function() {
    GetTeacherCourses(session.token).then(topCourses =>setTopCourses(topCourses))
  },[session.token, setTopCourses])

  return (
    <div className="UserContracts">
    <AppBar></AppBar>
    { isLogged &&
    <>
    <Box sx={{ fontStyle: 'oblique' }}><Typography>Bienvenido de nuevo  {session.name}</Typography></Box>
    <Box sx={{ fontStyle: 'normal' }}><Typography>Estos son tus cursos:</Typography></Box> 
    <Grid2 container spacing={2} display="flex" justifyContent="center" alignItems="center">
      {topCourses.map(lessons => (
        <Card {...lessons} key={lessons.id}/>
      ))}
    </Grid2>     
    </>
    }
  </div>
  );
}