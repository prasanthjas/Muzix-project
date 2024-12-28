import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Login from './Login'; 
import CloseIcon from '@mui/icons-material/Close'; 
import SignUpModal from './SignUpModal';

const modalStyle = {
  position: 'fixed', 
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  bgcolor: 'rgba(0, 0, 0, 0.7)', 
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  zIndex: 9999, 
};

const boxStyle = {
  bgcolor: '#adadac;', 
  boxShadow: 24,
  p: 4,
  borderRadius: 2, 
  position: 'relative', 
  width: '400px', 
  maxHeight: '90%', 
  overflow: 'auto', 
};

export default function LoginFormModal() {
  const [open, setOpen] = React.useState(false);
  const [isLoginForm, setIsLoginForm] = React.useState(true); 
  const [isForgotPassword, setIsForgotPassword] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
    setIsLoginForm(true); 
  };

  const handleClose = () => {
    setOpen(false);
    setIsLoginForm(true);
  };

  const onForgotPassword = () => {
    setIsForgotPassword(true)
  }

  return (
    <div>
      <Button onClick={handleOpen} style={{ background: "red", color: "black", width: "100px" }}>Sign In</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        disableAutoFocus={false}
      >
        <Box sx={modalStyle}>
          <Box sx={boxStyle}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
              <Typography id="modal-modal-title" variant="h6" component="h2" sx={{ textAlign: 'center', flexGrow: 1 }}>
                {isLoginForm ? 'Sign In' : 'Sign Up'}
              </Typography>
              <Button 
                onClick={handleClose} 
                sx={{ 
                  minWidth: 0,
                  padding: 1, 
                  
                  color: 'black', 
                }}
              >
                <CloseIcon /> 
              </Button>
            </Box>

            {isLoginForm ? (
              <Login />  
            ) : (
              <SignUpModal />
            )}
            {/* <Typography sx={{ textAlign: 'center', marginTop: '10px', cursor: 'pointer', color: 'blue' }} onClick={onForgotPassword}>
          Forgot Password?
          </Typography> */}

            {isLoginForm && (
              <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: 2 }}>
                <Typography sx={{marginRight:'5px'}}>Don't have an account ?</Typography>
                <SignUpModal>Sign Up</SignUpModal> 
              </Box>
            )}
          </Box>
        </Box>
      </Modal>
    </div>
  );
}