import { useContext } from "react"
import { AppContext } from "../context/AppContext";

export const Profile = () => {
    const { userData, setContext } = useContext(AppContext);

    return (
        <>
            <h1>Profile</h1>
            <div>
                first name: {userData.firstName}
            </div>
            <div>
                last name: {userData.lastName}
            </div>
            <div>
                username: {userData.username}
            </div>
            <div>
                phone number:  {userData.phoneNumber}
            </div>
        </>
    )
}