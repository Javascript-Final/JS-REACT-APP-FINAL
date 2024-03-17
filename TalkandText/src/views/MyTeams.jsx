import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { useLocation, useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useAppContext } from '../context/AppContext';
import { getOwnedTeamsFor, getTeamsByUid } from '../services/teams-services';
import GroupIcon from '@mui/icons-material/Group';
import { getChannelsByTid } from '../services/channel-service';
import TeamView from './TeamView';
import SingleTeamView from './SingleTeamView';



const drawerWidth = 240;

export default function TeamsView() {
  const { userData } = useAppContext();
  const [teamsData, setTeamsData] = useState([]);
  const [channels, setChannels] = useState([]);
  const [selectedTeam, setSelectedTeam] = useState(null);
  const navigate = useNavigate();

    
   const { tid } = useParams();
  
  useEffect(() => {
    
    (async () => {
    
      if (!userData) return;
      const teamsData = await getOwnedTeamsFor(userData?.username);
      console.log(teamsData);
      setTeamsData(teamsData);
      // const channels = await getChannelsByTid(tid);

      setChannels(channels);
    })()
  }, []);


    // show user teams 
  
  return (
  
    <Box sx={{ display: 'flex' }}>
      {/* Rest of the code */}
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
        variant="permanent"
        anchor="left"
      >
        <Toolbar />
        <Divider />
        <List>
          {/* Генерираме ListItem за всеки отбор от вашия списък */}
          {teamsData.map((team) => (
            console.log(team.tid),
            <ListItem key={team.tid} disablePadding>
              <ListItemButton
                onClick={() => {
                  setSelectedTeam(team.tid)
                navigate(`/single-team-view/${team.tid}`)
                }

                } 
                
                
                sx={{
                  backgroundColor: selectedTeam === team.tid ? '#5CB1F2' : 'inherit',
                }}
              >
                <ListItemIcon>
                  <GroupIcon/>
                </ListItemIcon>
                <ListItemText primary={team.name} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        <Divider />
       {/*  <List>
          {/* Show channels related to the selected team */}
          {/* {channels.map((channel) => (
            <ListItem key={channel.cid} disablePadding>
              <ListItemButton>
                <ListItemText primary={channel.name} />
              </ListItemButton>
            </ListItem>
          ))} */
       }
      </Drawer>
      <Box
                component="main"
                sx={{ flexGrow: 1, bgcolor: 'background.default', p: 3 }}
            >
                <Toolbar />
            </Box>
      {selectedTeam && <SingleTeamView style = {{paddingTop: "100px"}} tid={selectedTeam} />}
    </Box>
  );
}
