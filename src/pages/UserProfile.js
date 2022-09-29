import * as React from 'react';
import AppBar from "../components/appbar/AppBar";
import Card from '../components/card/Card';
import Grid from '../components/grid/Grid';
import SimpleDialogDemo from '../components/dialog/SimpleDialogDemo';
import { Container } from '@mui/system';
import { Typography } from '@mui/material';

import Box from '@mui/material/Box';
import mock from "../data/mock.json";

let mockuser = mock.user.find(x => x.id === 1)

function UserProfile() {
const available_lessons = []
for (const lesson of mock.lessons){
    if(mockuser.lessons.includes(lesson.id)){
        available_lessons.push(lesson)
    }
}
  return (
    <div className="UserProfile">
      <AppBar></AppBar>
      <Box sx={{ fontStyle: 'oblique' }}><Typography>Bienvenido de nuevo  {mockuser.name}</Typography></Box>
      <Box sx={{ fontStyle: 'normal' }}><Typography>Estos son tus cursos:</Typography></Box>      
      <Container>
        <Grid>
        {available_lessons.map(lessons => (
            <Card name={lessons.name} description={lessons.description} costo={lessons.costo} frecuencia={lessons.frecuencia} duracion={lessons.duracion} image={lessons.image}/>
          ))}
        </Grid>
      </Container>
    </div>
  );
}

export default UserProfile;