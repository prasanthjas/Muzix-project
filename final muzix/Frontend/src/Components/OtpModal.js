import React, { useEffect } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import CloseIcon from '@mui/icons-material/Close';
import OTP from './OTP';
import axios from 'axios';
import { useAuth } from './AuthContext';

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

export default function OtpModal({ open, onClose, userData, profileImageFile }) {
  const { authToken } = useAuth();
  
  useEffect(() => {
    if (userData?.email) {
      console.log('Sending OTP to:', userData.email);
      sendOtp(userData.email);
    }
  }, [userData]);

  const sendOtp = async (email) => {
    try {
      const response = await axios.post('http://localhost:8080/auth/signup/send-otp', null, {
        params: { email: email },
        headers: {
          Authorization: `Bearer ${authToken}`
        }
      });
      console.log('OTP sent successfully to:', email);
    } catch (error) {
      console.error('Error sending OTP:', error);
    }
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={modalStyle}>
        <Box sx={boxStyle}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
            <Typography variant="h6" sx={{ textAlign: 'center', flexGrow: 1 }}>
              Verify OTP
            </Typography>
            <Button onClick={onClose}>
              <CloseIcon />
            </Button>
          </Box>
          <OTP userData={userData} profileImageFile={profileImageFile} />
        </Box>
      </Box>
    </Modal>
  );
}
