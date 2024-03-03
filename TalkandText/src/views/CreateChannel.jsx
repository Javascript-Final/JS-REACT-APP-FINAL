import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createChannel } from "../services/channel-service";
import { useContext } from "react";
import { AppContext } from "../context/AppContext";

export default function CreateChannel() {
  const [form, setForm] = useState({
    channelTitle: "",
    channelPrivacy: "public",
  });
  const {userData} = useContext(AppContext);

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
    <div id="create-channel-view">
      <h1>Create channel</h1>
      {error && <div id="error">{error}</div>}
      <label htmlFor="channelTitle">Channel Title:</label>
      {" "}
      <input
        value={form.channelTitle}
        onChange={updateForm("channelTitle")}
        type="text"
        name="channelTitle"
        id="channelTitle"
      />
      {" "}
      <br /> <br />
      <label htmlFor="channelPrivacy">Privacy:</label>
      {" "}
      <input
        type="radio"
        name="channelPrivacy"
        value="public"
        checked={form.channelPrivacy === "public"}
        onChange={updateForm("channelPrivacy")}
      />
      Public
      {" "}
      <input
        type="radio"
        name="channelPrivacy"
        value="private"
        checked={form.channelPrivacy === "private"}
        onChange={updateForm("channelPrivacy")}
      />
      Private
      {" "}
      <br /> <br />
      <button onClick={create}>Create</button>
    </div>
  );
}