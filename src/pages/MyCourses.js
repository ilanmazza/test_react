import React, {useEffect,useContext,useState} from 'react';
import AppBar from "../components/appbar/AppBar";
import { Typography } from '@mui/material';
import {useNavigate} from 'react-router-dom';
import useUser from '../hooks/useUser.js';
import Context from "../context/UserContext";
import {GetTeacherCourses} from '../services/Courses'
import Grid2 from '@mui/material/Unstable_Grid2';
import { CourseCard } from '../components/courseCard/CourseCard';
import Button from '@mui/material/Button';


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

  const [courses,setCourses] = useState([])
  useEffect(function() {
    GetTeacherCourses(session.token).then(topCourses =>setCourses(topCourses))
  },[session.token, setCourses])

  const handleCreateCourse = () => {
    navigate('/createCourse')
  }

  return (
    <div className="UserContracts">
    <AppBar></AppBar>
    { isLogged &&
    <>
    {courses.length === 0 &&
        <Typography paragraph>Aun no has creado ningun curso. Crea uno para empezar a enseñar!</Typography>
    }
    <Button sx={{ margin: 1 }} variant="contained" onClick={handleCreateCourse}>Crear nuevo curso</Button>
    <Grid2 container spacing={2} display="flex" justifyContent="center" alignItems="center">
      {courses.map(lessons => (
        <CourseCard {...lessons} key={lessons.id}/>
      ))}
    </Grid2>     
    </>
    }
  </div>
  );
}