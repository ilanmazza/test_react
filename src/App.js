import './App.css';
import * as React from 'react';
import HomePage from './pages/HomePage';

import {
  Route,
  createRoutesFromElements,
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom"
import SignUp from './pages/SignUp';
import UserProfile from './pages/UserProfile';
import { UserContextProvider } from './context/UserContext';


const router = createBrowserRouter(
  createRoutesFromElements(
      <>
          <Route path="/" element={<HomePage/>}/>
          <Route path="signUp/" element={<SignUp/>}/>
          <Route path="profile/" element={<UserProfile/>}/>
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