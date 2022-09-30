import * as React from 'react';
import AppBar from "../components/appbar/AppBar";
import Card from '../components/card/Card';
import Grid2 from '@mui/material/Unstable_Grid2';
import { Typography } from '@mui/material';

import Box from '@mui/material/Box';
import mock from "../data/mock.json";
import UserData from '../components/userForm/UserForm';

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
      <Grid2 container spacing={2} display="flex" justifyContent="center" alignItems="center">
        {available_lessons.map(lessons => (
            <Card name={lessons.name} description={lessons.description} costo={lessons.costo} frecuencia={lessons.frecuencia} duracion={lessons.duracion} image={lessons.image}/>
          ))}
       </Grid2>
       <UserData></UserData>
    </div>
  );
}

export default UserProfile;