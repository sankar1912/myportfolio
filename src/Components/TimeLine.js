import React, { useState } from 'react';
import {
  Box,
  IconButton,
  Menu,
  MenuItem,
  Tooltip,
  Typography,
} from '@mui/material';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import Timeline from '@mui/lab/Timeline';
import TimelineItem from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineOppositeContent from '@mui/lab/TimelineOppositeContent';
import TimelineDot from '@mui/lab/TimelineDot';
import { getFirestore, doc, getDoc } from 'firebase/firestore';


import LaptopMacIcon from '@mui/icons-material/LaptopMac';
import HotelIcon from '@mui/icons-material/Hotel';

import SchoolIcon from '@mui/icons-material/School';
import { Celebration, Work } from '@mui/icons-material';
const iconMap = {
  'celebrate': <Celebration/>,
  'LaptopMacIcon': <LaptopMacIcon />,
  'HotelIcon': <HotelIcon />,
  'college': <SchoolIcon />,
};

const TimeLine = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedYear, setSelectedYear] = useState(null);
  const [activities, setActivities] = useState([]);
  const open = Boolean(anchorEl);
  const firestore = getFirestore();

  const years = Array.from({ length: 2025 - 2004 + 1 }, (_, i) => 2004 + i);

  const handleOpenMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const handleYearSelect = async (year) => {
    setSelectedYear(year);
    setAnchorEl(null);
    try {
      const docRef = doc(firestore, 'timeline', String(year));
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const data = docSnap.data();
        const activitiesArray = Object.keys(data).map((key) => {
          const [time, description, iconName] = data[key];
          return { time, description, iconName };
        });
        setActivities(activitiesArray);
        console.log(activitiesArray)
      } else {
        console.log('No such document!');
        setActivities([]);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      setActivities([]);
    }
  };

  return (
    <Box
      sx={{
        position: 'relative',
        width: '100%',
        height: '100vh',
        padding: 3,
      }}
    >

      <IconButton
        aria-label="filter"
        onClick={handleOpenMenu}
        sx={{
          position: 'absolute',
          top: 16,
          right: 16,
          backgroundColor: 'primary.main',
          color: 'white',
          '&:hover': { backgroundColor: 'primary.dark' },
        }}
      >
        <FilterAltIcon />
      </IconButton>

      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleCloseMenu}
        PaperProps={{
          style: {
            maxHeight: 300,
            width: '200px',
          },
        }}
      >
        {years.map((year) => (
          <MenuItem
            key={year}
            onClick={() => handleYearSelect(year)}
            sx={{
              '&:hover': {
                backgroundColor: 'primary.light',
                color: 'white',
              },
            }}
          >
            {year}
          </MenuItem>
        ))}
      </Menu>

      <Box sx={{ mt: 4 }}>
        <Typography
          variant="h5"
          color="text.primary"
          sx={{ textAlign: 'center', mb: 3 }}
        >
          {selectedYear ? `Selected Year: ${selectedYear}` : 'Select a Year'}<br/>
          {selectedYear ? `Total Activites: ${activities.length}` : 'No Activity'}
        </Typography>

        <Timeline position='left'>
          {activities.length > 0 ? (
            activities.map((activity, index) => (
              <TimelineItem key={index}>
                <TimelineOppositeContent
                  sx={{ m: 'auto 0' }}
                  align="right"
                  variant="body2"
                  color="text.secondary"
                >
                  {activity.time} 
                </TimelineOppositeContent>
                <TimelineSeparator>
                  <TimelineConnector />
                   {/* Tooltip added around TimelineDot */}
                   <Tooltip title={`This is my activity I experienced in ${selectedYear}`} sx={{fontSize:'1em'}} arrow>
                    <TimelineDot color="primary">
                      {iconMap[activity.iconName] || <Work />} {/* Dynamically render the icon */}
                    </TimelineDot>
                  </Tooltip>
                </TimelineSeparator>
                <TimelineContent sx={{ py: '12px', px: 2 }}>
                  <Typography variant="h6" component="span">
                    Activity
                  </Typography>
                  <Typography>{activity.description}</Typography> {/* Show the description */}
                </TimelineContent>
              </TimelineItem>
            ))
          ) : (
            <Typography
              variant="body1"
              color="text.secondary"
              sx={{ textAlign: 'center', mt: 2 }}
            >
              {selectedYear
                ? 'No activities found for this year.'
                : 'Please select a year to view activities.'}
            </Typography>
          )}
        </Timeline>
      </Box>
    </Box>
  );
};

export default TimeLine;
