import * as React from 'react';
import AppBar from "../components/appbar/AppBar";
import Card from '../components/card/Card';
import Grid from '../components/grid/Grid';
import SimpleDialogDemo from '../components/dialog/SimpleDialogDemo';
import { Container } from '@mui/system';

function HomePage() {
  return (
    <div className="HomePage">
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

export default HomePage;