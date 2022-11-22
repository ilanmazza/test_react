import React from 'react';
import useUser from '../../hooks/useUser.js';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Rating from '@mui/material/Rating';
import Grid from '@mui/material/Unstable_Grid2';
import {SimpleDialog} from '../dialog/SimpleDialogDemo'
import BuildIcon from '@mui/icons-material/Build';
import {useNavigate} from 'react-router-dom';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import LoginIcon from '@mui/icons-material/Login';



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



export default function CourseCard(courseObject) {
  const navigate = useNavigate();

  const {isLogged, session} = useUser()

  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const [open, setOpen] = React.useState(false);
  const handleClickOpenSession = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const handleClickOpenTeacher = () => {
    navigate('/editCourse?courseid='+ courseObject.id)
  }

  const handleClickOpenStudent = () => {
    navigate('/createContract?courseid='+ courseObject.id)
  }

  return (
    <Grid>
    <Card sx={{ maxWidth: 345 }}>
      {isLogged && session.role === 'Student' &&
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
            {courseObject.name.charAt(0).toUpperCase()}
          </Avatar>
        }
        action={
          <IconButton aria-label="settings" onClick={handleClickOpenStudent}>
            <ShoppingCartIcon />
          </IconButton>
        }
        title={courseObject.name}
      />}
      {isLogged && session.id === courseObject.ownedby &&
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
            {courseObject.name.charAt(0).toUpperCase()}
          </Avatar>
        }
        action={
          <IconButton aria-label="settings" onClick={handleClickOpenTeacher}>
            <BuildIcon />
            <SimpleDialog
        open={open}
        onClose={handleClose}
      />
          </IconButton>
        }
        title={courseObject.name}
        subheader={courseObject.state}
      />}
      {isLogged && session.role === 'Teacher' && session.id !== courseObject.ownedby &&
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
            {courseObject.name.charAt(0).toUpperCase()}
          </Avatar>
        }
        title={courseObject.name}
      />}
      {!isLogged &&
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
            {courseObject.name.charAt(0).toUpperCase()}
          </Avatar>
        }
        action={
          <IconButton aria-label="settings" onClick={handleClickOpenSession}>
            <LoginIcon />
            <SimpleDialog
        open={open}
        onClose={handleClose}
      />
          </IconButton>
        }
        title={courseObject.name}
      />}
      <CardContent>
      {courseObject.type.map(type => (
            <Typography key={type} variant="caption">{type} </Typography>
        ))}
        <Typography variant="body2" color="text.secondary">
          {courseObject.description}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
          <Rating name="half-rating-read" defaultValue={courseObject.rating[0]} precision={0.1} readOnly />
          <Typography >({courseObject.rating[1]})</Typography>
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
          <Typography paragraph>Costo: {courseObject.cost}</Typography>
          <Typography paragraph>Frecuencia: {courseObject.periodicity}</Typography>
          {courseObject.comments.map(comment => (
            comment.state === "Aprobado" && <Typography key={comment.ownedby} variant="caption">{comment.comment}</Typography>
        ))}
        </CardContent>
      </Collapse>
    </Card>
    </Grid>
  );
}
