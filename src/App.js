import './App.css';
import * as React from 'react';
import HomePage from './pages/HomePage';

import {
  Route,
  createRoutesFromElements,
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom"

const router = createBrowserRouter(
  createRoutesFromElements(
      <>
          <Route path="/" element={<HomePage/>}/>
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