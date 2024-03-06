import { useContext, useEffect, useState } from "react"
import { AppContext } from "../context/AppContext";
import { Avatar, Grid, Paper, Container, TextField, Button } from '@mui/material';
import Stack from '@mui/material/Stack';
import { useParams } from "react-router-dom";
import { getUserByUid } from "../services/user-service";

export const SingleUserProfileView = () => {
    const { uid } = useParams()
    const [userData, setUserData] = useState(null)

    useEffect(() => {
        (async () => {
            const userProfile = await getUserByUid(uid)
            setUserData(userProfile)
        })()
    }, [])

    // console.log(userData)
    // debugger
    // const { user, userData, setContext } = useContext(AppContext);

    // const [form, setForm] = useState({
    //     firstName: userData?.firstName,
    //     lastName: userData?.lastName,
    //     phoneNumber: userData?.phoneNumber,
    // });

    // useEffect(() => {
    //     if (!userData) return;
    //     const { firstName, lastName, phoneNumber } = userData
    //     if (firstName && lastName && phoneNumber) {
    //         setForm({ firstName, lastName, phoneNumber })
    //     }
    // }, [user])

    return (
        <Container sx={{ mt: 6 }}>
            <Grid container spacing={6}>
                <Grid item xs={3}>
                    <Avatar p={2} sx={{ height: '220px', width: '220px', background: "rgb(240, 240, 240)" }} alt="User Avatar" src={userData?.avatarUrl} />
                </Grid>
                <Grid item xs={3} p={2}>
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
                            <Grid item xs={4} p={2}>
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
                            <Grid item xs={4} p={2}>
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
                            <Grid item xs={4} p={2}>
                                <Stack direction="row" spacing={2}>
                                    <Button variant="contained" color="success">
                                        Send a DM
                                    </Button>
                                    <Button variant="contained" color="primary">
                                        Add to team
                                    </Button>
                                </Stack>
                            </Grid>
                        </Grid>
                    </Paper>
                </Grid>
            </Grid>
        </Container>
    )
}
