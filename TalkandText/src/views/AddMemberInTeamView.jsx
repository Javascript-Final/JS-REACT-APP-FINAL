import { Button, Grid, Paper, Select, InputLabel, FormControl, OutlinedInput, MenuItem, useTheme } from '@mui/material';
import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { addMember, getTeamsByUid } from '../services/teams-services';
import { getAllUsers } from '../services/user-service';

export const AddMemberInTeamView = () => {
    const [eligibleUsernames, setEligibleUsernames] = useState([])
    const [team, setTeam] = useState(null)
    const [usersToAdd, setUsersToAdd] = useState([])
    const { tid } = useParams();
    const theme = useTheme();
    const navigate = useNavigate()

    const ITEM_HEIGHT = 48;
    const ITEM_PADDING_TOP = 8;
    const MenuProps = {
      PaperProps: {
        style: {
          maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
          width: 250,
        },
      },
    };
  
    function getStyles(name, theme) {
      return {
        fontWeight:
          eligibleUsernames.indexOf(name) === -1
            ? theme.typography.fontWeightRegular
            : theme.typography.fontWeightMedium,
      };
    }


    const handleChange = (event) => {
        const { target: { value } } = event;
        setUsersToAdd(
            typeof value === 'string' ? value.split(',') : value
        )

    }
    
    const addMembers = async () => {
        for(const username of usersToAdd) {
           (async () => { await addMember(username, tid)})()
        }
        await usersToAdd.reduce(async (prev, username) => {
            await prev;
            return addMember(username, tid)
        }, Promise.resolve())
        navigate(`../single-team-view/${tid}`)
    }

    useEffect(() => {
        (async () => {
            const teamData = await getTeamsByUid(tid)
            setTeam(teamData)
            const allUsers = await getAllUsers()
            const eligibleUsernames = allUsers.map((user) => user.username).filter((username) => !teamData.members.includes(username))
            setEligibleUsernames(eligibleUsernames)
        })();
    }, [])

    return (
        <Grid container  mt={12}>
            <Paper>
            <Grid item xs={12} p={0}>
                <Grid container p={1}>
                    <FormControl sx={{ width: 463 }}>
                        <InputLabel id="add-members-label" >Add Members</InputLabel>
                        <Select
                            labelId="add-members-label"
                            id="add-members-select"
                            multiple
                            value={usersToAdd}
                            onChange={handleChange}
                            input={<OutlinedInput label="Name" />}
                            MenuProps={MenuProps}
                        >
                            {eligibleUsernames.map((username) => {
                                return <MenuItem
                                    key={username}
                                    value={username}
                                    style={getStyles(username, theme)}
                                >
                                    {username}
                                </MenuItem>
                            })}
                        </Select>
                    </FormControl>
                </Grid>
            </Grid>
            <Grid container p={1}>
                <Grid item xs={12} p={0}>
                  <Button variant="contained" color="secondary" fullWidth onClick={addMembers}>
                    { `Add Member(s) to ${team?.name}` }
                  </Button>
                </Grid>
              </Grid>
            </Paper>
        </Grid>
    )
}