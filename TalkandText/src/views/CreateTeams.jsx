import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import { createTeam, getTeamsByUid } from '../services/teams-services';
import { Button, Grid, Paper, TextField, Container } from '@mui/material';


function CreateTeams() {
  const [teamName, setTeamName] = useState('');
  const navigate = useNavigate();
  const { userData } = useContext(AppContext);

  useEffect(() => {
    (async () => {
      if (!userData) return;
      setTeamName(await getTeamsByUid())
    })()
    },[userData])



  const handleCreateTeam = async () => {
    try {

      if (teamName.length < 3 || teamName.length > 40) {
        setError("Team name must be between 3 and 40 characters long!");
        return;
      }
      const newTeam = await createTeam(teamName, userData.uid);
      // const teamsRef = ref(db, 'teams/'); // Взимаме референция към колекцията 'teams'.
      const teamData = await getTeamsByUid(newTeam);
      // console.log(teamData);

      navigate(`/my-teams`, { state: { teamData } });

    } catch (error) {
      console.error('Error creating team:', error);
    }
  };


  return (
    <div>
      <Container sx={{ mt: 6 }}>
        <Grid container spacing={3} sx={{ pt: 8 }}>
          <Grid item xs={6} p={1}>
            <Paper>
              <Grid container p={1}>
                <Grid item xs={12} p={0}>
                  <TextField
                    margin="normal"
                    required
                    id="team-name"
                    label="Team Name"
                    fullWidth
                    InputLabelProps={{ shrink: true }}
                    value={teamName}
                    onChange={(e) => setTeamName(e.target.value)}
                    placeholder="Enter team name"
                  />
                </Grid>
              </Grid>
              <Grid container p={1}>
                <Grid item xs={12} p={0}>
                  <Button variant="contained" color="success" fullWidth onClick={handleCreateTeam}>
                    Create a New Team
                  </Button>
                </Grid>
              </Grid>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}

  export default CreateTeams;