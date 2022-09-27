import './App.css';
import * as React from 'react';
import HomePage from './pages/HomePage';

import {
  Route,
  createRoutesFromElements,
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom"
import SingIn from './pages/SingIn';

const router = createBrowserRouter(
  createRoutesFromElements(
      <>
          <Route path="/" element={<HomePage/>}/>
          <Route path="singIn/" element={<SingIn/>}/>
      </>
  )
);

function App() {
  return (
    <div className="App">
      <RouterProvider router={router}/>
    </div>
  );
}

export default App;