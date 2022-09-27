import * as React from 'react';
import Button from '@mui/material/Button';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import SignIn from '../signIn/Login';


function SimpleDialog(props) {
  const { onClose, selectedValue, open } = props;
  const handleClose = () => {
    onClose(selectedValue);
  };

  return (
    <Dialog onClose={handleClose} open={open}>
      <DialogTitle>
        <SignIn></SignIn>
      </DialogTitle>
    </Dialog>
  );
}

export default function SimpleDialogDemo() {
  const [open, setOpen] = React.useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  
  return (
    <div>
      <br />
      <Button variant="outlined" onClick={handleClickOpen}>
        INICIA SESION
      </Button>
      <SimpleDialog
        open={open}
        onClose={handleClose}
      />
    </div>
  );
}
