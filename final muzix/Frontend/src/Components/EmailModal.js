import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import CloseIcon from '@mui/icons-material/Close';
import axios from 'axios';
import Email from './Email';
import ChangePasswordOTP from './ChangePassword';

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

export default function EmailModal({ open, onClose }) {
    const [open, setOpen] = React.useState(false);
    const [otpOpen, setOtpOpen] = React.useState(false);
    const [email, setEmail] = useState('')

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const sendOtp = async (email) => {
        try {
        const response = await axios.post('http://localhost:8080/auth/signup/send-otp', null, {
            params: { email: email }
        });
        console.log('OTP sent successfully to:', email);
        setEmail(email)
        } catch (error) {
        console.error('Error sending OTP:', error);
        }
    };

  return (
    <div>
    <Modal open={open} onClose={onClose}>
      <Box sx={modalStyle}>
        <Box sx={boxStyle}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
            <Typography variant="h6" sx={{ textAlign: 'center', flexGrow: 1 }}>
              Enter Email
            </Typography>
            <Button onClick={onClose}>
              <CloseIcon />
            </Button>
          </Box>
          <Email sendOtp={sendOtp}/>
        </Box>
      </Box>
    </Modal>
    <ChangePasswordOTP open={open} onClose={onClose} email={email} />
    </div>
  );
}
