import './App.css'
import * as React from 'react'
import HomePage from './pages/HomePage'

import {
  Route,
  createRoutesFromElements,
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom"
import SignUp from './pages/SignUp';
import UserProfile from './pages/UserProfile'
import CoursesList from './pages/CoursesList'
import MyContracts from './pages/MyContracts'
import MyCourses from './pages/MyCourses'
import EditCourse from './pages/EditCourse'
import CreateContract from './pages/CreateContract'
import { UserContextProvider } from './context/UserContext'
import CreateCourse from './pages/CreateCourse'
import PasswordReset from './pages/PasswordReset'


// Give buena nota (づ｡◕‿‿◕｡)づ
const router = createBrowserRouter(
  createRoutesFromElements(
      <>
          <Route path="/" element={<HomePage/>}/>
          <Route path="signUp/" element={<SignUp/>}/>
          <Route path="coursesList/" element={<CoursesList/>}/>
          <Route path="myContracts/" element={<MyContracts/>}/>
          <Route path="myCourses/" element={<MyCourses/>}/>
          <Route path="profile/" element={<UserProfile/>}/>
          <Route path="createContract/" element={<CreateContract/>}/>
          <Route path="createCourse/" element={<CreateCourse/>}/>
          <Route path="editCourse/" element={<EditCourse/>}/>
          <Route path="passwordReset/" element={<PasswordReset/>}/>
      </>
  )
);

function App() {
  return (
    <UserContextProvider>
      <div className="App">
        <RouterProvider router={router}/>
      </div>
    </UserContextProvider>
  );
}

export default App;