import React, {useEffect,useState} from 'react';
import AppBar from "../components/AppBar";
import {useNavigate,useSearchParams} from 'react-router-dom';
import useUser from '../hooks/useUser';
import {GetCoursesById} from '../services/Courses'
import {CourseEditor} from '../components/CourseEditor';
import Grid2 from '@mui/material/Unstable_Grid2';



export default function EditCourse() {
const [searchParams] = useSearchParams();
const [courseid] = useState(searchParams.get("courseid")|| '')

  const navigate = useNavigate();
  const {isLogged} = useUser()
  
  useEffect(() => {
      if (!isLogged || courseid === ''){
        console.log('User is not logged in')
        navigate('/')  
      }
  },[courseid, isLogged, navigate])

  const [course,setCourses] = useState([])
  useEffect(function() {
    GetCoursesById(courseid).then(obtainedCourse =>setCourses(obtainedCourse))
  },[courseid, setCourses])

  return (
    
    <div className="UserProfile">
      <AppBar></AppBar>
        <Grid2 container spacing={2} display="flex" justifyContent="center" alignItems="center">
          <CourseEditor {...course} key={course.id}/>
      </Grid2>
    </div>
  );
}