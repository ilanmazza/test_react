import React, {useEffect,useState} from 'react';
import AppBar from "../components/AppBar";
import { CourseCard } from '../components/CourseCard';
import Grid2 from '@mui/material/Unstable_Grid2';
import {GetFilterCourses} from '../services/Courses'
import TextField from '@mui/material/TextField';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import {useNavigate, useSearchParams} from 'react-router-dom';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import CircularProgress from '@mui/material/CircularProgress';


export default function CoursesList () {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams();

  const [topCourses,setTopCourses] = useState([])
  const [searchState,setSearchState] = useState(false)
  const [searchName,setSearchName] = useState(searchParams.get("search")|| '')
  const [searchType,setSearchType] = useState(searchParams.get("type")|| '')


  useEffect(function() {
    setSearchState(true)
    GetFilterCourses(searchName,searchType).then(topCourses => {
      setTopCourses(topCourses)
      setSearchState(false)
    })
  },[searchName, searchType, setTopCourses, setSearchType, setSearchName])

  const handleChangeSearchName = event => {
    event.preventDefault()
    setSearchName(event.target.value)
    navigate('/coursesList?search='+searchName+'&type='+searchType)
  }

  const handleChangeSearchType = event => {
    event.preventDefault()
    setSearchType(event.target.value)
    navigate('/coursesList?search='+searchName+'&type='+searchType)
  }
  
  return (
    <div className="CoursesList">
      <AppBar></AppBar>
      <Grid2 container spacing={2} display="flex" justifyContent="center" alignItems="center">
        <Grid2 xs={12} sx={[{ minWidth: 275 }, { m: 1 }]} >
          <Card>
            <CardContent>
            <Box
              component="form"
              sx={{
                '& .MuiTextField-root': { m: 1, width: '25ch' },
              }}
              noValidate
              autoComplete="off"
            >
            <div>
            <Typography variant="h4">Filtros:</Typography>
            </div>
            <div>
              <TextField
                id="searchName"
                label="Nombre"
                value={searchName}
                onChange={handleChangeSearchName}
              />
              <TextField
                id="searchCategory"
                label="Categoria"
                value={searchType}
                onChange={handleChangeSearchType}
              />
              </div>
              </Box>
            </CardContent>
          </Card>
        </Grid2>
        <Grid2 container spacing={2} display="flex" justifyContent="center" alignItems="center">
        {topCourses.length === 0 &&
        <Grid2 xs={12}>
            <Box xl={12} sx={[{ display: 'flex' },{ justifyContent: 'center' }]}>
              <Typography variant="h6">No se encontraron cursos para tu busqueda</Typography>
            </Box>
        </Grid2>
        }
        {topCourses.map(lessons => (
          <CourseCard {...lessons} key={lessons.id}/>
        ))}
        {searchState && 
        <Grid2 xs={12}>
          <Box xl={12} sx={[{ display: 'flex' },{ justifyContent: 'center' }]}>
            <CircularProgress />
          </Box>
        </Grid2>
        }
      </Grid2>
      </Grid2>
    </div>
  );
}
