import React, {useEffect,useContext,useState} from 'react';
import AppBar from "../components/AppBar";
import {useNavigate,useSearchParams} from 'react-router-dom';
import useUser from '../hooks/useUser';
import Context from "../context/UserContext";
import {GetContracts} from '../services/Contracts'
import {ContractCreator} from '../components/ContractCreator';
import Grid2 from '@mui/material/Unstable_Grid2';
import {ContractCard} from '../components/ContractCard'
import {GetCoursesById} from '../services/Courses'


export default function CreateContract() {
const [searchParams] = useSearchParams();
const [courseid] = useState(searchParams.get("courseid")|| '')

  const {session} = useContext(Context)
  const navigate = useNavigate();
  const {isLogged} = useUser()
  
  useEffect(() => {
      if (!isLogged || courseid === ''){
        console.log('User is not logged in')
        navigate('/')  
      }
  },[courseid, isLogged, navigate])

  const [currentContract,setCurrentContract] = useState()
  useEffect(function() {
    GetContracts(session.token,courseid).then(obtainedContract =>{
      setCurrentContract(obtainedContract[0])
      
    })
  },[setCurrentContract, session.token, courseid])

  const [course,setCourses] = useState([])
  useEffect(function() {
    GetCoursesById(courseid).then(obtainedCourse =>setCourses(obtainedCourse))
  },[courseid, setCourses])

  console.log(currentContract)
  return (
    
    <div className="UserProfile">
      <AppBar></AppBar>
      <Grid2 container spacing={2} display="flex" justifyContent="center" alignItems="center">
      {currentContract &&
        <ContractCard {...currentContract} key={currentContract.id}/>
      }
      {!currentContract &&
        <ContractCreator {...course} key={course.id}/>
      }
      </Grid2>
    </div>
  );
}