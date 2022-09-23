import './App.css';
import * as React from 'react';
import AppBar from "./components/appbar/AppBar";
import Card from './components/card/Card';
import Grid from './components/grid/Grid';
import SimpleDialogDemo from './components/dialog/SimpleDialogDemo';


import { Container } from '@mui/system';




function App() {
  return (
    <div className="App">
      <AppBar></AppBar>
      <SimpleDialogDemo></SimpleDialogDemo>
      <Container>
          <Grid>
            <Card></Card>
        </Grid>
      </Container>
    </div>
  );
}

export default App;