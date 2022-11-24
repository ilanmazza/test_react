import React, {useEffect} from 'react';
import AppBar from "../components/AppBar";
import {useNavigate} from 'react-router-dom';
import useUser from '../hooks/useUser';
import {CourseCreator} from '../components/CourseCreator';
import Grid2 from '@mui/material/Unstable_Grid2';


export default function CreateCourse() {

  const navigate = useNavigate();
  const {isLogged} = useUser()
  
  useEffect(() => {
      if (!isLogged){
        console.log('User is not logged in')
        navigate('/')  
      }
  },[isLogged, navigate])

  return (
    
    <div className="CreateCourse">
      <AppBar></AppBar>
      <Grid2 container spacing={2} display="flex" justifyContent="center" alignItems="center">
        <CourseCreator/>
      </Grid2>
    </div>
  );
}