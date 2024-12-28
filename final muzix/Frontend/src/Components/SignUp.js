
import styled from 'styled-components';
import axios from 'axios';
import { Button, TextField, Box, Snackbar, Alert } from "@mui/material";
import { useForm } from "react-hook-form";
import { useRef, useState } from "react";

const StyledTextField = styled(TextField)`
  margin-top: 10px;
  width: 100%;
  
  .MuiInputBase-input {
    background-color: rgba(255, 255, 255, 0.2);
    color: black;
    height: 20px;
    padding: 10px;
  }

  .MuiInputLabel-root {
    color: black;
    transform: translate(14px, 14px) scale(1);
    transition: all 0.3s ease;
  }

  .MuiInputLabel-shrink {
    transform: translate(14px, -3px) scale(0.75);
  }

  .MuiInput-underline:before {
    border-bottom: 1px solid black;
  }
  .MuiInput-underline:after {
    border-bottom: 2px solid black;
  }

  .MuiFormHelperText-root {
    color: red;
    font-size: 12px;
    height: 20px;
    margin-top: 2px;
  }

  .MuiFormControl-root {
    max-height: 65px;
    min-height: 65px;
  }
`;

export default function SignUp({ onSignUpSubmit }) {
  const [profileImageFile, setSelectedFile] = useState(null);
  const fileInput = useRef();
  const { register, handleSubmit, trigger, watch, formState: { errors } } = useForm();
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
        return;
    }
    setSnackbarOpen(false);
};

  const onSubmit = async (data) => {
    try {
      const response = await axios.get('http://localhost:8080/auth/signup/check', {
        params: {
          username: data.username,
          email: data.email
        }
      });

      if(response.status == 200) {
        onSignUpSubmit(data, profileImageFile || null);
      }
    } catch (error) {
        if (error.response && error.response.status === 409) {
            setSnackbarMessage("Username/Email already taken");
            setSnackbarOpen(true)
        } else {
            setSnackbarMessage("An error occurred");
            setSnackbarOpen(true)
        }
    } 
  };

  const handleFileChange = () => {
    const file = fileInput.current.files[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  return (
    <Box sx={{ maxWidth: '600px', margin: '0 auto', padding: '20px' }}>
      <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate>
        {/* Form fields */}
        <StyledTextField
          label="Email Id"
          variant="filled"
          {...register("email", { required: "Email is required", pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: "Invalid email format" } })}
          error={!!errors.email}
          helperText={errors.email ? errors.email.message : ""}
          onBlur={() => trigger("email")}
        />
        <StyledTextField
          label="User Name"
          variant="filled"
          {...register("username", { required: "User name is required" })}
          error={!!errors.username}
          helperText={errors.username ? errors.username.message : ""}
          onBlur={() => trigger("username")}
        />
        <StyledTextField
          label="Password"
          variant="filled"
          type="password"
          {...register("password", { required: "Password is required" })}
          error={!!errors.password}
          helperText={errors.password ? errors.password.message : ""}
          onBlur={() => trigger("password")}
        />
        <StyledTextField
          label="Confirm Password"
          variant="filled"
          type="password"
          {...register("conformPassword", { required: "Passwords must match", validate: value => value === watch("password") || "Passwords do not match" })}
          error={Boolean(errors.conformPassword)}
          helperText={errors.conformPassword?.message}
          onBlur={() => trigger("conformPassword")}
        />
        <Box sx={{ mt: 2 }}>
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            ref={fileInput}
          />
        </Box>
        <Button 
          type="submit" 
          variant="contained" 
          color="error" 
          sx={{ mt: 2, width: '100%' }}
        >
          Sign Up
        </Button>
      </Box>
      <Snackbar 
                open={snackbarOpen} 
                autoHideDuration={6000} 
                onClose={handleClose}
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
            >
                <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
                    {snackbarMessage}
                </Alert>
            </Snackbar>
    </Box>
  );
}
