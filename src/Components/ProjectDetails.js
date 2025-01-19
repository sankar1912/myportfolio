import React, { useState, useEffect } from 'react';
import { useCookies } from 'react-cookie';
import { getFirestore, doc, getDoc } from 'firebase/firestore';
import { Box, Paper, Typography, Button, Grid, Divider } from '@mui/material';
import { styled } from '@mui/system';

const ProjectDetails = ({ navigate }) => {
    const [cookies, setCookies, removeCookies] = useCookies(['projectName', 'title']);
    const [projectDetails, setProjectDetails] = useState(null);
    const firestore = getFirestore();

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

    useEffect(() => {
        const fetchProjectDetails = async () => {
            if (cookies.projectName) {
                try {
                    const docRef = doc(firestore, 'projects', cookies.projectName);
                    const docSnap = await getDoc(docRef);

                    if (docSnap.exists()) {
                        setProjectDetails(docSnap.data());
                        console.log(docSnap.data());
                    } else {
                        console.log('No such project!');
                        setProjectDetails(null);
                    }
                } catch (error) {
                    console.error('Error fetching project details:', error);
                }
            }
        };

        fetchProjectDetails();
    }, [cookies.projectName, firestore]);

    if (!projectDetails) {
        return <div>Loading project details...</div>;
    }

    return (
        <Box sx={{ padding: 3 }}>
            <Typography variant="h4" gutterBottom align="center" sx={{ fontWeight: 'bold' }}>
                Project Details: {cookies.projectName}
            </Typography>
            <Grid container spacing={4}>
                <Grid item xs={12} sm={8}>
                    <Section sx={{ height: '90%', overflow: 'hidden' }}>
                        <Section>
                            <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                                Project Title
                            </Typography>
                            <Typography variant="body1" color="text.secondary" sx={{ marginTop: 1 }}>
                                {projectDetails.title}
                            </Typography>
                        </Section>

                        <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                            Project Description
                        </Typography>
                        <Typography variant="body1" color="text.secondary" sx={{ marginTop: 1, textAlign: 'justify' }}>
                            {projectDetails.description || 'No description provided.'}
                        </Typography>

                    </Section>

                </Grid>
                <Grid item xs={12} sm={4}>
                    <Section sx={{ height: '90%', overflow: 'hidden' }}>
                        {projectDetails.photo && (
                            <img
                                src={projectDetails.photo}
                                alt="Project"
                                style={{
                                    width: '100%', // Make the image responsive
                                    height: 'auto',
                                    borderRadius: '10px',
                                    objectFit: 'fill'
                                }}
                            />
                        )}
                    </Section>

                </Grid>
            </Grid>
            <Grid container spacing={4}>
                <Grid item xs={12} sm={8}>
                    {projectDetails.timeline && (
                        <Section>
                            <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                                Project Timeline
                            </Typography>
                            <Typography variant="body1" color="text.secondary" sx={{ marginTop: 1 }}>
                                {projectDetails.timeline}
                            </Typography>
                        </Section>
                    )}

                    <Section>
                        <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                            Additional Information
                        </Typography>
                        <Typography variant="body1" color="text.secondary" sx={{ marginTop: 1, textAlign: 'justify' }}>
                            {projectDetails.additionalinfo || 'No additional information.'}
                        </Typography>
                    </Section>
                </Grid>

                <Grid item xs={12} sm={4}>
                    <Section sx={{ padding: 3 }}>
                        <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                            Project Links
                        </Typography>
                        <Divider sx={{ marginY: 2 }} />

                        <Button
                            variant="contained"
                            color="primary"
                            sx={{ width: '100%', marginBottom: 2 }}
                            onClick={() => window.open(projectDetails.repoLink, '_blank')}
                            disabled={!projectDetails.repoLink}
                        >
                            View Project Repository
                        </Button>
                        <Button
                            variant="outlined"
                            color="secondary"
                            sx={{ width: '100%' }}
                            onClick={() => window.open(projectDetails.liveLink, '_blank')}
                            disabled={!projectDetails.liveLink}
                        >
                            Visit Live Project
                        </Button>

                        {projectDetails.teammates && (
                            <>
                                <Typography variant="h6" sx={{ fontWeight: 'bold', marginTop: 3 }}>
                                    Teammates
                                </Typography>
                                <Divider sx={{ marginY: 2 }} />

                                <div style={{ textAlign: 'left' }}>
                                    <ul id="teamid">
                                        {projectDetails.teammates.split(',').map((teammate, index) => (
                                            <li key={index}>
                                                {teammate.trim()}
                                                {index < projectDetails.teammates.split(',').length - 1 && ', '}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </>
                        )}
                        <Typography variant="h6" sx={{ fontWeight: 'bold', marginTop: 3 }}>
                            Guidance
                        </Typography>
                        <Divider sx={{ marginY: 2 }} />

                        <div style={{ textAlign: 'left' }}>
                            {projectDetails.guidance}
                        </div>

                    </Section>
                </Grid>

            </Grid>
        </Box>
    );
};

export default ProjectDetails;
