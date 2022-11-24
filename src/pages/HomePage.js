import React, {useEffect,useState} from 'react';
import AppBar from "../components/appbar/AppBar";
import { CourseCard } from '../components/courseCard/CourseCard';
import Grid2 from '@mui/material/Unstable_Grid2';
import { Typography } from '@mui/material';
import Box from '@mui/material/Box';
import FeatureBanner from '../components/featureBanner/FeatureBanner';
import {GetTopCourses} from '../services/Courses'
import Container from '@mui/material/Container';



const featureBanner = {
  title: 'Libera tu potencial',
  description:
    "Se parte de las miles de personas que aprenden a superar nuevos desafios día a día.",
  image: '/logo2.png',
  imageText: 'logo',
};

function HomePage() {
  const [topCourses,setTopCourses] = useState([])
  useEffect(function() {
    GetTopCourses().then(topCourses =>setTopCourses(topCourses))
  },[setTopCourses])
  return (
    <div className="HomePage">
      <AppBar></AppBar>
      <Container maxWidth="lg">
      <FeatureBanner post={featureBanner} />

      <Box sx={{ fontStyle: 'oblique' }}><Typography>StudyTime es una plataforma para realizar cursos directamente desde las ofertas creadas por los profesores. Es una aplicacion sin fines de lucro para compartir conocimiento.</Typography></Box>
      <Box sx={{ fontStyle: 'normal' }}><Typography>Estos son los cursos mejor puntuados del mes</Typography></Box>      
      <Grid2 container spacing={2} display="flex" justifyContent="center" alignItems="center">
        {topCourses.map(lessons => (
          <CourseCard {...lessons} key={lessons.id}/>
        ))}
      </Grid2>
      </Container>
    </div>
  );
}

export default HomePage;