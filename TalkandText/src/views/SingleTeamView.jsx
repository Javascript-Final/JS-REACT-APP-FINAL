import React from 'react'
import CreateTeams from './CreateTeams'
import { db } from '../config/firebase-config';
import { get, ref, query, orderByChild, equalTo } from "firebase/database";
import PropTypes from 'prop-types';
import { useEffect, useState, useContext } from 'react';
import { AppContext } from '../context/AppContext';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
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
import ListItemText from '@mui/material/ListItemText';
import { useParams } from 'react-router-dom';
import { getChannelsByTid } from '../services/channel-service';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import CallIcon from '@mui/icons-material/Call';

function SingleTeamView() {

    const [team, setTeam] = useState();
    const [channels, setChannels] = useState();

    const { tid } = useParams();

    useEffect(() => {
        (async () => {
            const team = await getTeamsByUid(tid);
            setTeam(team)
            setChannels(await getChannelsByTid(tid))
        })
    })

    const channelsInTeam = () => { 
        return channels.map((channel) => ({ label: channel.channeTitle, value: channel.cid }))
    }

    const drawerWidth = 240;

    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <Drawer
                variant="permanent"
                sx={{
                    width: drawerWidth,
                    flexShrink: 0,
                    [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' },
                }}
            >
                <Toolbar />
                   {/* [TODO] Make these buttons work*/}
                <List>
                    <AddCircleOutlineIcon sx={{ marginLeft: "16px"}}/>
                    <CallIcon sx={{ marginLeft: "20px"}}/>
                    {/* [TODO] Get all channels for the team. I can start by mocking the data if we can't fix the db */}
                    {['channel', 'channel 1', 'channel 2'].map((text) => (
                        <ListItem key={text} disablePadding>
                            <ListItemButton>
                                <PeopleAltIcon sx={{ marginRight: "10px" }} />
                                <ListItemText primary={text} />
                            </ListItemButton>
                        </ListItem>
                    ))}
                </List>
            </Drawer>
            <Box
                component="main"
                sx={{ flexGrow: 1, bgcolor: 'background.default', p: 3 }}
            >
                <Toolbar />
            </Box>
        </Box>
    );
}

export default SingleTeamView

SingleTeamView.propTypes = {
    teamName: PropTypes.string,
}
// displays all chanells in this team