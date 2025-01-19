import React, { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import fsdb from '../firebase';
import { Box, Grid, Typography, Avatar, Paper, Button } from '@mui/material';
import { styled, useMediaQuery } from '@mui/system';
import { Apartment, Email, EmojiEmotions, GitHub, Groups2, HourglassTop, LinkedIn, WhatsApp, WorkspacePremium } from '@mui/icons-material';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import CakeIcon from '@mui/icons-material/Cake';

const MyProfile = ({ navigate }) => {
    const [profileData, setProfileData] = useState([]);
    const ProfileContainer = styled(Box)(({ theme }) => ({
        padding: theme.spacing(4),
        maxWidth: "900px",
        margin: "auto",
        [theme.breakpoints.down("sm")]: {
            padding: theme.spacing(2),
        },
    }));

        const Section = styled(Paper)(  ({ theme }) => ({
            padding: theme.spacing(3),
            marginBottom: theme.spacing(3),
            [theme.breakpoints.down("sm")]: {
                padding: theme.spacing(2),
            },
        }));

    const Label = styled(Typography)({
        fontWeight: "bolder",
        marginBottom: "4px",
    });
    const ProfileAvatar = styled(Avatar)(({ theme }) => ({
        width: "150px",
        height: "150px",
        margin: "auto",
        marginBottom: theme.spacing(2),
    }));
    useEffect(() => {
        const fetchData = async () => {
            try {
                const querySnapshot = await getDocs(collection(fsdb, 'profile')); // Replace 'users' with your collection name
                const data = querySnapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data(),
                }));
                setProfileData(data[0] || null);
                console.log(data)
            } catch (error) {
                console.error("Error fetching data: ", error);
            }
        };

        fetchData();
    }, []);
    const isMobile = useMediaQuery((theme) => theme.breakpoints.down("sm"));

    return (
        <Box padding={2} sx={{ fontFamily: 'Poppins' }}>
            <Typography variant="h4" gutterBottom>
                My Profile
            </Typography>
            {/* Header Section */}
            <Section elevation={3} sx={{ borderRadius: '45px' }}>
                <Grid container spacing={8} alignItems="center" >
                    {/* Left Section - 8 columns */}
                    <Grid item xs={12} sm={8}>
                        <Grid container spacing={2} alignItems="center">
                            <Grid item xs={12} sm={5}>
                                <ProfileAvatar src={profileData.photopath} alt="Profile Picture" />
                            </Grid>
                            <Grid item xs={12} sm={7}>
                                <Typography variant="h5" align={isMobile ? "center" : "left"}>
                                    {profileData.name} &nbsp;<sub style={{ fontSize: '0.68em', verticalAlign: 'baseline' }}>B.Tech IT</sub>
                                </Typography>
                                <Typography variant="subtitle1" color="text.primary" align={isMobile ? "center" : "left"}>
                                    {profileData.status} : <a href={profileData.workplaceurl} target="_blank" rel="noopener noreferrer">{profileData.workplace}</a>
                                </Typography>
                            </Grid>
                        </Grid>
                    </Grid>

                    {/* Right Section - 4 columns */}
                    <Grid item xs={12} sm={4}>
                        Let's Connect through <br />
                        <LinkedIn onClick={() => { navigate('/contacts/linkedin') }} style={{ cursor: 'pointer' }} /> &nbsp;
                        <GitHub onClick={() => { navigate('/contacts/github') }} style={{ cursor: 'pointer' }} />  &nbsp;
                        <WhatsApp onClick={() => { navigate('/contacts/whatsapp') }} style={{ cursor: 'pointer' }} />  &nbsp;
                        <Email onClick={() => { navigate('/contacts/email') }} style={{ cursor: 'pointer' }} /> &nbsp;
                    </Grid>
                </Grid>
            </Section>
            <Section elevation={3} container spacing={8} alignItems="center" sx={{ borderRadius: '45px' }}>
                <strong> About me:</strong><br />
                <Typography variant="subtitle1" color="text.primary" sx={{ textAlign: 'justify' }} align={isMobile ? "center" : "left"}>
                    {profileData.aboutme || ''}
                </Typography>
            </Section>

            <Section elevation={3} container spacing={8} alignItems="center" sx={{ borderRadius: '45px', padding: '20px' }}>
                <strong>Personal Details</strong>
                <Grid container spacing={4} direction={isMobile ? 'row' : 'row'} sx={{ alignItems: 'left' }}>

                    {/* Location */}
                    <Grid item xs={12} sm={6} md={4}>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <LocationOnIcon sx={{ marginRight: 1 }} />
                            <Typography variant="subtitle1" color="text.primary">
                                {profileData.location || 'City, Country'}
                            </Typography>
                        </Box>
                    </Grid>

                    {/* Email */}
                    <Grid item xs={12} sm={6} md={4}>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <EmailIcon sx={{ marginRight: 1 }} />
                            <Typography variant="subtitle1" color="text.primary">
                                {profileData.email || 'email@example.com'}
                            </Typography>
                        </Box>
                    </Grid>

                    {/* Phone */}
                    <Grid item xs={12} sm={6} md={4}>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <PhoneIcon sx={{ marginRight: 1 }} />
                            <Typography variant="subtitle1" color="text.primary">
                                {profileData.phone || '123-456-7890'}
                            </Typography>
                        </Box>
                    </Grid>

                    {/* Date of Birth */}
                    <Grid item xs={12} sm={6} md={4}>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <CakeIcon sx={{ marginRight: 1 }} />
                            <Typography variant="subtitle1" color="text.primary">
                                {profileData.dob || 'January 1, 1990'}
                            </Typography>
                        </Box>
                    </Grid>

                    {/* Work Place */}
                    <Grid item xs={12} sm={6} md={4}>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <Apartment sx={{ marginRight: 1 }} />
                            <Typography variant="subtitle1" color="text.primary">
                                {profileData.workplace || ''}
                            </Typography>
                        </Box>
                    </Grid>

                    {/* Type */}
                    <Grid item xs={12} sm={6} md={4}>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <EmojiEmotions sx={{ marginRight: 1 }} />
                            <Typography variant="subtitle1" color="text.primary">
                                Type: {profileData.type || ''}
                            </Typography>
                        </Box>
                    </Grid>

                </Grid>
            </Section>
            <Grid container spacing={2} sx={{ alignItems: 'center' }}>
                {/* First Section */}
                <Grid item xs={12} md={6}>
                    <Section elevation={3} sx={{ borderRadius: '45px', padding: '20px', height: '100%' }}>
                        <strong>My Clubs</strong>
                        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', flexWrap: 'wrap' }}>
                            {profileData.clubs ? profileData.clubs.split(',').map((club, index) => (
                                <Box
                                    key={index}
                                    sx={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        marginBottom: 1, // Adjust spacing for better layout
                                    }}
                                >
                                    <Groups2 sx={{ marginRight: 1 }} />
                                    <Typography variant="subtitle1" color="text.primary">
                                        {club.trim()}
                                    </Typography>
                                </Box>
                            )) : <Typography>
                                Error fetching clubs</Typography>}
                        </Box>
                    </Section>
                </Grid>

                <Grid item xs={12} md={6}>
  <Section
    elevation={3}
    sx={{
      borderRadius: '45px',
      padding: '20px',
      height: '100%',
    }}
  >
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
        textAlign: 'center',
      }}
    >
      {/* Title */}
      <Typography variant="h6" fontWeight="bold" gutterBottom>
        My History
      </Typography>

      {/* Subtitle */}
      <Typography variant="body1" color="text.primary" gutterBottom>
        View My Timeline
      </Typography>

      {/* Buttons */}
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1    }}>
        <Button
          variant="contained"
          color="primary"
          onClick={()=>navigate('/mytimeline')}
          startIcon={<HourglassTop />}
          sx={{
            cursor:'pointer',
            borderRadius: '20px',
            textTransform: 'none',
            padding: '10px 10px',
          }}
        >
          My Timeline
        </Button>
        <Typography variant="body1" color="text.primary" gutterBottom>
        View My Projects
      </Typography>
        <Button
          variant="contained"
          color="primary"
          startIcon={<WorkspacePremium />}
          sx={{
            borderRadius: '20px',
            textTransform: 'none',
            padding: '10px 20px',
          }}
          onClick={()=>{navigate('/projectactivity')}}
        >
          My Projects
        </Button>
      </Box>
    </Box>
  </Section>
</Grid>
 </Grid>




        </Box>
    );
};

export default MyProfile;
