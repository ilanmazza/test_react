import React from 'react';
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
import Box from '@mui/material/Box';
import StarIcon from '@mui/icons-material/Star';
import {useRateContract, useCommentContract} from '../hooks/useContract'
import useUser from '../hooks/useUser.js';
import { TextField } from '@mui/material';
import Button from '@mui/material/Button';
import {ModerateComment, ChangeContractState} from '../services/Contracts'
import ModeEditOutlineIcon from '@mui/icons-material/ModeEditOutline';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

const labels = {
  0.5: 'Inservible',
  1: 'Inservible+',
  1.5: 'Pobre',
  2: 'Pobre+',
  2.5: 'Aceptable',
  3: 'Aceptable+',
  3.5: 'Bueno',
  4: 'Bueno+',
  4.5: 'Excelente',
  5: 'Excelente+',
};

function getLabelText(value) {
  return `${value} Star${value !== 1 ? 's' : ''}, ${labels[value]}`;
}

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


// La verdad que este componente tendria que minimamente estar separado en dos, uno para profesores y otro para alumnos. Perooooooo ya esta asi y anda ¯\_(ツ)_/¯
export function ContractCard(courseObject) {  
  const {session} = useUser()

  const [ratingValue, setRatingValue] = React.useState(courseObject.rating || 2.5);
  const [ratingHover, setRatingHover] = React.useState(-1);
  const {isRatingLoading, rateContract} = useRateContract()
  const handleChangeRatingValue = () => {
    if (!isRatingLoading ){
      rateContract(courseObject.id,ratingHover,session.token)
      setRatingValue(ratingHover)
    }
  }

  const [commentContentState, setCommentContentState] = React.useState((courseObject.comment && courseObject.comment.comment) || undefined)
  const [commentState, setCommentState] = React.useState((courseObject.comment && courseObject.comment.state) || undefined)
  const {isCommentLoading , commentContract} = useCommentContract()
  const handleComment = () => {
    const commentTextField = document.getElementById("comment-" + courseObject.id)
    setCommentContentState(commentTextField.value)
    setCommentState('Pendiente')
    commentContract(courseObject.id,commentTextField.value,session.token)
  }
  const handleCommentAccept = () => {
      setCommentState('Aceptado')
      ModerateComment(courseObject.id,'Aceptado',session.token)
  }

  const handleCommentBlock = () => {
      setCommentState('Bloqueado')
      ModerateComment(courseObject.id,'Bloqueado',session.token)
  }

  const [contractState, setContractState] = React.useState((courseObject.state))
  const [open, setOpen] = React.useState(false);
  const handleClickEditContract = () => {
    setOpen(true)
  }
  const handleStateChange = (event) => {
    console.log(event.target.value)
    setContractState(event.target.value)
    ChangeContractState(courseObject.id,event.target.value,session.token)
    setOpen(false)
  };
  const handleClose = () => {
    setOpen(false)
  };

  const [expanded, setExpanded] = React.useState(false);
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Grid>
    <Card sx={[{ maxWidth: 640 }, { m: 2 }]}>
      {!["Cancelada","Finalizada"].includes(contractState) &&
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
            {courseObject.courseid.name.charAt(0).toUpperCase()}
          </Avatar>
        }
        action={
          <IconButton aria-label="settings" onClick={handleClickEditContract}>
            <ModeEditOutlineIcon />
          </IconButton>
        }
        title={courseObject.courseid.name}
      />
      }
      {["Cancelada","Finalizada"].includes(contractState) &&
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
            {courseObject.courseid.name.charAt(0).toUpperCase()}
          </Avatar>
        }
        title={courseObject.courseid.name}
      />
      }
      <CardContent>
      <Typography variant="button" color="text.secondary">
              Estado de la solicitud: {contractState}
      </Typography>
      {session.role === 'Teacher' &&
      <>
        <Box sx={[{ border: 1 }, { borderColor: 'text.primary' }, {fontWeight: 'medium'}, { borderRadius: '4px' },{ p: 1 }]}>
        <Typography align="center" variant="h6">Datos de contacto</Typography>
        <Typography align="left" variant="body1">Nombre: {courseObject.studentid.name}</Typography>
        <Typography align="left" variant="body1">Telefono: {courseObject.usercontactphone}</Typography>
        <Typography align="left" variant="body1">Mail: {courseObject.usercontactmail}</Typography>
        <Typography align="left" variant="body1">Horario: {courseObject.usercontacttime}</Typography>
        <Typography align="left" variant="body1">Mensaje: {courseObject.usermessage}</Typography>
        </Box>
      </>
      }
      { contractState === 'Solicitada' && session.role === 'Student' &&
        <Typography variant="body2" color="text.secondary">
          El profesor ya recibio tu solicitud y en breve se pondra en contacto
        </Typography>
      }
      </CardContent>
      <CardActions disableSpacing>
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
          <Typography align="left" paragraph>{courseObject.courseid.description}</Typography>
          <Typography align="left" paragraph>Costo: {courseObject.courseid.cost}</Typography>
          <Typography align="left" paragraph>Frecuencia: {courseObject.courseid.periodicity}</Typography>
          {!["Cancelada","Solicitada"].includes(contractState) && (session.role === 'Student' || courseObject.rating ) &&
          <Rating
            name="hover-feedback"
            value={ratingValue}
            precision={0.5}
            readOnly={session.role === 'Teacher'}
            getLabelText={getLabelText}
            onChange={handleChangeRatingValue}
            onChangeActive={(event, newHover) => {
                setRatingHover(newHover);
            }}
            emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
          />
          }
        {ratingValue !== null && (session.role === 'Student' || courseObject.rating ) && !["Cancelada","Solicitada"].includes(contractState) && (
        <Box sx={{ ml: 2 }}>{labels[ratingHover !== -1 ? ratingHover : ratingValue]}</Box>
        )}
        {(courseObject.comment || commentState) && session.role === 'Student'
        ? <>
            <Typography align="left" variant="subtitle2">Estado: {commentState}</Typography>
            <TextField fullWidth name="comment" label="Que opinaste del curso?" id={"comment-" + courseObject.id} defaultValue={commentContentState} autoComplete="new-comment"/>
          </>
        : (!courseObject.comment && session.role === 'Student' && !["Cancelada","Solicitada"].includes(contractState) &&
            <TextField fullWidth name="comment" label="Que opinaste del curso?" id={"comment-" + courseObject.id} defaultValue={commentContentState} autoComplete="new-comment"/>
          )
        }
        {!["Cancelada","Solicitada"].includes(contractState) && session.role === 'Student'
        ? (isCommentLoading
          ? <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }} disabled>Aplicando...</Button>
          : <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }} onClick={handleComment}>Comentar</Button>
          )
        : <></>
        }
        {session.role === 'Teacher' && courseObject.comment &&
        <>
            <Typography align="left" variant="subtitle2">Estado: {commentState}</Typography>
            <Box component="span" sx={[{ display: 'block' },{ border: 1 }, { borderColor: 'primary.main' }, {fontWeight: 'medium'}, { borderRadius: '4px' },{ p: 1 }]}>{courseObject.comment.comment}</Box>
        </>
        }
        {session.role === 'Teacher' && courseObject.comment &&  commentState === 'Pendiente' &&
        <>
            <Button type="submit" variant="contained" color="success" sx={{ mt: 3, mb: 2 }} onClick={handleCommentAccept}>Aceptar</Button>
            <Button type="submit" variant="outlined" color="error" sx={{ mt: 3, mb: 2 }} onClick={handleCommentBlock}>Bloquear</Button>
        </>
        }
        </CardContent>
      </Collapse>
    </Card>
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
           Cambiar estado de contrato
        </DialogTitle>
        <DialogContent dividers>
        {session.role === 'Teacher' && contractState === 'Solicitada' &&
          <DialogContentText id="alert-dialog-description">
            Si ya has podido acordar un con el solicitante ahora puedes formalizar la solicitud aceptando la misma. Si no fue posible tambien puedes cancelar la solicitud.
          </DialogContentText>
        }
        {contractState === 'Aceptada' &&
          <DialogContentText id="alert-dialog-description">
            Si la clase a llegado a su fin entonces puedes formalizar la terminacion finalizando la solicitud.
          </DialogContentText>
        }
        {session.role === 'Student' && contractState === 'Solicitada' &&
          <DialogContentText id="alert-dialog-description">
            El profesor pronto se pondra en contacto con vos! Si no has podido llegar a un acuerdo puedes cancelar tu solicitud
          </DialogContentText>
        }    
        </DialogContent>
        <DialogActions>
        {session.role === 'Teacher' && contractState === 'Solicitada' &&
        <>
          <Button variant="contained" color="error" value="Cancelada" onClick={handleStateChange}>Cancelar</Button>
          <Button variant="contained" color="success" value="Aceptada" onClick={handleStateChange}>Aceptar</Button>
        </>
        }
        {contractState === 'Aceptada' &&
        <>
          <Button variant="contained" value="Finalizada" onClick={handleStateChange}>Finalizar</Button>
        </>
        }
        {session.role === 'Student' && contractState === 'Solicitada' &&
          <Button variant="contained" color="error" value="Aceptada" onClick={handleStateChange}>Cancelar</Button>
        }     
        </DialogActions>
      </Dialog>
    </div>
    </Grid>
  );
}
