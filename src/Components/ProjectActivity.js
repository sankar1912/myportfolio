import React, { useEffect, useState } from 'react';
import { Box, Typography, Paper, Button, CircularProgress } from '@mui/material';
import { getFirestore, collection, getDocs, doc, getDoc } from 'firebase/firestore';
import { WorkspacePremium } from '@mui/icons-material';
import { useCookies } from 'react-cookie';

const ProjectActivity = ({navigate}) => {
  const [projects, setProjects] = useState([]);
  const firestore = getFirestore();
  const[cookies,setCookies,removeCookies]=useCookies(['projectName','title']);
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const querySnapshot = await getDocs(collection(firestore, 'projects'));
        const projectData = [];
        for (const docSnap of querySnapshot.docs) {
          const projectName = docSnap.id;
          const projectRef = doc(firestore, 'projects', projectName); 
          const projectDoc = await getDoc(projectRef);

          if (projectDoc.exists()) {
            const description = projectDoc.data().description; 
            const title=projectDoc.data().title;
            projectData.push({ projectName, description, title});
          }
        }

        setProjects(projectData);
      } catch (error) {
        console.error('Error fetching projects:', error);
      }
    };

    fetchProjects();
  }, [firestore]);

  return (
    <Box padding={2} sx={{ fontFamily: 'Poppins' }}>
      <Typography variant="h4" gutterBottom>
        My Projects
      </Typography>
      {projects.length > 0 ? (
        projects.map((project, index) => (
          <Paper key={index} elevation={3} sx={{ padding: 2, marginBottom: 2,borderRadius:'35px' }}>
            <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
              {project.projectName}<br/>
              {project.title}
            </Typography>
            <Typography variant="body1" sx={{ marginTop: 3,padding:1,textAlign:'justify' ,wordSpacing:2,    }}>
                Description:<br/>

              {project.description || 'No description available.'}
            </Typography>
            <br/>
            <br/>
            <Button
          variant="contained"
          color="primary"
          startIcon={<WorkspacePremium />}
          sx={{
            borderRadius: '20px',
            textTransform: 'none',
            padding: '10px 20px',
          }}
          onClick={() => {
            navigate('/projectdetails');
            setCookies('projectName',project.projectName,{path:'/'});
            setCookies('title',project.title,{path:'/'});
          }}
         
        >
          View Details
        </Button>
          </Paper>
        ))
      ) : (
        <CircularProgress />
      )}
    </Box>
  );
};

export default ProjectActivity;
