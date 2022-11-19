import React, {useEffect,useState} from 'react';
import AppBar from "../components/appbar/AppBar";
import Card from '../components/card/Card';
import Grid2 from '@mui/material/Unstable_Grid2';
import { Typography } from '@mui/material';

import Box from '@mui/material/Box';
import Carousel from '../components/carousel/Carousel';
import Stepper from '@mui/material/Stepper';

import Home from '@mui/icons-material/Home';
import {GetTopCourses} from '../services/Courses'



function HomePage() {
  const [topCourses,setTopCourses] = useState([])
  useEffect(function() {
    GetTopCourses().then(topCourses =>setTopCourses(topCourses))
  },[setTopCourses])
  console.log(topCourses)
  return (
    <div className="HomePage">
      <AppBar></AppBar>

      <Carousel
        IndicatorIcon={<Home/>}
        indicatorIconButtonProps={{
          style: {
              padding: '50px',    // 1
              color: 'blue'       // 3
          }
      }}
      activeIndicatorIconButtonProps={{
        style: {
            backgroundColor: 'red' // 2
        }
    }}
    indicatorContainerProps={{
      style: {
          marginTop: '50px', // 5
          textAlign: 'right' // 4
      }
    }}
      >
      </Carousel>

      <Stepper 
        orientation='vertical'

      >


      </Stepper>

      <Box sx={{ fontStyle: 'oblique' }}><Typography>API Cursos es una plataforma para realizar cursos directamente desde las ofertas creadas por los profesores. Es una aplicacion sin fines de lucro para compartir conocimiento.</Typography></Box>
      <Box sx={{ fontStyle: 'normal' }}><Typography>Estos son los cursos mejor puntuados del mes</Typography></Box>      
      <Grid2 container spacing={2} display="flex" justifyContent="center" alignItems="center">
        {topCourses.map(lessons => (
          <Card  key={lessons.name} raiting={lessons.raiting[0]} name={lessons.name} description={lessons.description} costo={lessons.costo} frecuencia={lessons.frecuencia} duracion={lessons.duracion} image='https://i.ytimg.com/vi/bYOjmW-740M/maxresdefault.jpg'/>
        ))}
      </Grid2>
    </div>
  );
}

export default HomePage;