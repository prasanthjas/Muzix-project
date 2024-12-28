import React, { useContext, useState } from 'react';
import { AppBar, Toolbar, Typography, Box, Button, Drawer, IconButton } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import LoginFormModal from './LoginFormModal';
import ProfileIcon from './ProfileIcon';
import MenuIcon from '@mui/icons-material/Menu'; 
import { useNavigate } from 'react-router-dom';
import SearchFilter from './SearchFilter';
import { useAuth } from './AuthContext';


function Header({ genres, languages}) {
  const navigate = useNavigate();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const { authToken } = useAuth();
  const loginStatus = !!authToken
  const HandleLogoClick = () => {
    navigate('/');
  };

  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  const handleSearchClick = () => {
    navigate('/search');
  };

  const drawerWidth = 240; 

  return (
    <>
      <AppBar position="static" sx={{ backgroundColor: '#141414' }}>
        <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Button onClick={HandleLogoClick} sx={{ textTransform: 'none', p: 0 }}>
            <Typography 
              variant="h6" 
              sx={{ color: 'red', fontFamily: 'Protest Guerrilla, sans-serif', fontWeight: 500, fontSize: '1cm' }}>
              MUZIX
            </Typography>
          </Button>
          <IconButton 
            sx={{ display: { xs: 'block', md: 'none' } }} 
            onClick={toggleDrawer}
            color="inherit"
          >
            <MenuIcon />
          </IconButton>
          
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }, justifyContent: 'center' }}>
          </Box>

          <Box sx={{ display: { xs: 'none', md: 'flex' }, alignItems: 'center', gap: '5px' }}>
            <SearchFilter genres={genres} languages={languages}/>
            <SearchIcon onClick={handleSearchClick} sx={{ cursor: 'pointer' }} />
            {!loginStatus ? <LoginFormModal /> : <ProfileIcon />}
          </Box>
        </Toolbar>
      </AppBar>

      <Drawer
        anchor="left"
        open={drawerOpen}
        onClose={toggleDrawer}
        sx={{ width: drawerWidth, flexShrink: 0 }}
      >
        <Box
          sx={{ width: drawerWidth }}
          role="presentation"
          onClick={toggleDrawer}
          onKeyDown={toggleDrawer}
        >
          <Box sx={{ p: 2 }}>
            <SearchFilter genres={genres} languages={languages}/>
            <SearchIcon onClick={handleSearchClick} sx={{ cursor: 'pointer' }} />
            {!loginStatus ? <LoginFormModal  /> : <ProfileIcon  />}
          </Box>
        </Box>
      </Drawer>
    </>
  );
}

export default Header;
