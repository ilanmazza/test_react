import React, {useEffect,useState} from 'react';
import AppBar from "../components/appbar/AppBar";
import Card from '../components/card/Card';
import Grid2 from '@mui/material/Unstable_Grid2';
import { Typography } from '@mui/material';
import Box from '@mui/material/Box';
import Home from '@mui/icons-material/Home';
import {GetTopCourses} from '../services/Courses'



export default function CoursesList() {
  const [topCourses,setTopCourses] = useState([])
  useEffect(function() {
    GetTopCourses().then(topCourses =>setTopCourses(topCourses))
  },[setTopCourses])
  console.log(topCourses)
  return (
    <div className="CoursesList">
      <AppBar></AppBar>

  
      <Grid2 container spacing={2} display="flex" justifyContent="center" alignItems="center">
        {topCourses.map(lessons => (
          <Card  key={lessons.name} raiting={lessons.raiting[0]} name={lessons.name} description={lessons.description} costo={lessons.costo} frecuencia={lessons.frecuencia} duracion={lessons.duracion} image='https://i.ytimg.com/vi/bYOjmW-740M/maxresdefault.jpg'/>
        ))}
      </Grid2>
    </div>
  );
}