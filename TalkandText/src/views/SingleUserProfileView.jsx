import { useContext, useEffect, useState } from "react"
import { AppContext } from "../context/AppContext";
import { Avatar, Grid, Paper, Container, TextField, Button } from '@mui/material';
import Stack from '@mui/material/Stack';
import { useParams } from "react-router-dom";
import { getUserByUid } from "../services/user-service";
import { getTeamsByUserUid } from "../services/teams-services";

export const SingleUserProfileView = () => {
    const { uid } = useParams()
    const [userData, setUserData] = useState(null)
  

    useEffect(() => {
        (async () => {
            const userProfile = await getUserByUid(uid)
            setUserData(userProfile)
        })()
    }, [])

    return (
        <Container sx={{ mt: 6 }}>
            <Grid container spacing={6} sx={{ pt: 8 }}>
                <Grid item xs={3}>
                    <Avatar p={2} sx={{ height: '220px', width: '220px', background: "rgb(240, 240, 240)" }} alt="User Avatar" src={userData?.avatarUrl} />
                    <TextField
                        margin="normal"
                        required
                        id="handle"
                        label="Handle"
                        name="handle"
                        disabled
                        value={userData?.username}
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
                                    value={userData?.firstName}
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
                                    value={userData?.lastName}
                                    fullWidth
                                    InputLabelProps={{ shrink: true }}
                                />
                            </Grid>
                            <Grid item xs={6} p={4}>
                                <Button variant="contained" color="success" fullWidth>
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