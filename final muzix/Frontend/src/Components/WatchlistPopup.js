import React, { useState, useEffect } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, Checkbox, FormControlLabel, Typography, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import axios from 'axios';
import { useAuth } from './AuthContext';

const WatchlistPopup = ({ open, onClose, movieId }) => {
    const { currentUser, authToken } = useAuth()
    const [watchlists, setWatchlists] = useState([]);
    const [newWatchlistName, setNewWatchlistName] = useState('');
    const [selectedWatchlists, setSelectedWatchlists] = useState({});
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        if (currentUser) {
            fetchWatchlists();
        }
    }, [currentUser]);

    const fetchWatchlists = async () => {
        try {
            const response = await axios.get(`http://localhost:8081/account`, {
                params: { username: currentUser.username }
            }, {
                headers: {
                    Authorization: `Bearer ${authToken}`
                }
            });
            setWatchlists(response.data.watchlists || []);
        } catch (error) {
            console.error('Error fetching watchlists:', error);
        }
    };

    const handleCheckboxChange = (name) => {
        setSelectedWatchlists(prev => ({
            ...prev,
            [name]: !prev[name]
        }));
    };

    const handleSave = async () => {
        const selectedIds = Object.keys(selectedWatchlists).filter(name => selectedWatchlists[name]);

        if (selectedIds.length === 0) {
            setSuccessMessage('Please select at least one watchlist.');
            return;
        }

        try {
            await Promise.all(selectedIds.map(name =>
                axios.get(`http://localhost:8081/account/add-movie`, {
                    params: {
                        username: currentUser.username,
                        watchlistname: name,
                        id: movieId
                    }
                }, {
                    headers: {
                        Authorization: `Bearer ${authToken}`
                    }
                })
            ));
            setSuccessMessage('Movie added to selected watchlists!');
            setTimeout(() => {
                setSuccessMessage('');
                onClose();
            }, 2000);
        } catch (error) {
            console.error('Error adding movie to watchlists:', error);
        }
    };

    const handleCreateNewWatchlist = async () => {
        if (!currentUser) {
            console.error('User is not authenticated');
            return;
        }
    
        if (newWatchlistName) {
            try {
                await axios.get(`http://localhost:8081/account/add-watchlist`, {
                    params: { 
                        username: currentUser.username,
                        watchlistName: newWatchlistName,
                    }
                }, {
                    headers: {
                        Authorization: `Bearer ${authToken}`
                    }
                });
                setNewWatchlistName(''); 
                fetchWatchlists(); 
            } catch (error) {
                console.error('Error creating new watchlist:', error);
            }
        }
    };

    const handleDeleteSelectedWatchlists = async () => {
        const selectedIds = Object.keys(selectedWatchlists).filter(name => selectedWatchlists[name]);

        if (selectedIds.length === 0) {
            setErrorMessage('Please select at least one watchlist to delete.');
            return;
        }

        try {
            await Promise.all(selectedIds.map(name =>
                axios.get(`http://localhost:8081/account/delete-watchlist`, {
                    params: {
                        username: currentUser.username,
                        watchlistName: name
                    },
                    headers: {
                        Authorization: `Bearer ${authToken}`
                      }
                })
            ));
            setSuccessMessage('Selected watchlists deleted successfully!');
            fetchWatchlists(); 
            setSelectedWatchlists({}); 
        } catch (error) {
            console.error('Error deleting watchlists:', error);
            setErrorMessage('Error deleting selected watchlists.');
        }
    };

    return (
        <Dialog open={open} onClose={onClose} PaperProps={{ style: { backgroundColor: '#424242', color: 'white', overflow:'hidden'} }}>
            <DialogTitle>
                Add to Watchlist
                <IconButton edge="end" color="inherit" onClick={onClose} aria-label="close" style={{ position: 'absolute', right: 8, top: 8 }}>
                    <CloseIcon />
                </IconButton>
            </DialogTitle>
            <DialogContent onClick={(e) => e.stopPropagation()}>
                {successMessage && (
                    <Typography variant="body1" color="success.main">{successMessage}</Typography>
                )}
                {watchlists.length > 0 ? (
                    <>
                        <Typography variant="subtitle1">Select existing watchlists:</Typography>
                        {watchlists.map((watchlist) => (
                            <FormControlLabel
                                key={watchlist.name}
                                control={
                                    <Checkbox
                                        checked={!!selectedWatchlists[watchlist.name]}
                                        onChange={() => handleCheckboxChange(watchlist.name)}
                                    />
                                }
                                label={watchlist.name}
                            />
                        ))}
                    </>
                ) : (
                    <Typography variant="subtitle1">No watchlists found. Create a new one:</Typography>
                )}
                <TextField
                    label="New Watchlist Name"
                    variant="outlined"
                    value={newWatchlistName}
                    onChange={(e) => setNewWatchlistName(e.target.value)}
                    fullWidth
                    margin="normal"
                    InputProps={{
                        style: { color: 'white' },
                    }}
                    InputLabelProps={{
                        style: { color: '#B0BEC5' },
                    }}
                />
            </DialogContent>
            <DialogActions onClick={(e) => e.stopPropagation()}>
                <Button onClick={onClose} color="primary">Cancel</Button>
                <Button onClick={handleSave} color="primary">Save</Button>
                <Button onClick={handleCreateNewWatchlist} color="primary">Create</Button>
                <Button onClick={handleDeleteSelectedWatchlists}  
                sx={{ color: 'red', '&:hover': { backgroundColor: '#c62828' } }}>Delete</Button> 
            </DialogActions>
        </Dialog>
    );
};

export default WatchlistPopup;