import React from 'react';
import XIcon from '@mui/icons-material/X';
import { Facebook, Instagram, LinkedIn } from '@mui/icons-material';
import { Box, Typography, Link } from '@mui/material';

function Footer() {
  return (
    <Box 
      sx={{ 
        backgroundColor: '#0d0d0d', 
        color: '#ccc', 
        padding: '20px 40px', 
        display: 'flex', 
        flexDirection: { xs: 'column', sm: 'row' }, 
        justifyContent: { xs: 'center', sm: 'space-between' }, 
        alignItems: { xs: 'center', sm: 'flex-start' }, 
        fontSize: '14px'
      }}
    >
      {/* Social media icons */}
      <Box 
        sx={{ 
          display: 'flex', 
          alignItems: 'center', 
          gap: '15px', 
          marginBottom: { xs: '20px', sm: '0' },
          flexWrap: 'wrap',
        }}
      >
        <Link href="#" sx={{ color: '#ccc', textDecoration: 'none' }}>
          <Instagram sx={{ color: '#ccc' }} />
        </Link>
        <Link href="#" sx={{ color: '#ccc', textDecoration: 'none' }}>
          <XIcon sx={{ color: '#ccc' }} />
        </Link>
        <Link href="#" sx={{ color: '#ccc', textDecoration: 'none' }}>
          <Facebook sx={{ color: '#ccc' }} />
        </Link>
        <Link href="#" sx={{ color: '#ccc', textDecoration: 'none' }}>
          <LinkedIn sx={{ color: '#ccc' }} />
        </Link>
        
        {/* Language selector */}
        <Typography variant="body1" component="span" sx={{ color: '#ccc' }}>
          Language: English
        </Typography>
      </Box>

      {/* Footer text with links */}
      <Box sx={{ textAlign: { xs: 'center', sm: 'right' }, width: { xs: '100%', sm: 'auto' } }}>
        <Typography sx={{ color: '#ccc', marginBottom: '5px' }}>
          © 2024 Muzix.com, Inc. All rights reserved.
        </Typography>
        <Box sx={{ display: 'flex', gap: '10px', justifyContent: { xs: 'center', sm: 'flex-end' }, flexWrap: 'wrap' }}>
          <Link href="#" sx={{ color: '#ccc', textDecoration: 'none' }}>Terms & Conditions</Link>
          <Link href="#" sx={{ color: '#ccc', textDecoration: 'none' }}>Policy</Link>
          <Link href="#" sx={{ color: '#ccc', textDecoration: 'none' }}>Copyright</Link>
          <Link href="#" sx={{ color: '#ccc', textDecoration: 'none' }}>Cookies</Link>
        </Box>
      </Box>
    </Box>
  );
}

export default Footer;
