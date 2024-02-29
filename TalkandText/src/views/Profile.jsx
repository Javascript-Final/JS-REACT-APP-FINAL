import { useContext, useEffect, useState } from "react"
import { AppContext } from "../context/AppContext";
import { updateUser } from "../services/user-service";
import { Avatar, Divider, ListItemIcon } from '@mui/material';
import { getDownloadURL, ref as storageRef, uploadBytes } from "firebase/storage";
import { storage } from "../config/firebase-config";

export const Profile = () => {
    const { user, userData, setContext } = useContext(AppContext);
    const [isEditing, setIsEditing] = useState(false);
    const [form, setForm] = useState({
        firstName: userData?.firstName,
        lastName: userData?.lastName,
        phoneNumber: userData?.phoneNumber,
    });
    const [file, setFile] = useState(null)

    useEffect(() => {
        if (!userData) return;
        const { firstName, lastName, phoneNumber } = userData
        if (firstName && lastName && phoneNumber) {
            setForm({ firstName, lastName, phoneNumber })
        }
    }, [user])

    const updateForm = (prop) => (e) => {
        setForm({ ...form, [prop]: e.target.value });
    };

    const submit = async () => {
        const updatedUserData = { ...userData, ...form }
        if (file) {
            try {
                let avatarUrl = userData.avatarUrl;
                if (file) {
                    const storageReference = storageRef(storage, `avatars/${userData.uid}`);
                    await uploadBytes(storageReference, file);
                    avatarUrl = await getDownloadURL(storageReference);
                }

                updatedUserData['avatarUrl'] = avatarUrl
            } catch (error) {
                console.error('Failed to update user:', error);
            }
        }
        updateUser(userData.username, updatedUserData);
        setContext({ user, userData: updatedUserData })
        setIsEditing(false);
    }

    const handleFileChange = (event) => {
        setFile(event.target.files[0]);
    };

    if (isEditing) {

        if (userData.firstName.length < 4 || userData.firstName.length > 32) {
            alert('First name must be between 4 and 32 characters.');
            return;
        }

        if (userData.lastName.length < 4 || userData.lastName.length > 32) {
            alert('Last name must be between 4 and 32 characters.');
            return;
        }

        if (userData.phoneNumber.length < 9) {
            alert('Incorrect phone number format.');
            return;
        }


    }

    return !isEditing ?
        <>
            <h1>Profile</h1>
            <Avatar alt="User Avatar" src={userData?.avatarUrl} />
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
            <Avatar alt="User Avatar" src={userData?.avatarUrl} />
            <label htmlFor="uploadAvatar">Upload Avatar</label>
            <input type="file" onChange={handleFileChange} />
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