import * as React from 'react';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import SignIn from '../signIn/Login';
import MenuItem from '@mui/material/MenuItem';



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
      <MenuItem onClick={handleClickOpen}>
        Iniciar Sesion
      </MenuItem>
      <SimpleDialog
        open={open}
        onClose={handleClose}
      />
    </div>
  );
}
