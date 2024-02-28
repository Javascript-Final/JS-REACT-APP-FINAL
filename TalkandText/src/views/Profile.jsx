import { useContext, useEffect, useState } from "react"
import { AppContext } from "../context/AppContext";
import { updateUser } from "../services/user-service";

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
            <div>
                first name: {userData?.firstName}
            </div>
            <div>
                last name: {userData?.lastName}
            </div>
            <div>
                username: {userData?.username}
            </div>
            <div>
                phone number: {userData?.phoneNumber}
            </div>
            <button onClick={() => setIsEditing(true)}>Edit Profile</button>
        </>
        :
        <>
            <form>
                <label htmlFor="firstName">first name</label>
                <input
                    value={form.firstName}
                    onChange={updateForm("firstName")}
                    type="text"
                    name="firstName"
                    id="firstName"
                />
                <br />
                <label htmlFor="lastName">last name</label>
                <input
                    value={form.lastName}
                    onChange={updateForm("lastName")}
                    type="text"
                    name="lastName"
                    id="lastName"
                />
                <br />
                <label htmlFor="phoneNumber">phone number</label>
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