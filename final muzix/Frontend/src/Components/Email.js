import React, { useState } from 'react';
import { TextField, Button, Box } from "@mui/material";
import { useForm } from "react-hook-form";
import axios from "axios";
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext';

export default function Email({ sendOtp }) {
  const { register, handleSubmit, formState: { errors }, trigger, reset } = useForm();
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');
  const navigate = useNavigate();

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const checkEmail = async (email) => {
    try {
      const response = await axios.get('/check-email', {
        params: {
          email: email
        }
      });
      setSnackbarMessage('Email is available.');
      setSnackbarSeverity('success');
      setSnackbarOpen(true);
    } catch (error) {
      if (error.response) {
        if (error.response.status === 409) {
          setSnackbarMessage('Username/Email already taken');
          setSnackbarSeverity('error');
        } else {
          setSnackbarMessage('An unexpected error occurred.');
          setSnackbarSeverity('error');
        }
      } else {
        setSnackbarMessage('No response received from the server.');
        setSnackbarSeverity('error');
      }
      setSnackbarOpen(true);
    }
  };

  const onSubmit = async (data) => {
    const email = data.Email;
    const user = await checkEmail(email);
    if (user) {
        sendOtp(email);
        setSnackbarMessage('Email is available. OTP sent.');
        setSnackbarSeverity('success');
        setSnackbarOpen(true);
      }
    
  };

  return (
    <div style={{ width: "85%", height: "80%", justifyContent: "center", margin: "20px" }}>
      <Box
        component="form"
        onSubmit={handleSubmit(onSubmit)}
        sx={{ '& .MuiTextField-root': { m: 1, width: '100%' } }}
        noValidate
      >
        <TextField
          label="Email"
          variant="filled"
          {...register("Email", { required: "Email is Required" })}
          error={!!errors.Email} 
          helperText={errors.Email ? errors.Email.message : ""}
          onBlur={() => trigger('Email')}
        />

        <Button
          type="submit"
          variant="contained"
          color="error"
          sx={{ mt: 2, width: '200px', display: 'block', margin: '15px auto', color: "black" }}
        >
          Submit
        </Button>
      </Box>
      <Snackbar open={snackbarOpen} autoHideDuration={6000} onClose={handleSnackbarClose}>
        <Alert
          onClose={handleSnackbarClose}
          severity={snackbarSeverity}
          variant="filled"
          sx={{ width: '100%' }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </div>
  );
}
