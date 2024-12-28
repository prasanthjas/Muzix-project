import React, { useEffect, useState } from 'react';
import { Box, Button, Typography } from '@mui/material';
import EditProfile from './EditProfile';
import UserWatchList from './UserWatchlist';
import Subscribe from './Subscribe'; 
import { useAuth } from './AuthContext';
import axios from 'axios';

export default function Profile() {
  const [activeSection, setActiveSection] = useState('profile');
  const [account, setAccount] = useState(null);
  const [error, setError] = useState(null);
  const [isPaidPlan, setIsPaidPlan] = useState(false);
  const { currentUser, authToken } = useAuth();

  const fetchAccountDetails = async (username) => {
    try {
      const response = await axios.get(`http://localhost:8081/account`, {
        params: { username },
      });
      setAccount(response.data);
      if(response.data.subscriptionType == "PAID") {
        setIsPaidPlan(true)
      }
      setError(null); 
    } catch (err) {
      if (err.response && err.response.status === 404) {
        setError('Account not found');
      } else {
        setError('An error occurred while fetching account details');
      }
      setAccount(null);
    }
  };

  useEffect(() => {
    fetchAccountDetails(currentUser.username)
    console.log(currentUser.username)
    console.log(account)
  }, [currentUser.username])

  const handleSectionChange = (section) => {
    setActiveSection(section);
  };

  return (
    <Box
      sx={{
        display: 'flex',
        minHeight: '100vh',
        backgroundColor: '#fff',
        flexDirection: { xs: 'column', sm: 'row' }, 
      }}
    >
      <Box
        sx={{
          width: { xs: '100%', sm: '16%', md: '15%' }, 
          backgroundColor: '#0e0e0e',
          color: 'white',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-start',
          padding: '20px',
          alignItems: { xs: 'center', sm: 'flex-start' }, 
          position: { sm: 'sticky' }, 
          top: 0,
          height: '100vh', 
          overflow: 'hidden', 
        }}
      >
        <Typography
          variant="h5"
          sx={{
            fontWeight: 'bold',
            marginBottom: '40px',
            textAlign: { xs: 'center', sm: 'left' }, 
            width: '100%',
          }}
        >
          PROFILE
        </Typography>

        <Button
          variant="text"
          sx={{
            marginBottom: '20px',
            justifyContent: { xs: 'center', sm: 'flex-start' }, 
            textTransform: 'none',
            color: 'white',
            textAlign: 'left',
            width: '100%',
          }}
          onClick={() => handleSectionChange('profile')}
        >
          Profile
        </Button>
        {isPaidPlan && (<Button
          variant="text"
          sx={{
            marginBottom: '20px',
            justifyContent: { xs: 'center', sm: 'flex-start' },
            textTransform: 'none',
            color: 'white',
            textAlign: 'left',
            width: '100%',
          }}
          onClick={() => handleSectionChange('watchlist')}
        >
          WatchList
        </Button>)}
        <Button
          variant="text"
          sx={{
            marginBottom: '20px',
            justifyContent: { xs: 'center', sm: 'flex-start' },
            textTransform: 'none',
            color: 'white',
            textAlign: 'left',
            width: '100%',
          }}
          onClick={() => handleSectionChange('subscription')} 
        >
          Subscription
        </Button>
      </Box>

      <Box
        sx={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'flex-start',
          padding: { xs: '5px', sm: '5px' },
          backgroundColor: '#151515',
        }}
      >
        {activeSection === 'profile' && (
          <Box
            sx={{
              width: '100%',
              maxWidth: '750px',
              backgroundColor: 'white',
              borderRadius: '10px',
            }}
          >
            <EditProfile account={account}/>
          </Box>
        )}

        {activeSection === 'watchlist' && (
          <Box
            sx={{
              width: '100%',
              maxWidth: '750px',
              padding: { xs: '5px', sm: '10px' }, 
              backgroundColor: '#151515',
              borderRadius: '10px',
            }}
          >
            <UserWatchList account={account}/>
          </Box>
        )}

        {activeSection === 'subscription' && (
          <Box
            sx={{
              minWidth:'99%',
              minHeight:'100%',
              padding: { xs: '5px', sm: '5px' }, 
              backgroundColor: '#0b0f19',
              borderRadius: '10px',
            }}
          >
            <Subscribe isPaidPlan={isPaidPlan} setPaidPlan={setIsPaidPlan}/>
          </Box>
        )}
      </Box>
    </Box>
  );
}