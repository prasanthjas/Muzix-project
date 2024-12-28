import React, { useContext, useState } from 'react';
import { Avatar, Tooltip, Menu, MenuItem } from "@mui/material";
import { useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext';

export default function ProfileIcon() {
    const {logout, profileImageUrl, currentUser} = useAuth();
    const [anchorEl, setAnchorEl] = useState(null);
    const navigate=useNavigate();

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget); 
    };

    const handleClose = () => {
        setAnchorEl(null); 
    };

    const handleProfile = () => {
        navigate('/profile')
        handleClose(); 
    };

    const handleLogout = async() => {
        logout();
        navigate("/")
    };

    return (
        <div>
            <Tooltip title="Profile" arrow>
            <Avatar
                    sx={{ bgcolor: 'gray', width: 36, height: 36, marginLeft: 2 }}
                    onClick={handleClick}
                    src={profileImageUrl} 
                >
                    {!profileImageUrl ? currentUser.username.charAt(0).toUpperCase() : profileImageUrl}
                </Avatar>
            </Tooltip>
            <Menu
                anchorEl={anchorEl} 
                open={Boolean(anchorEl)}
                onClose={handleClose} 
            >
                <MenuItem onClick={handleProfile}>Profile</MenuItem>
                <MenuItem onClick={handleLogout}>Logout</MenuItem>
            </Menu>
        </div>
    );
}
