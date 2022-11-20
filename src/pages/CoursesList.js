import React, {useEffect,useState} from 'react';
import AppBar from "../components/appbar/AppBar";
import CustomCard from '../components/card/Card';
import Grid2 from '@mui/material/Unstable_Grid2';
import {GetTopCourses} from '../services/Courses'
import TextField from '@mui/material/TextField';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import {Form, useNavigate} from 'react-router-dom';
import Button from '@mui/material/Button';


export default function CoursesList() {
  const navigate = useNavigate()
  const [topCourses,setTopCourses] = useState([])
  const [searchName,setSearchName] = useState('')
  const [searchType,setSearchType] = useState('')


  useEffect(function() {
    GetTopCourses().then(topCourses =>setTopCourses(topCourses))
  },[setTopCourses])

  const handleChangeSearchName = event => {
    event.preventDefault()
    setSearchName(event.target.value)
  }

  const handleChangeSearchType = event => {
    event.preventDefault()
    setSearchType(event.target.value)
  }

  const handleSearch = event => {
    event.preventDefault()
    navigate('/coursesList?search='+searchName+'&type='+searchType)
  }
  

  return (
    <div className="CoursesList">
      <AppBar></AppBar>
      <Grid2 container spacing={2} display="flex" justifyContent="center" alignItems="center">
      <Grid2 xs={12}>
      <Card sx={{ minWidth: 275 }}>
        <CardContent>
        <Form onSubmit={handleSearch}>
          <TextField
            id="searchName"
            label="Curso"
            value={searchName}
            onChange={handleChangeSearchName}
          />
          <TextField
            id="searchCategory"
            label="Categoria"
            value={searchType}
            onChange={handleChangeSearchType}
          />
          </Form>
        </CardContent>
        <CardActions style={{justifyContent: 'center'}}>
          <Button color="success" variant="contained" onClick={handleSearch}>Buscar</Button>
        </CardActions>
      </Card>

        </Grid2>
        {topCourses.map(lessons => (
          <CustomCard  key={lessons.name} raiting={lessons.raiting[0]} name={lessons.name} description={lessons.description} costo={lessons.costo} frecuencia={lessons.frecuencia} duracion={lessons.duracion} image='https://i.ytimg.com/vi/bYOjmW-740M/maxresdefault.jpg'/>
        ))}
      </Grid2>
    </div>
  );
}