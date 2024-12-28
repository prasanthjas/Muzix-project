import React, { useState } from 'react';
import { MenuItem, Select, Box, ListSubheader } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export default function SearchFilter({genres}) {
  const [selectedOption, setSelectedOption] = useState('');
  const [expandedSection, setExpandedSection] = useState(null);
  const [activeHeader, setActiveHeader] = useState(null);
  const navigate = useNavigate();

  const handleOptionChange = (value) => {
    setSelectedOption(value.name);
    navigate(`/search/genre/${value.name}/${value.id}`);
    setExpandedSection(null);
    setActiveHeader(null); 
  };

  const toggleExpandSection = (section, event) => {
    event.stopPropagation();
    if (expandedSection === section) {
      setExpandedSection(null);
      setActiveHeader(null);
    } else {
      setExpandedSection(section);
      setActiveHeader(section);
    }
  };

  const handleBlur = () => {
    setExpandedSection(null);
  };

  return (
    <Box>
      <Select
        labelId="filter-select-label"
        value={selectedOption}
        displayEmpty
        renderValue={(value) => value || 'Filter'}
        onBlur={handleBlur}
        sx={{
          backgroundColor: 'black',
          color: 'white',
          width: '150px',
          height: '40px',
          marginRight:'10px',
          borderColor: 'red',
          borderWidth: '2px',
          '& .MuiOutlinedInput-notchedOutline': {
            borderColor: 'red',
          },
          '&:hover .MuiOutlinedInput-notchedOutline': {
            borderColor: 'red',
          },
          '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
            borderColor: 'red',
          },
          '& .MuiSvgIcon-root': {
            color: 'white',
          },
        }}
        MenuProps={{
          PaperProps: {
            style: {
              maxHeight: '300px',
              backgroundColor: 'black',
              backdropFilter: 'blur(10px)',
            },
          },
          disableAutoFocusItem: true,
        }}
      >
        <Box sx={{ display: 'flex', flexDirection: 'column', width: '500px', height: '260px' }}>

          <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', position: 'relative' }}>
            <ListSubheader
              sx={{
                backgroundColor: 'black',
                color: 'white',
                width: '100px',
                '&:hover': {
                  cursor: 'pointer',
                  backgroundColor: 'darkgray',
                },
                backgroundColor: activeHeader === 'genres' ? 'red' : 'black',
              }}
              onClick={(event) => {
                toggleExpandSection('genres', event);
                event.stopPropagation();
              }}
            >
              Genres
            </ListSubheader>

            {expandedSection === 'genres' && (
              <Box sx={{
                position: 'absolute',
                top: '-90%',
                right: 0,
                backgroundColor: 'black',
                paddingLeft: '10px',
                display: 'flex',
                flexDirection: 'row',
                flexWrap: 'wrap',
                maxWidth: '350px',
                paddingTop: '4px',
              }}>
                {genres.map((genre, index) => (
                  <MenuItem
                    key={index}
                    value={genre.name}
                    onClick={(event) => {
                      event.stopPropagation();
                      handleOptionChange(genre);
                    }}
                    sx={{
                      backgroundColor: 'black',
                      color: genre === selectedOption ? 'red' : 'white',
                      '&:hover': {
                        backgroundColor: 'red',
                      },
                      width: '100px',
                    }}
                  >
                    {genre.name}
                  </MenuItem>
                ))}
              </Box>
            )}
          </Box>
        </Box>
      </Select>
    </Box>
  );
}
