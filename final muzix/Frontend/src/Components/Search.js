import React, { useState } from 'react';
import { Box, TextField, Button, InputAdornment, FormControlLabel, Checkbox, Typography, IconButton, Grid, Switch } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import CloseIcon from '@mui/icons-material/Close';
import { useNavigate } from 'react-router-dom';

export default function Search({ genres }) {
  const [filterOpen, setFilterOpen] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [searchQuery, setSearchQuery] = useState(''); 
  const [selectedYear, setSelectedYear] = useState('');
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [orQuery, setOrQuery] = useState(false);
  const [yearError, setYearError] = useState(false);
  const navigate = useNavigate();
  const currentYear = new Date().getFullYear();

  const handleFilterClick = () => {
    setFilterOpen(!filterOpen);
  };

  const handleSearchClick = () => {
    if (selectedYear && (isNaN(selectedYear) || selectedYear < 1900 || selectedYear > currentYear)) {
      setYearError(true);
      return;
    }
    setYearError(false);

    const params = new URLSearchParams();
    if (selectedYear) params.append('year', selectedYear);
    if (selectedGenres.length > 0) params.append('genres', selectedGenres.join(','));
    params.append('orQuery', orQuery);

    navigate(`/search/${searchQuery}?${params.toString()}`);
  };

  const handleGenreChange = (genreId) => {
    setSelectedGenres((prevGenres) =>
      prevGenres.includes(genreId)
        ? prevGenres.filter((g) => g !== genreId)
        : [...prevGenres, genreId]
    );
  };

  const handleYearChange = (event) => {
    setSelectedYear(event.target.value);
  };

  const handleOrQueryChange = (event) => {
    setOrQuery(event.target.checked); 
  };

  const clearAllValues = () => {
    setSearchQuery('');
    setSelectedYear('');
    setSelectedGenres([]);
    setOrQuery(false);
  };

  const handleClosePage = () => {
    navigate('/');
  };

  return (
    <Box 
      sx={{
        minHeight: '85vh',
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: '#141414',
        alignItems: 'center',
        padding: { xs: '5px 10px', sm: '0' },
        overflow: 'auto',
        position: 'relative' 
      }}
    >
      <IconButton
        onClick={handleClosePage}
        sx={{
          position: 'absolute',
          top: 10,
          right: 10,
          color: 'white'
        }}
      >
        <CloseIcon />
      </IconButton>

      <Box 
        sx={{ 
          display: 'flex', 
          flexDirection: { xs: 'column', sm: 'row' },
          width: { xs: '100%', sm: '70%' },
          mt: 2,
          mb: 2,
          alignItems: { xs: 'flex-start', sm: 'center' },
          justifyContent: 'space-between',
        }}
      >
        <TextField
          placeholder="Search movies..."
          variant="outlined"
          fullWidth
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          sx={{
            backgroundColor: '#1E1E1E',
            input: { color: 'white', height: '12px', padding: '10px' },
            height: '36px',
            mr: 1,
            mb: { xs: 1, sm: 0 },
            '& .MuiOutlinedInput-root': {
              '& fieldset': {
                borderColor: '#4D4D4D'
              },
              '&:hover fieldset': {
                borderColor: 'white'
              }
            }
          }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon 
                  sx={{ 
                    color: hovered ? 'white' : 'gray',
                    cursor: 'pointer',
                    transition: 'color 0.3s ease',
                  }} 
                  onMouseEnter={() => setHovered(true)}
                  onMouseLeave={() => setHovered(false)}
                  onClick={handleSearchClick}
                />
              </InputAdornment>
            ),
            endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={clearAllValues} sx={{ color: 'white' }}>
                    <CloseIcon />
                  </IconButton>
                </InputAdornment>
              )
          }}
        />

        <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, alignItems: 'center', gap: 1 }}>
          <Button
            variant="contained"
            onClick={handleFilterClick}
            sx={{ 
              backgroundColor: '#1E90FF', 
              color: 'white', 
              minWidth: '90px', 
              height: '35px',
              fontSize: '0.875rem',
              padding: '6px 16px',
              '&:hover': {
                backgroundColor: '#1C86EE'
              }
            }}
            startIcon={<FilterAltIcon />}
          >
            Filter
          </Button>

          <Button
            variant="contained"
            onClick={handleSearchClick}
            sx={{
              backgroundColor: 'red',
              color: 'white',
              fontWeight: 'bold',
              height: '35px',
              borderRadius: '6px',
              minWidth: '75px',
              '&:hover': {
                backgroundColor: '#ff4d4d'
              }
            }}
          >
            Search
          </Button>
        </Box>
      </Box>

      {filterOpen && (
        <Box
          sx={{
            width: { xs: '100%', sm: '70%' },
            backgroundColor: '#1E1E1E',
            borderRadius: '8px',
            padding: 2,
            color: 'white',
            mb: 2,
          }}
        >
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
            <Typography variant="h6">Filters</Typography>
            <IconButton onClick={handleFilterClick} sx={{ color: 'white' }}>
              <CloseIcon />
            </IconButton>
          </Box>

          <Grid container spacing={2} sx={{ mb: 2 }}>
            <Grid item xs={12} sm={8}>
              <Typography variant="subtitle1">Genres</Typography>
              <Grid container spacing={0.5}>
                {genres.map((genre) => (
                  <Grid item xs={6} sm={4} key={genre.id}>
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={selectedGenres.includes(genre.id)}
                          onChange={() => handleGenreChange(genre.id)}
                          sx={{ padding: '0px', color: 'white', '&.Mui-checked': { color: '#1E90FF' } }}
                        />
                      }
                      label={genre.name}  
                      sx={{ color: 'white', margin: 0.25 }}
                    />
                  </Grid>
                ))}
              </Grid>
            </Grid>
          </Grid>

          <Box>
            <Typography variant="subtitle1">Release Year</Typography>
            <TextField
              fullWidth
              value={selectedYear}
              onChange={handleYearChange}
              error={yearError}
              helperText={yearError ? `Please enter a valid year between 1900 and ${currentYear}` : ''}
              sx={{
                backgroundColor: '#1E1E1E',
                color: 'white',
                '& .MuiOutlinedInput-root': {
                  '& fieldset': {
                    borderColor: '#4D4D4D'
                  },
                  '&:hover fieldset': {
                    borderColor: 'white'
                  }
                }
              }}
            />
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <Typography variant="subtitle1">Query Type</Typography>
            <FormControlLabel
              control={
                <Switch
                  checked={orQuery}
                  onChange={handleOrQueryChange}
                  color="primary"
                />
              }
              label={orQuery ? 'OR' : 'AND'}
              labelPlacement="start"
              sx={{ color: 'white' }}
            />
          </Box>
          </Box>
        </Box>
      )}
    </Box>
  );
}
