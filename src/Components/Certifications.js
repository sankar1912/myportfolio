import React, { useEffect, useState } from 'react';
import { Paper, Box, Grid, styled, Typography, Divider, Button, IconButton } from '@mui/material';
import { getFirestore, collection, getDocs } from 'firebase/firestore';
import fsdb from '../firebase';
import DownloadIcon from '@mui/icons-material/Download'; 

const Certifications = () => {
    const [certifications, setCertifications] = useState({});
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

    const fetchCertifications = async () => {
        try {
            const certCollection = collection(fsdb, 'certificates');
            const certSnapshot = await getDocs(certCollection);

            let data = {};
            certSnapshot.forEach(doc => {
                data[doc.id] = doc.data(); // 'doc.id' is the platform name, 'doc.data()' contains the courses
            });
            setCertifications(data);
            console.log(data);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching certifications:', error);
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCertifications();
    }, []);

    return (
        <Box sx={{ padding: 3 }}>
            <Grid container spacing={3}>
                {/* Right Section: Certification Details */}
                <Grid item xs={12} sm={8}>
                    <Section>
                        <Typography variant="h6" sx={{ fontWeight: 'bold', marginBottom: 2 }}>
                            Certifications
                        </Typography>
                        <Divider sx={{ marginBottom: 2 }} />
                        {Object.entries(certifications).map(([platform, certifications], index) => (
                            <Box key={index} sx={{ marginBottom: 3 }}>
                                <Typography variant="h6" sx={{ fontWeight: 'bold', marginBottom: 1 }}>
                                    {platform}
                                </Typography>
                                <Divider sx={{ marginBottom: 1 }} />
                                {Object.keys(certifications).length === 0 ? (
                                    <Typography variant="body2" color="text.secondary">
                                        No certifications available.
                                    </Typography>
                                ) : (
                                    Object.entries(certifications).map(([course, details], i) => (
                                        <Grid container>
                                            <Grid item xs={12} sm={12}>
                                                <Section
                                                    key={i}
                                                    sx={{ textAlign: 'left' }}
                                                >
                                                    <Typography variant="body1" sx={{ fontWeight: 'bolder' }}>
                                                        {details[0]} 
                                                    </Typography>
                                                    <Typography variant="body2" color="text.primary">
                                                        Completion Date: {details[1]} {/* Date */}
                                                    </Typography>
                                                    <Typography variant="body2" color="text.secondary">
                                                        {details[2]}
                                                    </Typography>
                                                    {/* Download Button */}
                                                    {details[3] && (
                                                        <IconButton variant="contained"
                                                            color="primary"
                                                            size="small"
                                                            sx={{ marginTop: 1 }}
                                                            startIcon={<DownloadIcon />}
                                                            href={details[3]} // Use the URL from details[3]
                                                            download  >
                                                            <DownloadIcon>
                                                                Download
                                                            </DownloadIcon>
                                                        </IconButton>
                                                    )}
                                                    <Section>
                                                        <img src={details[3]} style={{ height: '100%', width: '100%', filter: 'blur(5px)' }} alt="certicate_image" />
                                                    </Section>
                                                </Section>

                                            </Grid>

                                        </Grid>
                                    ))
                                )}
                            </Box>
                        ))}
                    </Section>
                </Grid>

                {/* Left Section: Platforms */}
                <Grid item xs={12} sm={4}>
                    <Section>
                        <Typography variant="h6" sx={{ fontWeight: 'bold', marginBottom: 2 }}>
                            Platforms where I have Certificates
                        </Typography>
                        <Divider sx={{ marginBottom: 2 }} />
                        <ul style={{ paddingLeft: '20px', lineHeight: 2, textAlign: 'left' }}>
                            {Object.keys(certifications).map((platform, index) => (
                                <li key={index} style={{ fontWeight: 'bold' }}>
                                    {platform}
                                </li>
                            ))}
                        </ul>
                    </Section>
                </Grid>
            </Grid>
        </Box>
    );
};

export default Certifications;
