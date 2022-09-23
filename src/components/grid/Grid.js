import * as React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Unstable_Grid2';

export default function BasicGrid(props) {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={4} columnSpacing={{ xs: 1, sm: 2, md: 3 }} columns={{ xs: 2, sm: 4, md: 12 }}>
        <Grid xs={6} md={4}>
          <div className="grid">{props.children}</div>
        </Grid>
        <Grid xs={6} md={4}>
          <div className="grid">{props.children}</div>
        </Grid>
        <Grid xs={6} md={4}>
          <div className="grid">{props.children}</div>
        </Grid>
      </Grid>
    </Box>
  );
}