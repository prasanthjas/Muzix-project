import React, { useState } from 'react';
import { TextField, Button, Box } from "@mui/material";
import { useForm } from "react-hook-form";
import axios from "axios";
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext';

export default function ChangePasswordOTP(open, onClose, email) {
  const { register, handleSubmit, formState: { errors }, trigger, reset } = useForm();
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');
  const navigate = useNavigate();
  const { authToken } = useAuth();

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const showSnackbar = (message, severity = 'success') => {
    setSnackbarMessage(message);
    setSnackbarSeverity(severity);
    setSnackbarOpen(true);
  };

  const checkOTP = async (email, otp) => {
    const url = "http://localhost:8080/auth/signup/check-otp";
    try {
      console.log("Sending OTP verification request:", { email, otp });
      const response = await axios.post(url, {
        email: email,
        otp: otp,
        headers: {
          Authorization: `Bearer ${authToken}`
        }
      });
      return response.data;
    } catch (error) {
      console.error("Error verifying OTP:", error.response?.data || error);
      throw error;
    }
  };


  const verifyOtpAndChangePassword = async (email, otp) => {
    try {
      const otpResponse = await checkOTP(userData.email, otp);

      if (otpResponse.success) {
        await handleSignup(userData, profileImageFile);
      } else {
        showSnackbar("OTP verification failed", "error");
      }
    } catch (error) {
      console.error("Error in OTP verification or signup:", error);
      showSnackbar("Something went wrong. Please try again.", "error");
    }
  };

  const onSubmit = (data) => {
    const otp = data.otp;
    verifyOtpAndSignup(userData, otp, profileImageFile);
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
          label="OTP"
          variant="filled"
          {...register("otp", { required: "OTP is required" })}
          error={!!errors.otp}
          helperText={errors.otp ? errors.otp.message : ""}
          onBlur={() => trigger('otp')}
        />

        <TextField
          label="New Password"
          variant="filled"
          {...register("password", { required: "Password is required" })}
          error={!!errors.password}
          helperText={errors.password ? errors.password.message : ""}
          onBlur={() => trigger('password')}
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
