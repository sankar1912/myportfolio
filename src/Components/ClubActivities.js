import React, { useEffect, useState } from 'react';
import { Paper, Box, Grid, styled, Typography, Divider } from '@mui/material';
import { getFirestore, collection, getDocs } from 'firebase/firestore';
import fsdb from '../firebase';

const ClubActivities = () => {
    const [activities, setActivities] = useState({});
    const [loading, setLoading] = useState(true);

    const Section = styled(Paper)(({ theme }) => ({
        padding: theme.spacing(3),
        marginBottom: theme.spacing(3),
        borderRadius: '20px',
        backgroundColor: theme.palette.background.default,
        boxShadow: theme.shadows[5],
        [theme.breakpoints.down('sm')]: {
            padding: theme.spacing(2),
        },
    }));

    // Function to fetch activities from Firestore
    const fetchActivities = async () => {
        try {
            const activityCollection = collection(fsdb, 'clubactivities'); // Replace 'activities' with your collection name
            const activitySnapshot = await getDocs(activityCollection);

            let data = {};
            activitySnapshot.forEach((doc) => {
                data[doc.id] = doc.data(); // 'doc.id' is the activity name, 'doc.data()' contains the fields
            });
            setActivities(data);
            console.log(data);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching activities:', error);
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchActivities();
    }, []);

    return (
        <Box sx={{ padding: 3 }}>
            <Grid container spacing={3}>
                {/* Right Section: Activity Details */}
                <Grid item xs={12} sm={8}>
                    <Section>
                        <Typography variant="h6" sx={{ fontWeight: 'bold', marginBottom: 2 }}>
                            Club Activities
                        </Typography>
                        <Divider sx={{ marginBottom: 2 }} />
                        {Object.entries(activities).map(([activity, fields], index) => (
                            <Box key={index} sx={{ marginBottom: 3 }}>
                                <Typography variant="h6" sx={{ fontWeight: 'bold', marginBottom: 1 }}>
                                    {activity}
                                </Typography>
                                <Divider sx={{ marginBottom: 1 }} />
                                {Object.keys(fields).length === 0 ? (
                                    <Typography variant="body2" color="text.secondary">
                                        No activities available.
                                    </Typography>
                                ) : (
                                    Object.entries(fields).map(([field, details], i) => (
                                        <Section
                                            key={i}
                                            sx={{
                                                textAlign: 'left',
                                                marginBottom: 2,
                                            }}
                                        >
                                            <Typography variant="body1" sx={{ fontWeight: 'bolder' }}>
                                                {details[0]}
                                            </Typography>
                                            <Typography variant="body2" color="text.primary">
                                                Description: {details[1]}
                                            </Typography>
                                            <Typography variant="body2" color="text.secondary">
                                                Date: {details[2]}
                                            </Typography>
                                        </Section>
                                    ))
                                )}
                            </Box>
                        ))}
                    </Section>
                </Grid>

                <Grid item xs={12} sm={4}>
                    <Section>
                        <Typography variant="h6" sx={{ fontWeight: 'bold', marginBottom: 2 }}>
                           Clubs
                        </Typography>
                        <Divider sx={{ marginBottom:2}} />
                        <ul style={{ paddingLeft: '20px', lineHeight: 2, textAlign: 'left' }}>
                            {Object.keys(activities).map((activity, index) => (
                                <li key={index} style={{ fontWeight: 'bold' }}>
                                    {activity}
                                </li>
                            ))}
                        </ul>
                    </Section>
                </Grid>
            </Grid>
        </Box>
    );
};

export default ClubActivities;
