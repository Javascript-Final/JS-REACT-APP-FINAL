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
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';

function SingleTeamView() {

    const [team, setTeam] = useState();

    const { teams } = useContext(AppContext);

    const drawerWidth = 240;

        return (
            <Box sx={{ display: 'flex' }}>
                <CssBaseline />
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
                    <Toolbar /> {/* [TODO] Add button that would navigate to create team and a "Call now" button that won't work */}
                    <Divider />
                    <List>
                        {/* [TODO] Get all channels for the team. I can start by mocking the data if we can't fix the db */}
                        {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => ( 
                            <ListItem key={text} disablePadding>
                                <ListItemButton>
                                    <PeopleAltIcon />
                                    {/* {index % 2 === 0 ? <InboxIcon /> : <MailIcon />} */}
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