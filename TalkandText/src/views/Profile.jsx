import { useContext, useEffect, useState } from "react"
import { AppContext } from "../context/AppContext";
import { updateUser } from "../services/user-service";
import { Avatar, Divider, ListItemIcon } from '@mui/material';

export const Profile = () => {
    const { user, userData, setContext } = useContext(AppContext);
    const [isEditing, setIsEditing] = useState(false);
    const [form, setForm] = useState({
        firstName: userData?.firstName,
        lastName: userData?.lastName,
        phoneNumber: userData?.phoneNumber,
    });

    const updateForm = (prop) => (e) => {
        setForm({ ...form, [prop]: e.target.value });
    };

    const submit = () => {
        const updatedUserData = {...userData, ...form}
        updateUser(userData.username, updatedUserData);
        setContext({user, userData: updatedUserData})
        setIsEditing(false);
    }

    return !isEditing ?
        <>
            <h1>Profile</h1>
            <Avatar alt="User Avatar" src={userData?.avatarUrl}/>
            <div>
                First name: {userData?.firstName}
            </div>
            <div>
                Last name: {userData?.lastName}
            </div>
            <div>
                Username: {userData?.username}
            </div>
            <div>
                Phone number: {userData?.phoneNumber}
            </div>
            <button onClick={() => setIsEditing(true)}>Edit Profile</button>
        </>
        :
        <>
         <Avatar alt="User Avatar" src={userData?.avatarUrl}/>
         <label htmlFor="uploadAvatar">Upload Avatar</label>
         <button >Browse</button>
            <form>
                <label htmlFor="firstName">First name</label>
                <input
                    value={form.firstName}
                    onChange={updateForm("firstName")}
                    type="text"
                    name="firstName"
                    id="firstName"
                />
                <br />
                <label htmlFor="lastName">Last name</label>
                <input
                    value={form.lastName}
                    onChange={updateForm("lastName")}
                    type="text"
                    name="lastName"
                    id="lastName"
                />
                <br />
                <label htmlFor="phoneNumber">Phone number</label>
                <input
                    value={form.phoneNumber}
                    onChange={updateForm("phoneNumber")}
                    type="tel"
                    name="phoneNumber"
                    id="phoneNumber"
                />
                <br />
            </form>
            <button onClick={submit}>Save</button>
        </>
}