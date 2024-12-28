import React, { useEffect, useState } from 'react';
import { TextField, Button, Box, FormHelperText, IconButton, InputAdornment, Typography } from "@mui/material";
import { useForm } from "react-hook-form";
import axios from "axios";
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import FormControl from '@mui/material/FormControl';
import FilledInput from '@mui/material/FilledInput';
import InputLabel from '@mui/material/InputLabel';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext';

export default function Login({ onForgotPassword }) {
  const { register, handleSubmit, formState: { errors }, trigger, reset } = useForm();
  const [showPassword, setShowPassword] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState(''); 
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');
  const { login } = useAuth();

  const navigate = useNavigate();

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event) => event.preventDefault();
  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };
  
  const formData = async (data) => {
    try {
      const status = await login(data);

      if (status === true) {
        reset();
        setSnackbarMessage('Login successful');
        setSnackbarSeverity('success'); 
        setSnackbarOpen(true);
        navigate('/');
      } else {
        console.error("Login error:", status);
        if (status.response && status.response.status === 404) {
          setSnackbarMessage('Invalid email or password');
        } else {
          setSnackbarMessage('An unexpected error occurred');
        }
        setSnackbarSeverity('error'); 
        setSnackbarOpen(true);
      }
    } catch (error) {
      console.error("Unexpected error:", error);
      setSnackbarMessage('An unexpected error occurred');
      setSnackbarSeverity('error'); 
      setSnackbarOpen(true);
    }
  };
  
  return (
    <div style={{ width: "85%", height: "80%", justifyContent: "center", margin: "20px" }}>
      <Box 
        component="form" 
        onSubmit={handleSubmit(formData)} 
        sx={{ '& .MuiTextField-root': { m: 1, width: '100%' } }} 
        noValidate
      >
        <TextField
          label="Email Id"
          variant="filled"
          {...register("email", { required: "Email is required" })}
          error={!!errors.email}
          helperText={errors.email ? errors.email.message : ""}
          onBlur={() => trigger('email')}
        />

        <FormControl sx={{ m: 1, width: '100%' }} variant="filled">
          <InputLabel htmlFor="filled-adornment-password" style={{ color: 'black' }}>
            Password
          </InputLabel>
          <FilledInput
            id="filled-adornment-password"
            type={showPassword ? 'text' : 'password'}
            {...register("password", { required: "Password is required" })}
            error={!!errors.password}
            onBlur={() => trigger('password')}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
          />
          {errors.password && (
            <FormHelperText error style={{ color: 'black' }}>
              {errors.password.message}
            </FormHelperText>
          )}
        </FormControl>

        <Button 
          type="submit"
          variant="contained" 
          color="error" 
          sx={{ mt: 2, width: '200px', display: 'block', margin: '15px auto', color: "black" }}
        >
          Login
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
