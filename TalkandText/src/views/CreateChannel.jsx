import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createChannel } from "../services/channel-service";
import { useContext } from "react";
import { AppContext } from "../context/AppContext";
import { Button, Grid, Paper, TextField, Container } from '@mui/material';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';

export default function CreateChannel() {
  const [form, setForm] = useState({
    channelTitle: "", 
    channelPrivacy: "public",
  });
  const { userData } = useContext(AppContext);

  const [error, setError] = useState("");
  const navigate = useNavigate();

  const updateForm = (prop) => (e) => {
    setForm({ ...form, [prop]: e.target.value });
    setError("");
  };

  const create = async () => {
    if (form.channelTitle.length < 3 || form.channelTitle.length > 40) {
      setError("Channel title must be between 3 and 40 characters long!");
      return;
    }

    try {
      const username = userData?.username;
      await createChannel(form.channelTitle, form.channelPrivacy, username);
      console.log(`Channel ${form.channelTitle} created! You are the first participant!`)
      navigate("/");
    } catch (error) {
      console.log(error.message);
    }
  };

  return (

    <div>
      <Container sx={{ mt: 6 }}>
        <Grid container spacing={3}>
          <Grid item xs={6} p={1}>
            <Paper>
              <Grid container p={1}>
                <Grid item xs={12} p={0}>
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
                        hecked={form.channelPrivacy === "public"}
                        onChange={updateForm("channelPrivacy")}
                      />

                    </RadioGroup>
                  </FormControl>
                </Grid>
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



// <div id="create-channel-view">
//   <h1>Create channel</h1>
//   {error && <div id="error">{error}</div>}
//   <label htmlFor="channelTitle">Channel Title:</label>
//   {" "}
//   <input
//     value={form.channelTitle}
//     onChange={updateForm("channelTitle")}
//     type="text"
//     name="channelTitle"
//     id="channelTitle"
//   />
//   {" "}
//   <br /> <br />
{/* <label htmlFor="channelPrivacy">Privacy:</label>
{ " " }
<input
  type="radio"
  name="channelPrivacy"
  value="public"
  checked={form.channelPrivacy === "public"}
  onChange={updateForm("channelPrivacy")}
/>
Public
{ " " }
<input
  type="radio"
  name="channelPrivacy"
  value="private"
  checked={form.channelPrivacy === "private"}
  onChange={updateForm("channelPrivacy")}
/>
Private
{ " " }
      <br /> <br />
      <button onClick={create}>Create</button>
    </div > */}
