import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import CloseIcon from '@mui/icons-material/Close';
import SignUp from './SignUp';
import OtpModal from './OtpModal'; // Import the OTP modal

const modalStyle = {
  position: 'fixed',
  top: 0,
  left: 1,
  width: '100%',
  height: '100%',
  bgcolor: 'rgba(0, 0, 0, 0.5)', 
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  zIndex: 9999, 
};

const boxStyle = {
  bgcolor: '#9c9c9d;', 
  boxShadow: 24,
  p: 5,
  borderRadius: 2, 
  position: 'absolute',
  width: '400px', 
  maxHeight: '80%',
  minHeight:'70%',
  overflow: 'hidden', 
};

export default function SignUpModal() {
  const [open, setOpen] = React.useState(false);
  const [otpOpen, setOtpOpen] = React.useState(false);
  const [userData, setUserData] = React.useState(null);
  const [profileImageFile, setProfileImageFile] = React.useState(null);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleSignUpSubmit = (data, file) => {
    setUserData(data);
    if(file != null) {
      setProfileImageFile(file);
    }
    setOpen(false);
    setOtpOpen(true);
  };

  const handleOtpClose = () => {
    setOtpOpen(false);
  };

  return (
    <div>
      <Button onClick={handleOpen} style={{ background: "red", color: "black", width: "100px" }}>JOIN NOW !</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        disableAutoFocus={true}
      >
        <Box sx={modalStyle}>
          <Box sx={boxStyle}>
            <Box 
              sx={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                alignItems: 'center', 
                mb: 0, 
                mt: -4, 
              }}
            >
              <Typography 
                id="modal-modal-title" 
                variant="h6" 
                component="h2" 
                sx={{ 
                  textAlign: 'center', 
                  flexGrow: 1,
                }}
              >
                <h4>Getting Started</h4>
              </Typography>

              <Button 
                onClick={handleClose} 
                sx={{ 
                  minWidth: 0, 
                  padding: 0, 
                  color: 'black',
                }}
              >
                <CloseIcon /> 
              </Button>
            </Box>
            <SignUp onSignUpSubmit={handleSignUpSubmit} />
          </Box>
        </Box>
      </Modal>
      <OtpModal 
        open={otpOpen} 
        onClose={handleOtpClose} 
        userData={userData} 
        profileImageFile={profileImageFile} 
      />
    </div>
  );
}
