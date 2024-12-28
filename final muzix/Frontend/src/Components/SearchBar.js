import React, { useState } from 'react';
import { IconButton, TextField, Box } from '@mui/material';
import { Search, Close } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

function SearchBar() {
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const clearSearch = () => {
    setSearchTerm('');
  };

  const handleSearch = () => {
    if (searchTerm.trim()) {
      navigate(`/search/${searchTerm}`);
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', position: 'relative' }}>
      <TextField
        value={searchTerm}
        onChange={handleSearchChange}
        onKeyDown={handleKeyDown}
        placeholder="Search..."
        variant="outlined"
        size="small"
        sx={{
          marginRight: '15px',
          width: '250px',
          '& input': { color: 'white' },
          '& .MuiOutlinedInput-root': {
            '& .MuiOutlinedInput-notchedOutline': {
              borderColor: 'red',
            },
            '&:hover .MuiOutlinedInput-notchedOutline': {
              borderColor: 'red',
            },
            '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
              borderColor: 'red',
            },
          },
        }}
        InputProps={{
          startAdornment: (
            <IconButton
              sx={{ color: 'white' }}
              onClick={handleSearch}
              disabled={!searchTerm.trim()}
            >
              <Search />
            </IconButton>
          ),
          endAdornment: searchTerm && (
            <IconButton onClick={clearSearch} sx={{ color: 'white' }}>
              <Close />
            </IconButton>
          ),
        }}
      />
    </Box>
  );
}

export default SearchBar;
