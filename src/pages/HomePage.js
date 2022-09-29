import * as React from 'react';
import AppBar from "../components/appbar/AppBar";
import Card from '../components/card/Card';
import SimpleDialogDemo from '../components/dialog/SimpleDialogDemo';
import Grid2 from '@mui/material/Unstable_Grid2';
import { Typography } from '@mui/material';

import Box from '@mui/material/Box';
import mock from "../data/mock.json";

function HomePage() {
  return (
    <div className="HomePage">
      <AppBar></AppBar>
      <SimpleDialogDemo></SimpleDialogDemo>
      <Box sx={{ fontStyle: 'oblique' }}><Typography>API Cursos es una plataforma para realizar cursos directamente desde las ofertas creadas por los profesores. Es una aplicacion sin fines de lucro para compartir conocimiento.</Typography></Box>
      <Box sx={{ fontStyle: 'normal' }}><Typography>Estos son los cursos mejor puntuados del mes</Typography></Box>      
      <Grid2 container spacing={2} display="flex" justifyContent="center" alignItems="center">
        {mock.lessons.map(lessons => (
          <Card  name={lessons.name} description={lessons.description} costo={lessons.costo} frecuencia={lessons.frecuencia} duracion={lessons.duracion} image={lessons.image}/>
        ))}
      </Grid2>
    </div>
  );
}

export default HomePage;