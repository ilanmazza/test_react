import React, { useEffect } from 'react';
import useUser from '../hooks/useUser.js';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import Rating from '@mui/material/Rating';
import Grid from '@mui/material/Unstable_Grid2';
import {SimpleDialog} from './LoginDialog'
import BuildIcon from '@mui/icons-material/Build';
import {useNavigate} from 'react-router-dom';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import LoginIcon from '@mui/icons-material/Login';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import {useCourseDetails} from '../hooks/useCourse'
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import InfoIcon from '@mui/icons-material/Info';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import DialogContent from '@mui/material/DialogContent';
import Chip from '@mui/material/Chip';


export function CourseCard(courseObject) {
  const navigate = useNavigate();

  const {isLogged, session} = useUser()

  const [detailsOpen, setDetailsOpen] = React.useState(false);
  const handleDetailsOpen = () => {
    setDetailsOpen(true)
  }
  const handleDetailsClose = () => {
    setDetailsOpen(false)
  }

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
            <Chip sx={[{ m: 0.1 }]} size="small" key={type} label={type} variant="outlined" />
        ))}
        <Typography variant="body2" color="text.secondary">
          {courseObject.description}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
          <Rating name="half-rating-read" defaultValue={courseObject.rating[0]} precision={0.1} readOnly />
          <Typography >({courseObject.rating[1]})</Typography>
          <IconButton  onClick={handleDetailsOpen}>
            <InfoIcon/>
          </IconButton>
      </CardActions>
      <CourseDetailsDialog
        course={courseObject.id}
        open={detailsOpen}
        onClose={handleDetailsClose}
      />
    </Card>
    </Grid>
  );
}




function CourseDetailsDialog(props) {
  const { onClose, course, open} = props;
  const {isDetailsLoading, hasDetailsError, hasDetails, courseDetails, getCourseDetails} = useCourseDetails()
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

  const handleClose = () => {
    onClose();
  };


  useEffect(() => {
    if (open){
      getCourseDetails(course)
      console.log("buscar detalles para " + course)
    }
},[course, getCourseDetails, open])

  return (
    <Dialog onClose={handleClose} open={open} fullScreen={fullScreen}>
      <DialogTitle>Detalles del curso</DialogTitle>
      {isDetailsLoading &&
      <DialogContent dividers>
        <Box sx={[{ display: 'flex' },{ justifyContent: 'center' }]}>
          <CircularProgress />
        </Box>
      </DialogContent>
      }
      {hasDetails && !hasDetailsError &&
      <>
      <DialogContent dividers>
        <Typography variant="h6" gutterBottom>
        Profesor
        </Typography>
        <Typography gutterBottom>
        {courseDetails[0].teacher[0].name}
        </Typography>
        <Typography gutterBottom>
        Titulos/Certificaciones: {courseDetails[0].teacher[0].titles}
        </Typography>
        <Typography gutterBottom>
        Experiencia: {courseDetails[0].teacher[0].experience}
        </Typography>
      </DialogContent>
      <DialogContent dividers>
      <Typography variant="h6" gutterBottom>
      {courseDetails[0].name}
      </Typography>
      <Typography gutterBottom>
      Descripcion: {courseDetails[0].description}
      </Typography>
      <Typography gutterBottom>
      Costo: {courseDetails[0].cost}
      </Typography>
      <Typography gutterBottom>
      Frecuencia: {courseDetails[0].periodicity}
      </Typography>
      {courseDetails[0].type.map(type =>(
        <Chip sx={[{ m: 0.1 }]} key={type} label={type} variant="outlined" />
      ))
    }
    </DialogContent>
    <DialogContent dividers>
      <Typography variant="h6" gutterBottom>
      Calificacion del curso
      </Typography>
      <Rating name="half-rating-read" defaultValue={courseDetails[0].rating[0]} precision={0.1} readOnly />
      <Typography >Basado en {courseDetails[0].rating[1]} calificaciones</Typography>
    </DialogContent>
    {courseDetails[0].contracts[0] &&
      <DialogContent dividers>
      <Typography variant="h6" gutterBottom>
      Comentarios ({courseDetails[0].contracts.length})
      </Typography>
      {courseDetails[0].contracts.map(contratos =>(
          <Typography key={contratos._id} variant="h6" gutterBottom>
          # {contratos.comment.comment}
          </Typography>
      ))

      }
    </DialogContent>
    }
    </>
      }
    </Dialog>
  );
}
