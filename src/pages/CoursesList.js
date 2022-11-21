import React, {useEffect,useState} from 'react';
import AppBar from "../components/appbar/AppBar";
import CustomCard from '../components/courseCard/CourseCard';
import Grid2 from '@mui/material/Unstable_Grid2';
import {GetFilterCourses} from '../services/Courses'
import TextField from '@mui/material/TextField';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import {useNavigate, useSearchParams} from 'react-router-dom';


export default function CoursesList () {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams();

  const [topCourses,setTopCourses] = useState([])
  const [searchName,setSearchName] = useState(searchParams.get("search")|| '')
  const [searchType,setSearchType] = useState(searchParams.get("type")|| '')


  useEffect(function() {
    GetFilterCourses(searchName,searchType).then(topCourses =>setTopCourses(topCourses))
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
  
  console.log(topCourses)

  return (
    <div className="CoursesList">
      <AppBar></AppBar>
      <Grid2 container spacing={2} display="flex" justifyContent="center" alignItems="center">
        <Grid2 xs={12}>
          <Card sx={{ minWidth: 275 }}>
            <CardContent>
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
            </CardContent>
          </Card>
        </Grid2>
        <Grid2 container spacing={2} display="flex" justifyContent="center" alignItems="center">
        {topCourses.map(lessons => (
          <CustomCard {...lessons} key={lessons.id}/>
        ))}
      </Grid2>
      </Grid2>
    </div>
  );
}
