import PropTypes from 'prop-types';
import { Grid, ListItemText, ListItemButton, Box, Drawer, CssBaseline, Toolbar, List, Typography, ListItem, Avatar } from '@mui/material';
import { useEffect, useState, useContext } from 'react';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import { useParams, useNavigate } from 'react-router-dom';
import { getChannelsByTid } from '../services/channel-service';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import CallIcon from '@mui/icons-material/Call';
import { getTeamsByUid, getTeamMembers, removeMember } from '../services/teams-services';
import ChannelView from './ChannelView/ChannelView';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import PersonIcon from '@mui/icons-material/Person';
import PersonRemoveAlt1Icon from '@mui/icons-material/PersonRemoveAlt1';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import { getUserByHandle } from '../services/user-service';
import { AppContext } from '../context/AppContext';
import { X } from '@mui/icons-material';


function SingleTeamView() {
    const [selectedChannel, setSelectedChannel] = useState(null);
    const [selectedTeamMember, setSelectedTeamMember] = useState(null);
    const [team, setTeam] = useState([]);
    const [channels, setChannels] = useState([]);
    const [membersInTeam, setMembersInTeam] = useState([])
    const [membersUserData, setMembersUserData] = useState([])
    const { user, userData, setContext } = useContext(AppContext)

    const { tid } = useParams();

    const navigate = useNavigate();

    useEffect(() => {
        (async () => {
            const team = await getTeamsByUid(tid);
            setTeam(team)
            const channels = await getChannelsByTid(tid)
            setChannels(channels)
            const members = team.members;
            setMembersInTeam(members)
            const memberCalls = (await Promise.all(members.map(async (memberName) => (await getUserByHandle(memberName)))))
            const memberUserData = memberCalls.map((snapshot) => snapshot.val())
            setMembersUserData(memberUserData)
        })()
    }, []);

    const drawerWidth = 240;

    const loggedInAsOwner = () => userData.username === team.owner

    const tryToRemoveMember = (member) => {
        return (e) => {
            debugger
            e.stopPropagation()
            removeMember(member, tid)
            setMembersUserData(membersUserData.filter((x) => x.username !== member.username))
        }
    }

    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <Drawer
                variant="permanent"
                anchor="left"
                sx={{
                    width: drawerWidth,
                    flexShrink: 0,
                    [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' },
                }}
            >
                <Toolbar />
                {/* [TODO] Make the call button work*/}
                <Typography p={"20px"}>Channels in {team.name}</Typography>
                <List>
                    <AddCircleOutlineIcon onClick={() => { navigate('/create-channel') }} sx={{ marginLeft: "16px", cursor: "pointer" }} />
                    <CallIcon sx={{ marginLeft: "20px" }} />
                    {channels.map((channel) => (
                        <ListItem key={channel.cid} disablePadding>
                            <ListItemButton
                                onClick={() => setSelectedChannel(channel.cid)}
                                sx={{
                                    backgroundColor: selectedChannel === channel.cid ? '#5CB1F2' : 'inherit',
                                }}
                            >
                                {/* <PeopleAltIcon sx={{ marginRight: "10px" }} /> */}
                                <ListItemText primary={channel.channelTitle} sx={{ overflowX: "hidden" }} />
                            </ListItemButton>
                        </ListItem>
                    ))}
                </List>
            </Drawer>

            {/* <Box
                component="main"
                sx={{ flexGrow: 1, bgcolor: 'background.default', p: 3 }}
            >
                <Toolbar />
            </Box> */}
            <Grid container>
                <Grid item xs={12}>
                    <Box alignContent={"center"} alignItems={"center"}>
                        {selectedChannel && <ChannelView style={{ paddingTop: "100px" }} cid={selectedChannel} />}
                    </Box>
                </Grid>
            </Grid>
            <Drawer
                variant="permanent"
                anchor="right"
                sx={{
                    width: drawerWidth,
                    flexShrink: 0,
                    [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' },
                }}
            >
                <Toolbar />
                <Typography p={"20px"}>Members in {team.name}</Typography>
                {/* [TODO] Make the add member and remove member button work*/}
                <List>
                    {loggedInAsOwner() && <>
                        <PersonAddIcon sx={{ marginLeft: "20px" }} />
                        <PersonRemoveAlt1Icon sx={{ marginLeft: "20px" }} />
                    </>}
                    {membersUserData.map((member) => (
                        <ListItem key={member.uid} disablePadding>
                            <ListItemButton
                                onClick={() => navigate(`../single-profile-view/${member.uid}`)}
                                sx={{
                                    backgroundColor: selectedTeamMember === member ? '#5CB1F2' : 'inherit',
                                }}
                            >
                                <Avatar alt={`${member.firstName}'s avatar`} src={member.avatarUrl} />
                                <ListItemText primary={member.username} />
                                {loggedInAsOwner() && team.owner !== member.username && <PersonRemoveAlt1Icon onClick={tryToRemoveMember(member)} />}
                            </ListItemButton>
                        </ListItem>
                    ))}
                </List>
                <RemoveCircleIcon sx={{ marginLeft: "17px" }} />
            </Drawer>
        </Box>
    );
}

export default SingleTeamView;

SingleTeamView.propTypes = {
    teamName: PropTypes.string,
}