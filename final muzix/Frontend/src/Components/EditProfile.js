import { useState, useRef, useEffect } from "react";
import { Box, Typography, Avatar, Card, CardContent, IconButton, Snackbar, Alert } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit'; 
import axios from "axios";
import { useAuth } from "./AuthContext";

export default function EditProfile() {
  const [profileImage, setProfileImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const fileInputRef = useRef(null);
  const { currentUser, profileImageUrl, authToken, setProfileImageUrl, account } = useAuth();
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  useEffect(() => {
    setProfileImage(profileImageUrl)
  }, [profileImageUrl])
  
  const handleImageChange = async (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(file);
      setProfileImage(file);
      try {
        const formData = new FormData();
        formData.append("email", account?.email || currentUser.email);
        formData.append("profileImage", file);

        const response = await axios.post("http://localhost:8080/auth/change-avatar", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${authToken}`,
          },
        });

        console.log("Response from server:", response.data);
        const profileUrl = "http://localhost:8080/profile-image/" + response.data.profileImageFileName
        setProfileImageUrl(profileUrl)
        setProfileImage(profileUrl)
      } catch (error) {
        console.error("Error uploading image:", error);
        setSnackbarMessage("Failed to update profile picture."); 
        setSnackbarOpen(true);
      }
    }
  };

  const handleEditClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  }

  return (
    <Box
      sx={{
        flex: 1,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        backgroundColor: '#151515',
        color: 'white',
      }}
    >
      <Card
        sx={{
          padding: '20px',
          backgroundColor: '#202020',
          color: 'white',
          textAlign: 'center',
          width: '300px',
        }}
      >
        <Box sx={{ position: 'relative' }}>
          <label htmlFor="profile-image-upload" style={{ cursor: 'pointer' }}>
            <Avatar
              alt="Profile Picture"
              src={profileImage}
              sx={{ width: 100, height: 100, margin: 'auto' }}
              onClick={handleEditClick}
            >
              {!profileImageUrl ? currentUser.username.charAt(0).toUpperCase() : ''}
            </Avatar>
          </label>
          <input
            accept="image/*"
            style={{ display: 'none' }}
            id="profile-image-upload"
            type="file"
            onChange={handleImageChange}
            ref={fileInputRef}
          />
          <IconButton
            sx={{
              position: 'absolute',
              bottom: 0,
              right: 'calc(50% - 15px)',
              backgroundColor: 'rgba(0,0,0,0.6)',
              color: 'white',
              width: 30,
              height: 30,
            }}
            aria-label="edit picture"
            onClick={handleEditClick}
          >
            <EditIcon />
          </IconButton>
        </Box>
        <CardContent>
          <Typography variant="h6" sx={{ marginTop: '10px' }}>
            {account?.username || currentUser.username}
          </Typography>
          <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>
            {account?.email || currentUser.email}
          </Typography>
        </CardContent>
      </Card>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
      >
        <Alert onClose={handleSnackbarClose} severity="error" sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
}

