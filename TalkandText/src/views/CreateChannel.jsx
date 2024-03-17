import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { createChannel, getAllChannels } from "../services/channel-service";
import { useContext } from "react";
import { AppContext } from "../context/AppContext";
import { Button, Grid, Paper, TextField, Container, Autocomplete } from '@mui/material';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import { getOwnedTeamsFor, getTeamsByUserUid } from "../services/teams-services";


export default function CreateChannel(tid) {
  const [form, setForm] = useState({
    channelTitle: "",
    channelPrivacy: "public",
    tid: null,
  });

  const { userData } = useContext(AppContext);
  const [userTeams, setUserTeams] = useState([]);
  const [channelExists, setChannelExists] = useState(false); // New state variable

  useEffect(() => {
    (async () => {
      if (!userData) return;
      setUserTeams(await getOwnedTeamsFor(userData?.username));
    })();
  }, [userData]);

  useEffect(() => {
    setChannelExists(false); // Reset channelExists when channelTitle or tid changes
  }, [form.channelTitle, form.tid]);

  const [error, setError] = useState("");
  const navigate = useNavigate();

  const updateForm = (prop) => (e, autocompleteValue) => {
    if (prop === "tid" && autocompleteValue) {
      setForm({ ...form, [prop]: autocompleteValue.value });
    } else {
      setForm({ ...form, [prop]: e.target.value });
    }
    setError("");
  };

  const doesChannelExist = async (channelTitle, tid) => {
    const channels = await getAllChannels();
    return channels.some(channel => channel.channelTitle === channelTitle && channel.tid === tid);
  };

  const create = async () => {
    if (form.channelTitle.length < 3 || form.channelTitle.length > 40) {
      setError("Channel title must be between 3 and 40 characters long!");
      return;
    }

    const doesExist = await doesChannelExist(form.channelTitle, form.tid);
    if (doesExist) {
      setChannelExists(true); // Set channelExists to true if channel already exists
      return;
    }

    try {
      const username = userData?.username;

      await createChannel(form.channelTitle, form.channelPrivacy, username, form.tid);
      console.log(`Channel ${form.channelTitle} created! You are the first participant!`);
      navigate("/");
    } catch (error) {
      console.log(error.message);
    }
  };

  const userTeamItems = () => {
    return userTeams.map((team) => ({ label: team.name, value: team.tid }));
  };

  return (
    <div>
      <Container sx={{ mt: 6 }}></Container>
      <Container sx={{ mt: 6 }}>
        <Grid container spacing={3} sx={{ pt: 8 }}>
          <Grid item xs={6} p={1}>
            <Paper>
              <Grid container p={1}>
                <Grid item xs={12} p={0}>
                  {channelExists && ( // Render error message if channelExists is true
                    <div style={{ color: "red", textAlign: "center" }}>
                      A channel with this title already exists in this team!
                    </div>
                  )}
                  <TextField
                    margin="normal"
                    required
                    id="channel-title"
                    label="Channel Title"
                    fullWidth
                    InputLabelProps={{ shrink: true }}
                    value={form.channelTitle}
                    onChange={updateForm("channelTitle")}
                    placeholder="Enter channel title"
                  />
                </Grid>
              </Grid>
              <Grid container p={1}>
                <Grid item xs={12} p={0}>
                  <FormControl>
                    <FormLabel id="demo-row-radio-buttons-group-label">Privacy:</FormLabel>
                    <RadioGroup
                      row
                      aria-labelledby="demo-row-radio-buttons-group-label"
                      name="row-radio-buttons-group"
                    >
                      <FormControlLabel
                        value="private"
                        control={<Radio />}
                        label="Private"
                        checked={form.channelPrivacy === "private"}
                        onChange={updateForm("channelPrivacy")}
                      />
                      <FormControlLabel
                        value="public"
                        control={<Radio />}
                        label="Public"
                        checked={form.channelPrivacy === "public"}
                        onChange={updateForm("channelPrivacy")}
                      />
                    </RadioGroup>
                  </FormControl>
                </Grid>
              </Grid>
              <Grid item p={1}>
                <Autocomplete
                  disablePortal
                  id="team-select"
                  options={userTeamItems(userTeams)}
                  getOptionLabel={(option) => option.label}
                  isOptionEqualToValue={(option, value) => option.value === value.value}
                  onChange={updateForm("tid")}
                  renderInput={(params) => <TextField {...params} label="Team" />}
                />
              </Grid>
              <Grid container p={1}>
                <Grid item xs={12} p={0}>
                  <Button variant="contained" color="secondary" fullWidth onClick={create}>
                    Create a New Channel
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
