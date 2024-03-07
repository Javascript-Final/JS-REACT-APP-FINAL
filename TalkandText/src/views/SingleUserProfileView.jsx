import { useContext, useEffect, useState } from "react"
import { AppContext, useAppContext } from "../context/AppContext";
import { Avatar, Grid, Paper, Container, TextField, Button } from '@mui/material';
import Stack from '@mui/material/Stack';
import { useParams, useNavigate } from "react-router-dom";
import { getUserByUid } from "../services/user-service";

import { getTeamsByUserUid } from "../services/teams-services";
import ChatView from "./Chat";

export const SingleUserProfileView = () => {
    const navigate = useNavigate();
    const { uid } = useParams()
    const [userProfileData, setUserData] = useState(null)
    const {userData} = useAppContext();


    function handleSendDm() {
        const channelTitle = [userProfileData?.username, userData?.username].sort().join('+');
        navigate(`/chat/${channelTitle}`);
    }
  

    useEffect(() => {
        (async () => {
            const userProfile = await getUserByUid(uid)
            setUserData(userProfile)
        })()
    }, [])

    // const handleSendDm = () => {
    //     const channelTitle = [userData?.username, userData?.authenticatedUser].sort().join('+');
        
    //     return ChatView({ channelTitle })
    // }

    return (
        <Container sx={{ mt: 6 }}>
            <Grid container spacing={6}>
                <Grid item xs={3}>
                    <Avatar p={2} sx={{ height: '220px', width: '220px', background: "rgb(240, 240, 240)" }} alt="User Avatar" src={userProfileData?.avatarUrl} />
                    <TextField
                        margin="normal"
                        required
                        id="handle"
                        label="Handle"
                        name="handle"
                        disabled
                        value={userProfileData?.username}
                        fullWidth
                        InputLabelProps={{ shrink: true }}
                    />
                </Grid>
                <Grid item xs={9}>
                    <Paper>
                        <Grid container p={3}>
                            <Grid item xs={6} p={4}>
                                <TextField
                                    margin="normal"
                                    required
                                    id="firstName"
                                    label="First Name"
                                    disabled
                                    value={userProfileData?.firstName}
                                    fullWidth
                                    InputLabelProps={{ shrink: true }}
                                />
                            </Grid>
                            <Grid item xs={6} p={4}>
                                <TextField
                                    margin="normal"
                                    required
                                    id="lastName"
                                    label="Last Name"
                                    name="lastName"
                                    disabled
                                    value={userProfileData?.lastName}
                                    fullWidth
                                    InputLabelProps={{ shrink: true }}
                                />
                            </Grid>
                            <Grid item xs={6} p={4}>
                                <Button variant="contained" color="success" fullWidth onClick={handleSendDm}>
                                    Send a DM
                                </Button>
                            </Grid>
                            <Grid item xs={6} p={4}>
                                <Button variant="contained" color="primary" fullWidth>
                                    Add to team
                                </Button>
                            </Grid>
                        </Grid>
                    </Paper>
                </Grid>
            </Grid>
        </Container>
    )
}