import React from 'react';
import CreateTeams from './CreateTeams';
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
import { getTeamsByUid } from '../services/teams-services';
import ChannelView from './ChannelView/ChannelView';
import { NavLink, useNavigate } from "react-router-dom"

function SingleTeamView() {
    const [selectedChannel, setSelectedChannel] = useState(null);
    const [team, setTeam] = useState();
    const [channels, setChannels] = useState([]);

    const { tid } = useParams();

    const navigate = useNavigate();

    useEffect(() => {
        (async () => {
            const team = await getTeamsByUid(tid);
            setTeam(team)
            const channels = await getChannelsByTid(tid)
            setChannels(channels)
        })()
    }, []);

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
                {/* [TODO] Make the call button work*/}
                <List>
                    <AddCircleOutlineIcon onClick={() => { navigate('/create-channel')}} sx={{ marginLeft: "16px", cursor: "pointer"}}/>
                    <CallIcon sx={{ marginLeft: "20px"}}/>
                    {channels.map((channel) => (
                        <ListItem key={channel.cid} disablePadding>
                            <ListItemButton
                                onClick={() => setSelectedChannel(channel.cid)}
                                sx={{
                                    backgroundColor: selectedChannel === channel.cid ? '#5CB1F2' : 'inherit',
                                }}
                            >
                                <PeopleAltIcon sx={{ marginRight: "10px" }} />
                                <ListItemText primary={channel.channelTitle} />
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
            {selectedChannel && <ChannelView style = {{paddingTop: "100px"}} cid={selectedChannel} />}
        </Box>
    );
}

export default SingleTeamView;

SingleTeamView.propTypes = {
    teamName: PropTypes.string,
}