import * as React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';

import TextField from '@mui/material/TextField';

import Grid from '@mui/material/Unstable_Grid2';

import BasicRating from "../rating/Rating"

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));

export default function RecipeReviewCard({id, name, description, materia, duracion, frecuencia,costo}) {
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Grid>
    <Card sx={{ maxWidth: 345 }}>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
            R
          </Avatar>
        }
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title={name}
      />
      <CardMedia
        component="img"
        height="194"
        image="data:image/jpeg;base64,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"
        alt="Courses Image"
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          {description}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="rating">
          <BasicRating></BasicRating>
        </IconButton>
        <IconButton aria-label="share">
          <ShareIcon />
        </IconButton>
        <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </ExpandMore>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography paragraph>TITULO {}</Typography>
          <Typography paragraph>
            DESCRIPCION DETALLADA DEL CURSO.
          </Typography>
          <Typography paragraph>
            ACA VEMOS COMO METEMOS LOS COMENTARIOS.
          </Typography>
          <TextField fullWidth id="standard-basic" label="Comentar" variant="standard" />
        </CardContent>
      </Collapse>
    </Card>
    </Grid>
  );
}
